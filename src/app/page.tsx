import Navbar from "@/components/shared/Navbar"
import { ExtendedUser } from '@/types'
import Hero from "@/components/home/Hero"
import AboutSection from "@/components/home/About"
import Projects from "@/components/home/Projects"
import ExperienceSection from "@/components/home/Experience"
import ContactSection from "@/components/home/Contact"
import SkillsSection from "@/components/home/Skills"
import prisma from "@/lib/prisma"

export const revalidate = 0; // Disable static caching for now, or use ISR

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero user={user as ExtendedUser | null} />
      <AboutSection user={user as ExtendedUser | null} />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experience} />
      <Projects projects={projects} />
      <ContactSection />
    </div>
  )
}
