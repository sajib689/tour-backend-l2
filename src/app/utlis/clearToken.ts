import { Response } from "express";

interface AuthToken {
  accessToken?: string;
  refreshToken?: string;
}
export const clearToken = (res: Response, payload: AuthToken) => {
  if (payload.accessToken) {
    res.clearCookie(payload.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  }
  if (payload.refreshToken) {
    res.clearCookie(payload.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  }
};
