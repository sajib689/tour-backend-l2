
import express from "express"
import { userController } from "./user.controller.js"

const userRouter = express.Router()

userRouter.post("/register", userController.createUser)

export default userRouter