import { cookies } from 'next/headers';
import jwtDecode from 'jsonwebtoken';
import Navbar from "@/app/components/navbar";

export default function NavbarServer() {
    const cookieStore = cookies();
    const token = cookieStore.get('auth')?.value;

    const isLoggedIn = token ? true : false;
    let isAdmin = false;
    let name = ""
    if (token) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT Secret is not defined');
        }

        const decodedToken = jwtDecode.decode(token, { complete: true });
        if (decodedToken) {
            isAdmin = (decodedToken.payload as { isAdmin: boolean }).isAdmin;
            name = (decodedToken.payload as { name: string }).name;
        }
    }
    //console.log("is admin", isAdmin);

    return <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} name={name} />;
}