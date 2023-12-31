import { NextResponse } from 'next/server'
import { sendResetEmail, generateResetToken } from '@/libs/auth'

export async function POST(
  req: Request,
  res: NextResponse
): Promise<NextResponse> {
  const body = await req.json()
  const { email, password, username } = body

  return NextResponse.json(
    {
      errorType: 'EMAIL',
      error: 'Invalid email format.',
    },
    { status: 400 }
  )
}
