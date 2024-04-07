import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const itemSchema = z.object({
  category_name: z.string(),
  selected: z.boolean(),
});

const prisma = new PrismaClient();

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure.input(itemSchema).mutation(async ({ ctx, input }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.item.create({
        data: {
          category_name: input.category_name,
          selected: input.selected,
        },
      });
    } catch (error) {
      console.error("Error creating items:", error);
      throw new Error("Failed to create items.");
    }
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
