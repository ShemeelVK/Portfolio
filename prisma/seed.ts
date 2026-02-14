import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()


import fs from 'fs/promises'
import path from 'path'

async function main() {
  const email = 'admin@example.com' 
  const password = 'password123'
  const hashedPassword = await bcrypt.hash(password, 10)

  // Try to read backup
  let backupData: any = null
  try {
    const backupPath = path.join(process.cwd(), 'prisma', 'backup.json')
    const file = await fs.readFile(backupPath, 'utf-8')
    backupData = JSON.parse(file)
    console.log('Found backup.json - Seeding from backup data...')
  } catch (e) {
    console.log('No backup.json found - Seeding default data...')
  }

  // 1. User
  if (backupData?.users?.length > 0) {
    for (const u of backupData.users) {
       await prisma.user.upsert({
         where: { email: u.email },
         update: { ...u, password: u.password || hashedPassword }, // Keep existing hash if possible
         create: { ...u, password: u.password || hashedPassword }
       })
    }
  } else {
      // Default User Logic
      const user = await prisma.user.upsert({
        where: { email },
        update: {
            name: 'Shemeel Sakeer',
            headline: '.NET Full Stack Developer',
            bio: 'Self-taught Full Stack .NET Developer skilled in C#, ASP.NET Core, Web API, SQL Server, HTML, CSS, JavaScript, and React.js with experience building scalable, responsive web applications using Clean Architecture, Object-Oriented Design and RESTful services. Strong in backend development, API integration, database design, debugging, troubleshooting with exposure to Agile/Scrum methodologies.',
            avatarUrl: '/myself.png', 
        },
        create: {
          email,
          name: 'Shemeel Sakeer',
          password: hashedPassword,
          headline: '.NET Full Stack Developer',
          bio: 'Self-taught Full Stack .NET Developer skilled in C#, ASP.NET Core, Web API, SQL Server, HTML, CSS, JavaScript, and React.js with experience building scalable, responsive web applications using Clean Architecture, Object-Oriented Design and RESTful services. Strong in backend development, API integration, database design, debugging, troubleshooting with exposure to Agile/Scrum methodologies.',
          avatarUrl: '/myself.png',
        },
      })
  }

  // 2. Experience
  await prisma.experience.deleteMany({})
  if (backupData?.experiences?.length > 0) {
      for (const exp of backupData.experiences) {
          const { id, userId, createdAt, updatedAt, ...data } = exp
          await prisma.experience.create({ data })
      }
  } else {
      const experiences = [
        {
            role: 'Full Stack .NET Developer Intern',
            company: 'Bridgeon Solutions',
            location: 'Kerala, India',
            startDate: new Date('2025-06-01'),
            current: true,
            description: 'Developed and maintained multiple backend modules including authentication, product management, and order processing within a full-stack .NET application. Tested and validated application features across multiple user workflows to ensure stable functionality and error-free execution. Implemented and maintained REST API endpoints for core application features including user management, cart operations, and order handling.'
        }
      ]
      for (const exp of experiences) {
        await prisma.experience.create({ data: exp })
      }
  }

  // 3. Projects
  await prisma.project.deleteMany({})
  if (backupData?.projects?.length > 0) {
      for (const p of backupData.projects) {
          const { id, userId, tags, createdAt, updatedAt, ...data } = p
          // Re-connect tags
          await prisma.project.create({
              data: {
                  ...data,
                  tags: {
                      connectOrCreate: tags.map((t: any) => ({
                          where: { name: t.name },
                          create: { name: t.name }
                      }))
                  }
              }
          })
      }
  } else {
      const projects = [
        {
            title: 'Elevé Studio',
            description: 'Developed a full-stack E-commerce web application using C#, ASP.NET Core, Web API, Entity Framework Core, SQL Server, and React.js following Clean Architecture principles. Implemented secure authentication and authorization using JWT Bearer. Developed 40+ REST API endpoints. Integrated Razorpay payment gateway.',
            imageUrl: '/eleve-studio-cover.png',
            tags: ['C#', 'ASP.NET Core', 'React.js', 'SQL Server', 'Clean Architecture'],
            featured: true,
            demoUrl: '#',
            githubUrl: '#',
            order: 1
        }
      ]
      for (const project of projects) {
           const { tags, ...data } = project
           await prisma.project.create({
               data: {
                   ...data,
                   imageUrl: '/eleve-studio-cover.png', // Ensure fallback uses correct image
                   tags: {
                       connectOrCreate: tags.map(tag => ({
                           where: { name: tag },
                           create: { name: tag }
                       }))
                   }
               }
           })
      }
  }
  
  // 4. Skills
  await prisma.skill.deleteMany({})
  
  if (backupData?.skills?.length > 0) {
      for (const sk of backupData.skills) {
          const { id, ...data } = sk
           await prisma.skill.create({ data })
      }
  }


  console.log('Seeding complete.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
