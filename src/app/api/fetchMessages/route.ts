import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) { 
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : null;

    const url = new URL(request.url);
    const recipientEmail = url.searchParams.get("recipientEmail");

    if (!user || !recipientEmail) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { email: user.email, user: recipientEmail },
          { email: recipientEmail, user: user.email }
        ]
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}