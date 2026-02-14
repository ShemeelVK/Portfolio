import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2] || 'shameelvk95@gmail.com'
  const password = process.argv[3] || 'password123'

  console.log(`Resetting password for ${email}...`)

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    console.log(`✅ Success! Password for ${user.email} is now: ${password}`)
  } catch (error) {
    console.error('Error:', error)
    console.log('\n❌ Could not find user. Are you sure the email is correct?')
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
