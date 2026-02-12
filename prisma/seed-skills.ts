
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const skillCategories = [
  {
    title: 'Languages',
    skills: ['C#', 'JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3']
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Framer Motion']
  },
  {
    title: 'Backend',
    skills: ['.NET Core', 'Node.js', 'Web API']
  },
  {
    title: 'Database',
    skills: ['SQL Server', 'Prisma', 'MongoDB', 'Redis']
  },
  {
    title: 'DevOps & Tools',
    skills: ['Docker', 'Git', 'VS Code', 'Figma']
  }
]

async function main() {
  console.log('Seeding skills...')
  await prisma.skill.deleteMany({})

  let order = 1
  for (const cat of skillCategories) {
    for (const skillName of cat.skills) {
      await prisma.skill.create({
        data: {
          name: skillName,
          category: cat.title,
          order: order++,
          icon: '🔹' // Default emoji, frontend will map to real icons if available
        }
      })
    }
  }
  console.log('Skills seeded.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
