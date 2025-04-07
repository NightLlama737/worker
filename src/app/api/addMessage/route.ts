import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../prisma';

export async function POST(request: Request) {
  try {
    const { email, message, userFrom } = await request.json();

    if (!email || !message || !userFrom) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const newMessage = await prisma.messages.create({
      data: {
        email,  // Recipient
        message,
        user: userFrom, // Sender
        date: new Date(),
      },
    });

    console.log("New message added:", newMessage);

    return new Response(JSON.stringify({ message: 'Message added successfully!', newMessage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error adding message:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}