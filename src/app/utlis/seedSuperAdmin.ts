import { envVars } from "../config/env.js";
import { Role, type IAuthProvider, type IUser } from "../modules/user/user.interface.js";
import { User } from "../modules/user/user.model.js";
import bcrypt from "bcryptjs";


export const seedSuperAdmin = async () => {
    try{
        const isSuperAdminExist = await User.findOne({
            email: envVars.SUPER_ADMIN_EMAIL
        })
        if(isSuperAdminExist){
            console.log("Super admin exist");
            return
        }
        const hashPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, 10)
        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        }
        const payload: IUser = {
            name: "super admin",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashPassword,
            auths: [authProvider],
            isVerified: true,
        }

    } catch(error){
        console.log(error);
    }
}