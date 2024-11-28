import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FRequestNoti from './FRequestNoti'
import { useNavigate } from 'react-router-dom';

const FriendBox = ({ friends = [], friendReq = [] }) => {
    const navigate = useNavigate();

    const HandleViewFriendPage = (userId) => {
        navigate('/friend', { state: { userId } })
    }


    return (
        <>
            {/* friend container */}
            <div className="bg-Flesh shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">

                {/* container for numberofFriends and showAll button */}
                <div className='flex flex-row justify-between'>

                    {/* showing amount friends */}
                    <div className="flex items-center">
                        <p className="text-x font-semibold text-gray-800 mr-1">{friends.length} Vänner</p>

                        {/* This div will contain incoming friendship requests. */}
                        {friendReq.length > 0 && (<FRequestNoti friendReq={friendReq} />)}
                    </div>

                    {/*Show all friends button*/}
                    {friends.length > 4 && (<div>
                        <Link to="/allfriends" state={friends} className='hover:text-white font-quicksand'>
                            Visa Alla
                        </Link>
                    </div>)}
                </div>

                {/* friend box with friend showing */}
                <div className="grid grid-cols-2 gap-4 w-70 h-70">

                    {friends.slice(0, 4).map((friend, index) => (

                        // adding a link to be able to visit chosen friends profile.
                        <div onClick={() => HandleViewFriendPage(friend.id)} key={index} className='cursor-pointer'>

                            {/* // a div (card) that will be created for every user-object  */}
                            <div className='bg-DarkPurple shadow-md hover:scale-105 rounded-lg p-5 w-[8rem] h-[8rem] mx-auto m-1'>

                                {/* div for friends profileImage. */}
                                <div className='flex justify-center'>
                                    <img src={friend.profilePictureUrl} alt="FriendProfilePicture" className="w-12 h-12 rounded-md object-cover border-2 border-purple-500" />
                                </div>

                                {/* div for friends name */}
                                <div className='flex justify-center pt-1 text-white'>
                                    <p className='break-words text-center font-quicksand'>{friend.firstName} {friend.lastName}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FriendBox
