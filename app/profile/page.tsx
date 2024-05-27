import Profile from "@/app/profile/components/profile";
import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";
import prisma from "@/prisma"
export default function Home() {
    const cookieStore = cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {

        return <div>Please log in to access this page.</div>;
    }

    const secretkey = process.env.JWT_SECRET;
    if (!secretkey) {
        throw new Error('JWT Secret is not defined');
    }

    const decoded = jwt.verify(token,secretkey ) as { email: string };
    const decodedid = jwt.verify(token,secretkey ) as { id: any };
    const email = decoded.email;
    const id = decodedid.id;


    return <Profile email={email} id={id}  />;
}