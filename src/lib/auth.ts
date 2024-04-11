import { jwtVerify, SignJWT } from "jose";
import { nanoid } from "nanoid";

interface UserJwtPayload {
  jti: string;
  iat: number;
  userId: number;
  name: string;
  email: string;
}

export const getJWTSecretKey = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The Environment variable JWT_SECRET is not found.");
  }

  return secret;
};

export const verifyToken = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey()),
    );
    return verified.payload as unknown as UserJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired");
  }
};

export async function generateJWT({
  userId,
  name,
  email,
}: {
  userId: number;
  name: string;
  email: string;
}) {
  const token = await new SignJWT({
    userId,
    name,
    email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(getJWTSecretKey()));
  return token;
}
