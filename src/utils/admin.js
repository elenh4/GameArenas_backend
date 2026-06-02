import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI je krivo definiran')
  process.exit(1)
}

await mongoose.connect(process.env.MONGODB_URI)

const email = 'admin@gamearenas.com'
const password = 'GAME12345'

const exists = await User.findOne({ email })
if (exists) {
  console.log('Admin već postoji:', email)
  process.exit()
}
