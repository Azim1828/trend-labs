import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const CONTACTS_FILE = path.join(process.cwd(), 'data/contacts.json')

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()
    
    // Read existing messages
    let messages: ContactMessage[] = []
    try {
      const content = await fs.readFile(CONTACTS_FILE, 'utf-8')
      messages = JSON.parse(content).messages
    } catch {
      // File doesn't exist yet
    }

    // Add new message
    const newMessage: ContactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString()
    }

    messages.push(newMessage)
    await fs.writeFile(
      CONTACTS_FILE, 
      JSON.stringify({ messages }, null, 2)
    )

    return NextResponse.json({ message: 'Message sent successfully!' })
  } catch (error: unknown) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 