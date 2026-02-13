'use client'

import { useState } from 'react'
import { User } from '@prisma/client'
import { ExtendedUser } from '@/types'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  headline: yup.string().default(''),
  bio: yup.string().default(''),
  avatarUrl: yup.string().default(''),
})

type FormData = yup.InferType<typeof schema>

export default function ProfileForm({ user }: { user: ExtendedUser | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      headline: user?.headline || '',
      bio: user?.bio || '',
      avatarUrl: user?.avatarUrl || '',
    }
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      // We need to Create user if not exists? But auth requires user.
      // So update or create first user.
      // API endpoint: /api/profile (I need to create this)
      
      const res = await fetch('/api/profile', {
        method: 'POST', // or PUT
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!res.ok) throw new Error('Failed to update profile')

      toast.success('Profile updated successfully')
      router.refresh()
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input 
                {...register('name')} 
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
                {...register('email')} 
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
            <label className="text-sm font-medium">Headline</label>
            <input 
                {...register('headline')} 
                placeholder="Full Stack Developer"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
      </div>

       <div className="space-y-2">
            <label className="text-sm font-medium">Avatar URL</label>
            <input 
                {...register('avatarUrl')} 
                placeholder="https://..."
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
      </div>

      <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea 
                {...register('bio')} 
                rows={4}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
      </div>

      <div className="pt-2">
        <button 
            type="submit" 
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors disabled:opacity-70"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Profile
        </button>
      </div>
    </form>
  )
}
