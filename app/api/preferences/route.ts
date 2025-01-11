import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const PREFERENCES_FILE = path.join(process.cwd(), 'data/preferences.json')

interface UserPreferences {
  userId: string
  marketingEmails: boolean
  orderUpdates: boolean
  newProducts: boolean
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) throw new Error('No token provided')

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    
    // Read preferences file
    let preferences: UserPreferences[] = []
    try {
      const content = await fs.readFile(PREFERENCES_FILE, 'utf-8')
      preferences = JSON.parse(content).preferences
    } catch {
      // File doesn't exist yet
    }

    const userPrefs = preferences.find(p => p.userId === decoded.userId) || {
      userId: decoded.userId,
      marketingEmails: false,
      orderUpdates: true,
      newProducts: false
    }

    return NextResponse.json(userPrefs)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) throw new Error('No token provided')

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const { marketingEmails, orderUpdates, newProducts } = await req.json()

    // Read preferences file
    let preferences: UserPreferences[] = []
    try {
      const content = await fs.readFile(PREFERENCES_FILE, 'utf-8')
      preferences = JSON.parse(content).preferences
    } catch {
      // File doesn't exist yet
    }

    const userPrefIndex = preferences.findIndex(p => p.userId === decoded.userId)
    const updatedPrefs = {
      userId: decoded.userId,
      marketingEmails,
      orderUpdates,
      newProducts
    }

    if (userPrefIndex === -1) {
      preferences.push(updatedPrefs)
    } else {
      preferences[userPrefIndex] = updatedPrefs
    }

    await fs.writeFile(
      PREFERENCES_FILE,
      JSON.stringify({ preferences }, null, 2)
    )

    return NextResponse.json(updatedPrefs)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 401 }
    )
  }
} 