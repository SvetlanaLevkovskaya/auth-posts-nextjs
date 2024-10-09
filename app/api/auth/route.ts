import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { username, password } = await request.json()
  if (username === 'admin' && password === 'admin') {
    return NextResponse.json({ token: 'fake-token' })
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }
}
