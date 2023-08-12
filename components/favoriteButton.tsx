import React, { useCallback, useMemo } from 'react'
import axios from 'axios'

import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorite from '@/hooks/useFavorite'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'



interface FavoriteButtonProps{
    movieId: string
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {
    const {mutate: mutateFavorites} = useFavorite();
    const {data: currentUser, mutate} = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId)
    }, [currentUser, movieId])
 

    const toggleFavorite = useCallback(async () => {
        let response;
        if(isFavorite){
            // response = await fetch('/api/favorite', {
            //     method: "DELETE",
            //     headers:{
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         data:{movieId}
            //     })
            // })
            response = await axios.delete('/api/favorite', {data: {movieId}})
        }else{
            // response = await fetch('/api/favorite', {
            //     method: "POST",
            //     headers:{
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         movieId
            //     })
            // })
            response = await axios.post('/api/favorite',  {movieId})
        }
        console.log(response)
        const updateFavoriteId = response?.data?.favoriteIds;
        mutate({
            ...currentUser,
            favoriteIds: updateFavoriteId
        }),
        mutateFavorites()
    },[isFavorite, movieId, mutateFavorites, mutate, currentUser])

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div onClick={toggleFavorite}
    className='
        cursor-pointer
        group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300
    '>
        <Icon className="text-white" size={25} />
    </div>
  )
}

export default FavoriteButton