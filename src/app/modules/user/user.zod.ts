import * as z from "zod";
import { Role, IActive } from "./user.interface.js";

export const userZod = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  picture: z.string().optional(),
  address: z.string().optional(),
  isDeleted: z.boolean().default(false),
  isActive: z.enum([IActive.ACTIVE, IActive.INACTIVE, IActive.BLOCKED]).default(IActive.ACTIVE),
  role: z.enum([Role.SUPER_ADMIN, Role.ADMIN, Role.USER, Role.GUIDE]).default(Role.USER),
  auths: z
    .array(
      z.object({
        provider: z.string(),
        providerId: z.string().optional(),
      })
    )
    .optional(),
});
