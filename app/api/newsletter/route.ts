import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const NEWSLETTER_FILE = path.join(process.cwd(), 'data/newsletter.json')

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    
    // Read existing subscribers
    let subscribers: string[] = []
    try {
      const content = await fs.readFile(NEWSLETTER_FILE, 'utf-8')
      subscribers = JSON.parse(content).subscribers
    } catch {
      // File doesn't exist yet
    }

    // Check if already subscribed
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Add new subscriber
    subscribers.push(email)
    await fs.writeFile(
      NEWSLETTER_FILE, 
      JSON.stringify({ subscribers }, null, 2)
    )

    return NextResponse.json({ message: 'Successfully subscribed!' })
  } catch (error: unknown) {
    console.error('Newsletter API Error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
} 