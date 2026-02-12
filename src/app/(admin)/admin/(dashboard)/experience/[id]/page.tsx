import prisma from '@/lib/prisma'
import ExperienceForm from '@/components/admin/ExperienceForm'
import { notFound } from 'next/navigation'

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({
    where: { id }
  })

  if (!experience) return notFound()

  return <ExperienceForm experience={experience} />
}
