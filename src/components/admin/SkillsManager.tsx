'use client'

import { useState } from 'react'
import { Skill } from '@prisma/client'
import { Trash2, Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function SkillsManager({ initialSkills }: { initialSkills: Skill[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Other', icon: '' })
  const [skills, setSkills] = useState(initialSkills)

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.name) return

    setLoading(true)
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill)
      })

      if (!res.ok) throw new Error('Failed')

      const addedSkill = await res.json()
      setSkills([...skills, addedSkill])
      setNewSkill({ name: '', category: 'Other', icon: '' })
      toast.success('Skill added')
      router.refresh()
    } catch (error) {
      toast.error('Failed to add skill')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSkill = async (id: string) => {
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed')
      
      setSkills(skills.filter(s => s.id !== id))
      toast.success('Skill deleted')
      router.refresh()
    } catch (error) {
      toast.error('Failed to delete skill')
    }
  }

  // Group for display
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="space-y-8">
      {/* Add Skill Form */}
      <form onSubmit={handleAddSkill} className="flex flex-wrap gap-4 items-end bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Skill Name</label>
            <input 
                value={newSkill.name}
                onChange={e => setNewSkill({...newSkill, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React"
            />
        </div>
        <div className="min-w-[150px]">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
                value={newSkill.category}
                onChange={e => setNewSkill({...newSkill, category: e.target.value})}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Architecture">Architecture</option>
                <option value="DevOps">DevOps</option>
                <option value="Database">Database</option>
                <option value="Tools">Tools</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
            </select>
        </div>
         <div className="flex-1 min-w-[100px]">
            <label className="block text-sm font-medium mb-1">Icon (Emoji)</label>
            <input 
                value={newSkill.icon}
                onChange={e => setNewSkill({...newSkill, icon: e.target.value})}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="⚛️"
            />
        </div>
        <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-70 h-[42px]"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Add
        </button>
      </form>

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="font-semibold text-lg border-b border-gray-100 dark:border-gray-700 pb-2 mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <div key={skill.id} className="group relative flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700 text-sm">
                            <span>{skill.icon} {skill.name}</span>
                            <button 
                                onClick={() => handleDeleteSkill(skill.id)}
                                className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}
