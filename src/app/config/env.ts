/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";

dotenv.config();
interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
}
const loadEnvVariables = (): EnvConfig => {
    const requireEnvVariables: string [] = ["PORT", "DB_URL", "NODE_ENV"]
    requireEnvVariables.forEach(key => {
        if(!process.env [key]) {
            throw new Error(`Missing Env ${key}`)
        }
    })
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" || "production",
  };
};
export const envVars: EnvConfig = loadEnvVariables()
