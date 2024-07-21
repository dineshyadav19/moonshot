import { z } from "zod";
import { hash, compare } from "bcryptjs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { generateJWT } from "~/lib/auth";
import { serialize } from "cookie";
import { sendLoginEmail } from "~/utils/mailer";

const itemSchema = z.object({
  categoryName: z.string(),
  selected: z.boolean(),
  userId: z.number(),
});

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const signUpSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export const postRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;

      // Check for existing user by email
      const existingUser = await ctx.db.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { success: false, message: "Email already in use" };
      }

      const otp = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

      const user = await ctx.db.user.create({
        data: {
          name,
          email,
          password: await hash(password, 10),
          otp,
        },
      });

      await sendLoginEmail({
        email,
        otp,
      });

      return {
        success: true,
        message: "Successfully created the user",
        userId: user.id,
      };
    }),

  verifyOtp: publicProcedure
    .input(
      z.object({
        otp: z.string().length(6),
        userId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { otp, userId } = input;

      const user = await ctx.db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return { success: false, message: "Invalid user ID" };
      }

      if (user.otp !== otp) {
        return { success: false, message: "Invalid OTP" };
      }

      await ctx.db.user.update({
        where: { id: userId },
        data: { otp: undefined, isVerified: true }, // Set otp to null after successful verification
      });

      const token = await generateJWT({
        userId: user.id,
        email: user.email,
        name: user.name,
      });

      ctx.res.setHeader(
        "Set-Cookie",
        serialize("user_token", token, {
          httpOnly: true,
          path: "/",
          //secure: process.env.NODE_ENV === "production",
        }),
      );

      return {
        success: true,
        message: "OTP verified successfully!",
        userId: user.id,
      };
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;
    const user = await ctx.db.user.findUnique({
      where: { email },
    });

    // Check if user exists and passwords match
    if (!user || !(await compare(password, user.password))) {
      return {
        success: false,
        message: "Invalid email or password",
        isVerified: user?.isVerified,
        userId: user?.id,
      };
    }

    if (user.isVerified) {
      // Generate JWT token with user ID
      const token = await generateJWT({
        userId: user.id,
        email: user.email,
        name: user.name,
      });

      ctx.res.setHeader(
        "Set-Cookie",
        serialize("user_token", token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        }),
      );

      return {
        success: true,
        message: "Successfully Logged In",
        isVerified: true,
        userId: user.id,
      };
    }

    return {
      success: true,
      message: "Please verify your email first",
      isVerified: false,
      userId: user.id,
    };
  }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.res.setHeader(
      "Set-Cookie",
      serialize("user_token", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0), // Set expiration in the past
      }),
    );

    return {
      success: true,
      message: "Logged out successfully",
    };
  }),

  createCategories: publicProcedure
    .input(z.array(itemSchema))
    .mutation(async ({ ctx, input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return await ctx.db.categories.createMany({
          data: input,
          skipDuplicates: true,
        });
      } catch (error) {
        console.error("Error creating items:", error);
        throw new Error("Failed to create items.");
      }
    }),

  getCategoriesByUserId: protectedProcedure
    .input(
      z.object({
        page: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = input.page ?? 1;
      const skip = (page - 1) * 6;

      const totalItems: Array<{ row_count: number }> = await ctx.db.$queryRaw`
        SELECT COUNT(DISTINCT "categoryName") AS row_count
        FROM "Categories";
      `;

      const totalPages = Math.ceil(Number(totalItems[0]?.row_count) / 6);

      const items = await ctx.db.categories.findMany({
        distinct: ["categoryName"],
        skip,
        take: 6,
        where: { userId: ctx.user.userId },
      });

      return {
        success: true,
        message: "Successfully fetched all items",
        items,
        totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      };
    }),

  updateCategoriesByUserId: protectedProcedure
    .input(
      z.object({
        rowId: z.number(),
        value: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { rowId, value } = input;

      const updatedRow = await ctx.db.categories.update({
        where: {
          id: rowId,
        },
        data: {
          selected: value,
        },
      });

      if (!updatedRow) {
        throw new Error("Failed to update category");
      }

      return {
        success: true,
        message: "Category updated successfully",
      };
    }),
});
