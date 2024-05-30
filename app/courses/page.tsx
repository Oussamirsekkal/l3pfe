
import prisma from "@/prisma";
import React from 'react';
import Courses from "@/app/courses/components/courses";
import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";
async function getAllCourses() {
    return prisma.courses.findMany({
        orderBy: {
            id: 'asc', // Order by id in ascending order
        },
    });
}
async function getUserChildren(userId:number) {
    try {
        const children = await prisma.children.findMany({
            where: {
                userId: userId,
            },
        });
        return children;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user children');
    }
}

export default async function Home() {
    const courses = await getAllCourses();
    const cookieStore = cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {

        return <div>Please log in to access this page.</div>;
    }

    const secretkey = process.env.JWT_SECRET;
    if (!secretkey) {
        throw new Error('JWT Secret is not defined');
    }

    const decodedid = jwt.verify(token,secretkey ) as { id: any };
    const id = decodedid.id;
    const children = await getUserChildren(id);

    return (

       <Courses courses={courses} id={id} childs={children} />
    );
}

