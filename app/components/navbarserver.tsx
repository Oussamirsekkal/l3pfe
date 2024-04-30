import { cookies } from 'next/headers';
import jwtDecode from 'jsonwebtoken';
import Navbar from "@/app/components/navbar";

export default function NavbarServer() {
    const cookieStore = cookies();
    const token = cookieStore.get('auth')?.value;

    const isLoggedIn = token ? true : false;



    return <Navbar isLoggedIn={isLoggedIn} />;
}