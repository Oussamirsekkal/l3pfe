import Profile from "@/app/profile/components/profile";
import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";

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
    const email = decoded.email;

    return <Profile email={email} />;
}