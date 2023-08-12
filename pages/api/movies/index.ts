import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
if(req.method !== "GET"){
    return res.status(405).end()
}
try {
    await serverAuth(req)
    const movie = await prismadb.movie.findMany()
    return res.status(200).json(movie)
} catch (error) {
    console.log(error)
    res.status(400).end()
}
}

export default handler