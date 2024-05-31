import { Metadata } from "next";
import Dashboard from "@/app/Dashboard/components/dashboard";
import prisma from "@/prisma";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "",
};

export default async function Home() {
    const baseUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://l3pfe.vercel.app';
    const response = await fetch(`${baseUrl}/api/getusers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });
const clients = await response.json();
    return (
        <>
            <Dashboard clients = {clients} />
        </>
    );
}