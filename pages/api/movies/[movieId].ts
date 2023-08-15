import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from '@/lib/prismadb';


const handler = async (req:NextApiRequest, res: NextApiResponse) => {
if(req.method !== 'GET'){
    return res.status(405).end()
}
try {
     await serverAuth(req, res) 
     const {movieId} = req.query;
     if(typeof movieId !== 'string'){
        throw new Error('Inavalid Id')
     }
     if(!movieId){
        throw new Error('Inavalid Id')
     }
     const movie = await prismadb.movie.findUnique({
        where:{
            id: movieId
        }
     })
     if(!movie){
        throw new Error('Inavalid Id')
     }
     return res.status(200).json(movie)
} catch (error) {
  console.log(error)  
}
}

export default handler;