import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const schema = yup.object({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        });

        try {
          const { email, password } = await schema.validate(credentials)

          const user = await prisma.user.findUnique({ where: { email } })

          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)
          if (passwordsMatch) return user
        } catch (e) {
            // Validation failed
            return null
        }

        console.log("Invalid credentials")
        return null
      },
    }),
  ],
})
