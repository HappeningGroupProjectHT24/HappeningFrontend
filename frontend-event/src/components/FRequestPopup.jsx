import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FRequestPopup = ({ friendReq, onClose, updateFriendReq }) => {
    const [friends, setFriends] = useState([]);
    const [reqIds, setReqIds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getFriend = async () => {
            try {
                const frend = friendReq.map(i => i.user)
                console.log('reqqq', friendReq)
                console.log('frend', frend)
                const ids = friendReq.map(id => id.id)

                setReqIds(ids)
                setFriends(frend);

            } catch (error) {
                console.log(error)
            }
        };
        getFriend();
    }, [friendReq])

    const acceptHandler = async (idn) => {
        await axios.post(`https://happeningevent.azurewebsites.net/api/Friendship/AcceptFriendRequest?friendshipId=${idn}`)
        console.log('testidn', idn)

        setFriends(friendss => friendss.filter((_, index) => reqIds[index] !== idn));
        setReqIds(requIds => requIds.filter(reqId => reqId !== idn));
        updateFriendReq(t => t.filter(req => req.id !== idn))
        location.reload();
    }
    const denyHandler = async (idn) => {
        await axios.post(`https://happeningevent.azurewebsites.net/api/Friendship/DeclineFriendRequest?friendshipId=${idn}`)

        setFriends(friendss => friendss.filter((_, index) => reqIds[index] !== idn));
        setReqIds(requIds => requIds.filter(reqId => reqId !== idn));
        updateFriendReq(t => t.filter(req => req.id !== idn))
        location.reload();
    }

    const HandleViewFriendPage = (userId) => {
        navigate('/friend', { state: { userId } })
    }
    return (
        <>
            <div className="fixed z-30 inset-0 flex items-center justify-center bg-flesh bg-opacity-50 transition-opacity duration-300 ease-out animate-fadeIn">
                <div className="relative bg-gray-300 p-1 rounded-lg overflow-y-auto max-h-screen w-auto p-3">
                    <p className="text-center font-bold text-gray-600 pb-2 font-quicksand">Friend requests</p>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-700 hover:text-black"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {friends.length > 0 ? (
                        friends.map((friend, index) => (
                            <div key={index}
                                className="flex justify-between items-center shadow-md w-[17rem] transition-transform rounded-md bg-Flesh p-3 mb-3">
                                <div onClick={() => HandleViewFriendPage(friend.id)} className='cursor-pointer flex space-x-3'>
                                    <img
                                        src={friend.profilePictureUrl}
                                        alt="FriendProfilePicture"
                                        className="w-12 h-12 rounded-md object-cover border-2 border-purple-500 mr-3"
                                    />
                                    <p className="text-gray-800 flex-1 font-quicksand">{friend.firstName} {friend.lastName}</p>

                                </div>
                                <div className="flex space-x-3">
                                    <span onClick={() => acceptHandler(reqIds[index])} className="cursor-pointer text-green-500">✅</span>
                                    <span onClick={() => denyHandler(reqIds[index])} className="cursor-pointer text-red-500">❌</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No friend requests found!</p>
                    )}

                </div>
            </div>

        </>
    )
}

export default FRequestPopup