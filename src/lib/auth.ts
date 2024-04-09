import { jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
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
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired");
  }
};
