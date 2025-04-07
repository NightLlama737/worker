import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    


    const { firstName , lastName , email , phone, password} = await request.json();

    if ( firstName == '' || lastName == '' || email == '' || phone == '' || password == '')
    {
        return Response.json({ message: 'all fields are required'});
    }
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const users = await prisma.registeredUsers.findUnique({
            where: {email}
        })

        if(users != null) 
        {
            return Response.json({ message: 'This email is already is taken!'});
        }
        const user = await prisma.registeredUsers.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                hash: hashedPassword,

            },
        }
            
        );
        console.log("Received request body:", request.body);
        return Response.json({ message: 'User registered succesfully!', user});
    }catch (error: any)
    {
        return Response.json({ error: error.message});
    }
}