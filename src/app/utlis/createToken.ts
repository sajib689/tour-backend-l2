import { IUser } from "../modules/user/user.interface";
import { generatorAccessToken } from "./genarateAccessToken";
import { envVars } from "../config/env";

export const createToken = async (user: Partial<IUser>) => {
  const JwtPayload = {
    userId: user?.id,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = generatorAccessToken(JwtPayload, envVars.JWT_TOKEN, "7d");
  const refreshToken = generatorAccessToken(
    JwtPayload,
    envVars.JWT_REFRESH_TOKEN,
    "30d"
  );
  return {
    accessToken,
    refreshToken,
  };
};
