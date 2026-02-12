import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { 
    FolderKanban, 
    Briefcase, 
    UserCircle,
    Eye
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await auth()
  
  const projectCount = await prisma.project.count()
  const experienceCount = await prisma.experience.count()
  const skillCount = await prisma.skill.count()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name || 'Admin'}! Here's an overview of your portfolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
            title="Total Projects" 
            value={projectCount} 
            icon={<FolderKanban className="h-4 w-4 text-muted-foreground" />} 
            link="/admin/projects"
        />
        <StatsCard 
            title="Total Experience" 
            value={experienceCount} 
            icon={<Briefcase className="h-4 w-4 text-muted-foreground" />} 
            link="/admin/experience"
        />
        <StatsCard 
            title="Skills Listed" 
            value={skillCount} 
            icon={<UserCircle className="h-4 w-4 text-muted-foreground" />} 
            link="/admin/profile"
        />
         <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Public View</h3>
                <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4">
                <Link href="/" target="_blank" className="text-sm text-blue-600 hover:underline">
                    View Live Site &rarr;
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon, link }: { title: string, value: number, icon: any, link: string }) {
    return (
        <Link href={link} className="block transition-transform hover:scale-[1.02]">
            <div className="rounded-xl border bg-white dark:bg-gray-800 text-card-foreground shadow p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="tracking-tight text-sm font-medium">{title}</h3>
                    {icon}
                </div>
                <div className="text-2xl font-bold">{value}</div>
            </div>
        </Link>
    )
}
