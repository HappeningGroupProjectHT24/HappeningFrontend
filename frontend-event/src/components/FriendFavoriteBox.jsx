import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FriendFavoriteEventCard from './FriendFavoriteEventCard'

const FriendFavoriteBox = ({ id }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getFavorites = async () => {
            try {
                const favs = axios.get(`https://localhost:7261/api/User/${id}/event`)
                if (favs.data) {
                    console.log('Couldnt get data!', (await favs).data)
                }
                else {
                    setFavorites((await favs).data)
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getFavorites();
    }, [])
    return (
        <>
            <div className='!mb-4 flex flex-row space-x-1 overflow-x-auto w-full max-w-[20rem] h-[auto] scrollbar-hide bg-red-200 shadow-lg shadow-red-200/50 rounded-md'>
                {favorites.length > 0
                    ?
                    (
                        favorites.map((fa, index) => (
                            <div key={index} className="flex-shrink-2 min-w-[17rem] min-h-[20rem]">
                                <FriendFavoriteEventCard event={fa} />
                            </div>
                        ))
                    ) : (<p className="pl-3 text-x font-semibold text-gray-800 mr-1">No favorites!</p>)}

            </div>
        </>
    )
}

export default FriendFavoriteBox
