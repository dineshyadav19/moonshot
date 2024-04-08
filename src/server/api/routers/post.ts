import { z } from "zod";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";

const itemSchema = z.object({
  category_name: z.string(),
  selected: z.boolean(),
  userId: z.number(),
});

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const postRouter = createTRPCRouter({
  createCategories: publicProcedure
    .input(itemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return await ctx.db.categories.createMany({
          data: input,
          skipDuplicates: true,
        });

        // return await ctx.db.item.deleteMany({});
      } catch (error) {
        console.error("Error creating items:", error);
        throw new Error("Failed to create items.");
      }
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;

    // Find user by email
    const user = await ctx.db.user.findUnique({
      where: { email },
    });

    // Check if user exists and passwords match
    if (!user || !(await compare(password, user.password))) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Generate JWT token with user ID
    const token = sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      success: true,
      token,
    };
  }),

  getCategoriesByUserId: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = input.page ?? 1;
      const skip = (page - 1) * 6;

      const totalItems: Array<{ row_count: number }> = await ctx.db.$queryRaw`
        SELECT COUNT(DISTINCT category_name) AS row_count
        FROM "Categories";
      `;

      const totalPages = Math.ceil(Number(totalItems[0]?.row_count) / 6);

      const items = await ctx.db.categories.findMany({
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
