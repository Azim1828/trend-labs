import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fs from 'fs/promises'
import path from 'path'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const USERS_FILE = path.join(process.cwd(), 'data/users.json')

interface User {
  id: string
  email: string
  password: string
  name?: string
}

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hash(password, 12)
  const userData = await readUsersFile()
  
  const existingUser = userData.users.find(user => user.email === email)
  if (existingUser) {
    throw new Error('User already exists')
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    name
  }

  userData.users.push(newUser)
  await writeUsersFile(userData)
  
  return { id: newUser.id, email: newUser.email, name: newUser.name }
}

export async function loginUser(email: string, password: string) {
  const userData = await readUsersFile()
  const user = userData.users.find(user => user.email === email)
  
  if (!user) {
    throw new Error('User not found')
  }

  const isValid = await compare(password, user.password)
  if (!isValid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  return { token, user: { id: user.id, email: user.email, name: user.name } }
}

export async function getUserProfile(userId: string) {
  const userData = await readUsersFile()
  const user = userData.users.find(user => user.id === userId)
  
  if (!user) {
    throw new Error('User not found')
  }

  return { id: user.id, email: user.email, name: user.name }
}

async function readUsersFile() {
  try {
    const content = await fs.readFile(USERS_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error: unknown) {
    console.error('Auth Error:', error)
    return { users: [] }
  }
}

async function writeUsersFile(data: { users: User[] }) {
  await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2))
} 