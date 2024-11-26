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
        await axios.post(`https://localhost:7261/api/Friendship/AcceptFriendRequest?friendshipId=${idn}`)
        console.log('testidn', idn)

        setFriends(friendss => friendss.filter((_, index) => reqIds[index] !== idn));
        setReqIds(requIds => requIds.filter(reqId => reqId !== idn));
        updateFriendReq(t => t.filter(req => req.id !== idn))
    }
    const denyHandler = async (idn) => {
        await axios.post(`https://localhost:7261/api/Friendship/DeclineFriendRequest?friendshipId=${idn}`)

        setFriends(friendss => friendss.filter((_, index) => reqIds[index] !== idn));
        setReqIds(requIds => requIds.filter(reqId => reqId !== idn));
        updateFriendReq(t => t.filter(req => req.id !== idn))
    }

    const HandleViewFriendPage = (userId) => {
        navigate('/friend', { state: { userId } })
    }
    return (
        <>
            <div className="fixed z-30 inset-0 flex items-center justify-center bg-flesh bg-opacity-50 transition-opacity duration-300 ease-out animate-fadeIn">
                <div className="relative bg-gray-300 p-1 rounded-lg overflow-y-auto max-h-screen w-auto p-3">
                    <p className="text-center font-bold text-gray-600 pb-2">Friend requests</p>
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
                                    <p className="text-gray-800 flex-1">{friend.firstName} {friend.lastName}</p>

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
//i friendRq finns det: hh
// [
//     {
//         "id": 10,
//         "userId": "f255ba33-c204-4486-b01a-388c47e8ad33",
//         "user": {
//             "id": "f255ba33-c204-4486-b01a-388c47e8ad33",
//             "firstName": "Anna",
//             "lastName": "Anka",
//             "nickName": "Ankan",
//             "userName": "anna89",
//             "email": "anna89@example.com",
//             "phoneNumber": null,
//             "profilePictureUrl": "https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg"
//         },
//         "friendId": "73f663e9-f16b-4503-988a-461318f3ebca",
//         "friend": {
//             "id": "73f663e9-f16b-4503-988a-461318f3ebca",
//             "firstName": "Martin",
//             "lastName": "Karlsson",
//             "nickName": "MatteK",
//             "userName": "martinK",
//             "email": "martin.karlsson@msn.se",
//             "phoneNumber": "0765644049",
//             "profilePictureUrl": "https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg"
//         },
//         "createdDate": "2024-11-21T09:41:54.7271451"
//     }
// ]


// // Looping through all friend requests and adding userId's to ids (list of ID's)
// const ids = friendReq.map(i => i.userId)
// looping through id's then fetching objects from api with matching id and storing in apiResponse
// const apiResponse = await Promise.all(ids.map(id => axios.get(`https://localhost:7261/api/User/GetUserById?id=${id}`)));

// //Looping through apiResponse and taking out the user data and storing in user
// const user = apiResponse.map(response => response.data);