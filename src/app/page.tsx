import Navbar from "@/components/shared/Navbar"
import { ExtendedUser } from '@/types'
import Hero from "@/components/home/Hero"
import AboutSection from "@/components/home/About"
import Projects from "@/components/home/Projects"
import ExperienceSection from "@/components/home/Experience"
import ContactSection from "@/components/home/Contact"
import SkillsSection from "@/components/home/Skills"
import Footer from "../components/shared/Footer"
import prisma from "@/lib/prisma"

export const revalidate = 0;

export default async function Home() {
  // Fetch data in parallel
  const [user, projects, experience, skills] = await Promise.all([
    prisma.user.findUnique({ 
        where: { email: 'admin@example.com' } 
    }),
    prisma.project.findMany({
        include: { tags: true },
        where: { featured: true },
        orderBy: { order: 'asc' },
        take: 6
    }),
    prisma.experience.findMany({
        orderBy: { startDate: 'desc' }
    }),
    prisma.skill.findMany({
        orderBy: { order: 'asc' }
    })
  ])

  // Cast to ExtendedUser to bypass stale Prisma Client types (due to file lock)
  const userData = user as unknown as ExtendedUser
  
  const extendedUser = userData ? {
    ...userData,
    bio: userData.bio || '',
    headline: userData.headline || '',
    avatarUrl: userData.avatarUrl || ''
  } : null

  return (
    <main className="relative min-h-screen snap-container">
      <Navbar />
      <Hero user={extendedUser} />
      <AboutSection user={extendedUser} />
      <Projects projects={projects} />
      <ExperienceSection experiences={experience} />
      <SkillsSection skills={skills} />
      <ContactSection user={extendedUser} />
      <Footer />
    </main>
  )
}
