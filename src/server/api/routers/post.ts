import { z } from "zod";
import { hash, compare } from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJWTSecretKey } from "~/lib/auth";
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

      return { success: true, userId: user.id };
    }),

  verifyOtp: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        otp: z.string().length(6), // Enforce 6-digit OTP
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, otp } = input;

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
        data: { otp: undefined }, // Set otp to null after successful verification
      });

      const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(getJWTSecretKey()));

      ctx.res.setHeader(
        "Set-Cookie",
        serialize("user_token", token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        }),
      );

      return { success: true, message: "OTP verified successfully!" };
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
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(getJWTSecretKey()));

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
      userId: user.id,
    };
  }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    // Clear the JWT token from cookies (client-side)
    ctx.res.setHeader(
      "Set-Cookie",
      serialize("user_token", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0), // Set expiration in the past
      }),
    );

    return {
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

  getCategoriesByUserId: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
        userId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = input.page ?? 1;
      const skip = (page - 1) * 6;

      const totalItems: Array<{ row_count: number }> = await ctx.db.$queryRaw`
        SELECT COUNT(DISTINCT categoryName) AS row_count
        FROM "Categories";
      `;

      const totalPages = Math.ceil(Number(totalItems[0]?.row_count) / 6);

      const items = await ctx.db.categories.findMany({
        distinct: "categoryName",
        skip,
        take: 6,
        where: { userId: input.userId },
        orderBy: { updatedOn: "desc" },
      });

      return {
        items,
        totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      };
    }),

  updateCategoriesByUserId: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        rowId: z.number(),
        value: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, rowId, value } = input;

      const updatedRow = await ctx.db.categories.update({
        where: {
          id: rowId,
          userId,
        },
        data: {
          selected: value,
        },
      });

      // 3. Check for successful update (optional)
      if (!updatedRow) {
        throw new Error("Failed to update category"); // Handle potential errors
      }

      // 4. Return a success message (optional)
      return {
        message: "Category updated successfully",
      };
    }),
});
