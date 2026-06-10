import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from './models/Admin.js'

dotenv.config()

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI nije definiran')
  process.exit(1)
}

await mongoose.connect(process.env.MONGODB_URI)

const email = 'admin@gamearenas.com'
const password = 'admin123'

const exists = await User.findOne({ email })
if (exists) {
  console.log('Admin već postoji:', email)
  process.exit()
}

const hashedPassword = await bcrypt.hash(password, 10)

await User.create({
  email,
  password: hashedPassword,
  role: 'admin'
})

console.log('Admin uspješno kreiran:', email)
process.exit()