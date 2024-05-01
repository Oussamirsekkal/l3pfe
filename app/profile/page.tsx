import Profile from "@/app/profile/components/profile";
import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";

export default function Home() {
    const cookieStore = cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {
        // Handle case when token is not present
        return <div>Please log in to access this page.</div>;
    }

    //const decodedToken = jwt.decode(token) as { email: string };
    const decoded = jwt.verify(token, '2381741') as { email: string };
    const email = decoded.email;

    return <Profile email={email} />;
}