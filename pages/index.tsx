

import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Inter } from 'next/font/google'
import useCurrentUser from '@/hooks/useCurrentUser';
const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context: NextPageContext) {
  const session= await getSession(context);

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        parmanent: false,
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {
  const {data: user} = useCurrentUser();
  return <><h1 className='text-white'>hello</h1>
  <p className='text-white'>logged as: {user?.name}</p>
  <button className='bg-white w-full h-10' onClick={() => signOut()}>logout</button>
  </>
}
