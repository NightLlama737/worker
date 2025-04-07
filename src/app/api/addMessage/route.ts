import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const messageData = await request.json();
    console.log('Received message in API:', messageData);

    const savedMessage = await prisma.messages.create({
      data: {
        email: messageData.email,
        message: messageData.message,
        user: messageData.user,
        date: new Date(messageData.date)
      }
    });

    console.log('Message saved to database:', savedMessage);
    return NextResponse.json(savedMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save message" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}