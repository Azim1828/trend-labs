import { NextResponse } from 'next/server'
import { getUserProfile } from '@/lib/auth'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      throw new Error('No token provided')
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const user = await getUserProfile(decoded.userId)
    
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    )
  }
} 