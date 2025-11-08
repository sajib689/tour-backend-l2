import { Response } from "express";

interface AuthToken {
  accessToken?: string;
  refreshToken?: string;
}

export const setToken = (res: Response, tokenInfo: AuthToken) => {
  res.cookie("accessToken", tokenInfo.accessToken, {
    httpOnly: true,
    secure: false,
  });
  res.cookie("refreshToken", tokenInfo.refreshToken, {
    httpOnly: true,
    secure: false,
  });
};
