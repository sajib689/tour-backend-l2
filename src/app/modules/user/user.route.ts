
import express from "express"
import { userController } from "./user.controller.js"

const userRouter = express.Router()
// user routes
userRouter.post("/register", userController.createUser)

export default userRouter