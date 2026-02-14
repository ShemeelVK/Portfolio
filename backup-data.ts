
import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Backing up data...')

  const users = await prisma.user.findMany()
  const experiences = await prisma.experience.findMany()
  const projects = await prisma.project.findMany({ include: { tags: true } })
  const skills = await prisma.skill.findMany()

  const data = {
    users,
    experiences,
    projects,
    skills,
  }

  await fs.writeFile(
    path.join(process.cwd(), 'prisma', 'backup.json'),
    JSON.stringify(data, null, 2)
  )

  console.log('Backup complete: prisma/backup.json')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
