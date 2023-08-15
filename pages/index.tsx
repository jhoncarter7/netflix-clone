

import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar';
import BillBord from '@/components/BillBord';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorite from '@/hooks/useFavorite';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';
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
 const {data: movies = []} = useMovieList()
 const {data: favorite = []} = useFavorite()
const {isOpen, closeModal} = useInfoModal()
  return <>
  <InfoModal visible={isOpen} onClose={closeModal}/>
  <Navbar/>
  <BillBord/>
  <div className='pb-40'>
    <MovieList data={movies} title='Trending Now'/>
    <MovieList data={favorite} title='My List'/>
  </div>
  </>
}
