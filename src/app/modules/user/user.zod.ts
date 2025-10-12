import * as z from "zod";

export const userZod = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  picture: z.string(),
  address: z.string(),
  isDeleted: z.boolean(),
  isActive: z.boolean(),
});
