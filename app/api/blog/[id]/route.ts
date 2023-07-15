import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/prisma";


//to GET single post
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1]
        await main()
        const post = await prisma.post.findFirst({ where: { id } })
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 })
        }
        return NextResponse.json({ message: "Success single post fetch", post }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error fetching single post", error }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
//to UPDATE/PUT single post
export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/blog/")[1]
        const { title, description } = await req.json()
        await main()
        const post = await prisma.post.update({
            data: { title, description },
            where: { id }
        })
        return NextResponse.json({ message: "Success single post update", post }, { status: 200 })
        // 
    } catch (error) {
        return NextResponse.json({ message: "Error fetching single post", error }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
//to DELETE single post
export const DELETE = async (req: Request, res: NextResponse) => {

}