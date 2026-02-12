import prisma from '@/lib/prisma'
import ProfileForm from '@/components/admin/ProfileForm'
import SkillsManager from '@/components/admin/SkillsManager'
import { ExtendedUser } from '@/types'
import { auth } from '@/lib/auth'

export default async function ProfilePage() {
  const session = await auth()
  
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! }
  })
  const skills = await prisma.skill.findMany({
    orderBy: { order: 'asc' }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <ProfileForm user={user as ExtendedUser | null} />
      
      <hr className="border-gray-200 dark:border-gray-700" />

      <div>
        <h2 className="text-2xl font-bold mb-6">Skills Management</h2>
        <SkillsManager initialSkills={skills} />
      </div>
    </div>
  )
}
