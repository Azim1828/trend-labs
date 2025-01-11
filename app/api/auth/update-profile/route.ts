import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import fs from 'fs/promises'
import path from 'path'

interface User {
  id: string
  email: string
  name?: string
  phone?: string
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const USERS_FILE = path.join(process.cwd(), 'data/users.json')

export async function PUT(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) throw new Error('No token provided')

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const { name, phone } = await req.json()

    // Read users file
    const content = await fs.readFile(USERS_FILE, 'utf-8')
    const data = JSON.parse(content)
    
    // Find and update user
    const userIndex = data.users.findIndex((u: User) => u.id === decoded.userId)
    if (userIndex === -1) throw new Error('User not found')

    // Update only provided fields
    if (name) data.users[userIndex].name = name
    if (phone) data.users[userIndex].phone = phone

    // Save updated data
    await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2))

    return NextResponse.json({
      name: data.users[userIndex].name,
      phone: data.users[userIndex].phone
    })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    )
  }
} 