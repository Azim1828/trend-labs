import { NextResponse } from 'next/server'
import { loginUser } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const { token, user } = await loginUser(email, password)
    return NextResponse.json({ token, user })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    )
  }
} 