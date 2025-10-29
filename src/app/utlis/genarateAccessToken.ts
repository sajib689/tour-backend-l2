import type { JwtPayload,SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"

export const generatorAccessToken = (payload: JwtPayload, jwt_token: string, expiresIn: string) => {
    return jwt.sign(payload, jwt_token, {expiresIn: expiresIn} as SignOptions)
}

