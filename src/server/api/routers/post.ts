import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const itemSchema = z.object({
  category_name: z.string(),
  selected: z.boolean(),
});

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.array(itemSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return await ctx.db.item.createMany({
          data: input,
          skipDuplicates: true,
        });

        // return await ctx.db.item.deleteMany({});
      } catch (error) {
        console.error("Error creating items:", error);
        throw new Error("Failed to create items.");
      }
    }),

  getLatest: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = input.page ?? 1;
      const skip = (page - 1) * 6;

      const totalItems = await ctx.db.$queryRaw`
        SELECT COUNT(DISTINCT category_name) AS row_count
        FROM "Item";
      `;

      const totalPages = Math.ceil(Number(totalItems[0].row_count) / 6);

      const items = await ctx.db.item.findMany({
        distinct: "category_name",
        skip,
        take: 6,
        orderBy: { updated_on: "desc" },
      });

      return {
        items,
        totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      };
    }),
});
