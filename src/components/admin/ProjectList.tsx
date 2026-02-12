'use client'

import { Project, Tag } from '@prisma/client'
import { Edit, Trash2, Plus, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type ProjectWithTags = Project & { tags: Tag[] }

export default function ProjectList({ projects }: { projects: ProjectWithTags[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setDeletingId(id)
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')

      toast.success('Project deleted')
      router.refresh()
    } catch (error) {
      toast.error('Failed to delete project')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link 
            href="/admin/projects/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
            <Plus className="w-4 h-4" />
            Add Project
        </Link>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-gray-300 rounded-lg text-gray-500">
                No projects found. Create one to get started.
            </div>
        ) : (
            projects.map((project) => (
                <div 
                    key={project.id}
                    className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                    <div className="w-full md:w-32 h-20 relative bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden flex-shrink-0">
                        {project.imageUrl ? (
                            <Image 
                                src={project.imageUrl} 
                                alt={project.title} 
                                fill 
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                        )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                             <h3 className="font-semibold text-lg truncate">{project.title}</h3>
                             {project.featured && (
                                 <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">Featured</span>
                             )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.tags.map(tag => (
                                <span key={tag.id} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link 
                            href={`/admin/projects/${project.id}`}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit"
                        >
                            <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                            onClick={() => handleDelete(project.id)}
                            disabled={deletingId === project.id}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  )
}
