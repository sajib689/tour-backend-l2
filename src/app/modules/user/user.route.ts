
import express from "express"
import { userController } from "./user.controller.js"
import { validateZodSchema } from "../../utlis/validateZod.js"
import { userZod } from "./user.zod.js"

const userRouter = express.Router()
// user routes
userRouter.post("/register",validateZodSchema(userZod), userController.createUser)
userRouter.get("/all-users", userController.getAllUsersController)
userRouter.get("/single-user/:id", userController.getSingleController)
export default userRouter