'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Experience } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

const schema = yup.object({
  role: yup.string().required('Role is required'),
  company: yup.string().required('Company is required'),
  location: yup.string().default(''), // Optional by default in yup if not required
  startDate: yup.string().required('Start Date is required'),
  endDate: yup.string().nullable().defined().default(null),
  description: yup.string().required('Description is required'),
  current: yup.boolean().default(false),
})

type FormData = yup.InferType<typeof schema>

interface ExperienceFormProps {
  experience?: Experience
}

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: experience?.role || '',
      company: experience?.company || '',
      location: experience?.location || '',
      startDate: experience?.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
      endDate: experience?.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : null,
      description: experience?.description || '',
      current: experience?.current || false,
    }
  })

  const current = watch('current')

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const payload = {
        ...data,
        endDate: current ? null : data.endDate // Ensure endDate is null if current is true
      }

      const url = experience ? `/api/experience/${experience.id}` : '/api/experience'
      const method = experience ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        throw new Error('Something went wrong')
      }

      toast.success(experience ? 'Experience updated' : 'Experience created')
      router.push('/admin/experience')
      router.refresh()
    } catch (error) {
      toast.error('Failed to save experience')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/experience" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">{experience ? 'Edit Experience' : 'Add Experience'}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <input 
                    {...register('role')} 
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Senior Engineer"
                />
                {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <input 
                    {...register('company')} 
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Acme Corp"
                />
                {errors.company && <p className="text-red-500 text-xs">{errors.company.message}</p>}
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <input 
                {...register('location')} 
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New York, NY (Remote)"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <input 
                    type="date"
                    {...register('startDate')} 
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <input 
                    type="date"
                    {...register('endDate')} 
                    disabled={current}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
            </div>
        </div>

        <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                id="current"
                {...register('current')} 
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="current" className="text-sm font-medium">I currently work here</label>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
                {...register('description')} 
                rows={4}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your responsibilities and achievements..."
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        <div className="pt-4">
            <button 
                type="submit" 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {experience ? 'Update Experience' : 'Add Experience'}
            </button>
        </div>

      </form>
    </div>
  )
}
