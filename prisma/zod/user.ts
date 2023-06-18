import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteSession, RelatedSessionModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  email: z.string().email({ message: "Not a valid email" }),
  name: z.string(),
  password: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/),
  role: z.nativeEnum(Role),
  emailVerified: z.boolean(),
  emailVerificationString: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  sessions: CompleteSession[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  sessions: RelatedSessionModel.array(),
}))
