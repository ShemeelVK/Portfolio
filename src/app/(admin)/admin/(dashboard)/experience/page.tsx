import Prisma from '@/lib/prisma'
import ExperienceList from '@/components/admin/ExperienceList'

export default async function AdminExperiencePage() {
  const experience = await Prisma.experience.findMany({
    orderBy: { startDate: 'desc' }
  })

  return <ExperienceList experience={experience} />
}
