import { z } from "zod";
import { UserModel } from "../../prisma/zod";

export const UserCreateSchema = UserModel.pick({ email: true, name: true, password: true })
export type UserCreateType = z.infer<typeof UserCreateSchema>

export const UserLoginSchema = UserModel.pick({ email: true, password: true })
export type UserLoginType = z.infer<typeof UserLoginSchema>

export const UserVerifySchema = UserModel.pick({ email: true, emailVerificationString: true })
export type UserVerifyType = z.infer<typeof UserVerifySchema>