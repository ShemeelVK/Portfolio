'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Project, Tag } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

type ProjectWithTags = Project & { tags: Tag[] }

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  imageUrl: yup.string().default(''),
  demoUrl: yup.string().default(''),
  githubUrl: yup.string().default(''),
  tags: yup.string().default(''),
  featured: yup.boolean().default(false),
})

type FormData = yup.InferType<typeof schema>

interface ProjectFormProps {
  project?: ProjectWithTags
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      imageUrl: project?.imageUrl || '',
      demoUrl: project?.demoUrl || '',
      githubUrl: project?.githubUrl || '',
      tags: project?.tags.map(t => t.name).join(', ') || '',
      featured: project?.featured || false,
    }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      // Convert tags string to array
      const tagsArray = data.tags 
        ? data.tags.split(',').map(t => t.trim()).filter(Boolean) 
        : []

      const payload = {
        ...data,
        tags: tagsArray
      }

      const url = project ? `/api/projects/${project.id}` : '/api/projects'
      const method = project ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Something went wrong')
      }

      toast.success(project ? 'Project updated' : 'Project created')
      router.push('/admin/projects')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">{project ? 'Edit Project' : 'New Project'}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        
        <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input 
                {...register('title')} 
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Name"
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
                {...register('description')} 
                rows={4}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the project..."
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">Demo URL</label>
                <input 
                    {...register('demoUrl')} 
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <input 
                    {...register('githubUrl')} 
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/user/repo"
                />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <input 
                {...register('imageUrl')} 
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.png"
            />
             <p className="text-xs text-gray-500">Paste a URL for now (Cloudinary upload coming soon)</p>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Tags (comma separated)</label>
            <input 
                {...register('tags')} 
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Next.js, Tailwind"
            />
        </div>

        <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                id="featured"
                {...register('featured')} 
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
        </div>

        <div className="pt-4">
            <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {project ? 'Update Project' : 'Create Project'}
            </button>
        </div>

      </form>
    </div>
  )
}
