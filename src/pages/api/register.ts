import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../prisma';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST')
    {
        return res.status(405).json({message: 'Method Not Allowed'});
    }


    const { firstName , lastName , email , phone, password} = req.body;

    if ( !firstName || !lastName || !email || !phone || !password)
    {
        return res.status(400).json({ message: 'all fields are required'});
    }
    try {
        const hashedPassword = await bcrypt.hash(password,10);

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
        console.log("Received request body:", req.body);
        res.status(200).json({ message: 'User registered succesfully!', user});
    }catch (error: any)
    {
        res.status(500).json({ error: error.message});
    }
}