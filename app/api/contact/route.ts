import { NextRequest, NextResponse } from 'next/server'
import { createContactMessage, getContactMessages } from '@/lib/db/queries'
import { sendContactNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const message = await createContactMessage({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      subject: body.subject,
      message: body.message,
    })

    // Send email notification to admin
    await sendContactNotification(message)

    return NextResponse.json({ success: true, message }, { status: 201 })
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const messages = await getContactMessages()
    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
