'use client'

import { Experience } from '@prisma/client'
import { Edit, Trash2, Plus, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ExperienceList({ experience }: { experience: Experience[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    setDeletingId(id)
    try {
      const res = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')

      toast.success('Experience deleted')
      router.refresh()
    } catch (error) {
      toast.error('Failed to delete experience')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Experience</h2>
        <Link 
            href="/admin/experience/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
            <Plus className="w-4 h-4" />
            Add Experience
        </Link>
      </div>

      <div className="grid gap-4">
        {experience.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-gray-300 rounded-lg text-gray-500">
                No experience found. Add your work history.
            </div>
        ) : (
            experience.map((job) => (
                <div 
                    key={job.id}
                    className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                             <h3 className="font-semibold text-lg">{job.role}</h3>
                             <span className="text-gray-400">at</span>
                             <span className="font-medium text-gray-700 dark:text-gray-300">{job.company}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex gap-2">
                            <span>
                                {new Date(job.startDate).toLocaleDateString()} - 
                                {job.endDate ? new Date(job.endDate).toLocaleDateString() : ' Present'}
                            </span>
                            {job.location && <span>• {job.location}</span>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link 
                            href={`/admin/experience/${job.id}`}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit"
                        >
                            <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                            onClick={() => handleDelete(job.id)}
                            disabled={deletingId === job.id}
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
