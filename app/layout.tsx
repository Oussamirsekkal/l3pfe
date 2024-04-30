import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/footer";
import { cookies } from 'next/headers';
import jwtDecode from 'jsonwebtoken';
import NavbarServer from "@/app/components/navbarserver";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-learning",
  description: "E-learning platform for kids",
};

const cookieStore = cookies();
const token = cookieStore.get('auth')?.value;

const isLoggedIn = token ? true : false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
<NavbarServer/>
      {children}
      <Footer/>
      </body>
    </html>
  );
}
