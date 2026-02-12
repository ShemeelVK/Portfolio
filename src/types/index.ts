import { User } from '@prisma/client'

export interface ExtendedUser extends User {
  bio: string | null;
  headline: string | null;
  avatarUrl: string | null;
}
