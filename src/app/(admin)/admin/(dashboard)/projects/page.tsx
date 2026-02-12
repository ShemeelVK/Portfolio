import Prisma from '@/lib/prisma'
import ProjectList from '@/components/admin/ProjectList'

export default async function AdminProjectsPage() {
  const projects = await Prisma.project.findMany({
    include: { tags: true },
    orderBy: { order: 'asc' } // or createdAt desc
  })

  return <ProjectList projects={projects} />
}
