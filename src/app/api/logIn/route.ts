import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../../prisma'; // Ensure Prisma is properly configured

export async function POST(request: Request) {
  

  const { email, password } = await request.json();

  try {
    const user = await prisma.registeredUsers.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.hash);

    if (!isPasswordValid) {
      return Response.json({ error: 'Invalid email or password' });
    }

    // If everything is correct, return success response
    return Response.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' });
  }
}