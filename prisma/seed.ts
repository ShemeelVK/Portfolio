import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com' // Kept for admin login
  const password = 'password123'
  const hashedPassword = await bcrypt.hash(password, 10)

  // 1. User
  const user = await prisma.user.upsert({
    where: { email },
    update: {
        name: 'Shemeel Sakeer',
        headline: '.NET Full Stack Developer',
        bio: 'Self-taught Full Stack .NET Developer skilled in C#, ASP.NET Core, Web API, SQL Server, HTML, CSS, JavaScript, and React.js with experience building scalable, responsive web applications using Clean Architecture, Object-Oriented Design and RESTful services. Strong in backend development, API integration, database design, debugging, troubleshooting with exposure to Agile/Scrum methodologies.',
        avatarUrl: '/myself.png', // Assuming user uploaded it, or placeholder
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

  // 2. Experience
  // Delete existing to avoid duplicates during dev
  await prisma.experience.deleteMany({})
  
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

  // 3. Projects
  await prisma.project.deleteMany({})

  const projects = [
    {
        title: 'Elevé Studio',
        description: 'Developed a full-stack E-commerce web application using C#, ASP.NET Core, Web API, Entity Framework Core, SQL Server, and React.js following Clean Architecture principles. Implemented secure authentication and authorization using JWT Bearer. Developed 40+ REST API endpoints. Integrated Razorpay payment gateway.',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Placeholder
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
               tags: {
                   connectOrCreate: tags.map(tag => ({
                       where: { name: tag },
                       create: { name: tag }
                   }))
               }
           }
       })
  }
  
  // 4. Skills (Optional, as Skills.tsx is now hardcoded for better layout, but good for admin)
  await prisma.skill.deleteMany({})
  // ... (Skipping excessive skill seeding as the frontend uses the Grid component now, but we can add them for admin completeness if needed)

  console.log('Seeding complete: Shemeel Sakeer Data Injected.')
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
