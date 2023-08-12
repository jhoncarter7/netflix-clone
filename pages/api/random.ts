import serverAuth from '@/lib/serverAuth'
import {NextApiRequest, NextApiResponse} from 'next'
import prismadb from '@/lib/prismadb'

const Randome = async (req: NextApiRequest, res: NextApiResponse) => {
if(req.method !== 'GET'){
    return res.status(405).end()
}try{
 
await serverAuth(req)
const movieCount  = await prismadb.movie.count()

const randomIndex = Math.floor(Math.random() * movieCount)

const randomMovie = await prismadb.movie.findMany({
    take: 1,
    skip: randomIndex
})

return res.status(200).json(randomMovie[0])
}catch(err){
console.log(err)
return res.status(400).end()
}


}
export default Randome;