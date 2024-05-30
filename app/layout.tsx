import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/footer";
import { cookies } from 'next/headers';
import jwtDecode from 'jsonwebtoken';
import NavbarServer from "@/app/components/navbarserver";
import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-learning",
  description: "E-learning platform for kids",
};

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
<ToastContainer />
<Toaster />
      <Footer/>
      </body>
    </html>
  );
}
