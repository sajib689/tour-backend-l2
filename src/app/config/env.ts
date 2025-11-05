/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_TOKEN: string;
  JWT_REFRESH_TOKEN: string;
}
const loadEnvVariables = (): EnvConfig => {
  const requireEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "SUPER_ADMIN_PASSWORD",
    "SUPER_ADMIN_EMAIL",
    "JWT_TOKEN",
    "JWT_REFRESH_TOKEN",
  ];
  requireEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing Env ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: (process.env.NODE_ENV as "development") || "production",
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    JWT_TOKEN: process.env.JWT_TOKEN as string,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN as string,
  };
};
export const envVars: EnvConfig = loadEnvVariables();
