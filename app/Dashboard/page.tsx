import { Metadata } from "next";
import Dashboard from "@/app/Dashboard/components/dashboard";
import prisma from "@/prisma";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "",
};

export default async function Home() {

    return (
        <>
            <Dashboard  />
        </>
    );
}