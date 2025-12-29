import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // This will be handled by Clerk's client-side authentication
    // The API route is just a placeholder for the logout process
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signout API error:', error);
    return NextResponse.json({ error: 'Signout failed' }, { status: 500 });
  }
}
