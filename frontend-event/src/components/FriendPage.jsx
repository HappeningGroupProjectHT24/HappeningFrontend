import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import FriendFavoriteBox from '../components/FriendFavoriteBox';
import { jwtDecode } from 'jwt-decode';

const FriendPage = () => {
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendReq, setFriendReq] = useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const theId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    const inloggedUserId = decodedToken[theId]

    useEffect(() => {
        const getUser = async () => {
            try {
                const usern = await axios.get(`https://localhost:7261/api/User/GetUserById?id=${userId}`)
                const friendz = await axios.get(`https://localhost:7261/api/Friendship/ShowAllFriends?userId=${userId}`)
                const requests = await axios.get(`https://localhost:7261/api/Friendship/ShowFriendRequests?userId=${userId}`)
                if (!usern.data) {
                    console.log('Couldnt fetch data!', usern.data)
                } else {

                    setUser(usern.data);
                    setFriends(friendz.data)
                    setFriendReq(requests.data)
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getUser();
    }, [userId]);

    // checks if user has sent request, is friend or is not a friend
    const isFriend = friends.some(friend => friend.id === inloggedUserId);
    const hasSentRequest = friendReq.some(request => request.friendId === inloggedUserId);

    return (
        <>
            <div className='userPage min-h-screen bg-DarkPurple flex justify-center item-center'>

                {/* container for welcome,profPic, friendContainer */}
                <div className="flex flex-col justify-top items-center mt-4 space-y-4">

                    {user && user.profilePictureUrl ?
                        (<img src={user.profilePictureUrl} alt="ProfilePicture" className="rounded-full w-20 h-20" />)
                        :
                        (<p>No profile picture available</p>)
                    }
                    <h5 className='text-center'>{user ? `${user.firstName} ${user.lastName}` : "Guest"}</h5>

                    {/* friend status section */}
                    <div>
                        {isFriend ? (
                            <button
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-green-400 
                                rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:purpleContrast 
                                dark:hover:bg-blue-700 dark:focus:ring-white-800 mb-1">
                                Följer
                            </button>
                        ) : hasSentRequest ? (
                            <button
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-500 bg-gray-300 
                                rounded-lg cursor-not-allowed mb-1">
                                Förfrågan skickad
                            </button>
                        ) : (
                            <button
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-Flesh 
                                rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:purpleContrast 
                                dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-1">
                                Följ
                            </button>
                        )}
                    </div>

                    {/* friendsBox component */}
                    {/* <FriendBox friends={friends} /> */}

                    {/* favorite Box component */}
                    <FriendFavoriteBox id={userId} />
                </div>
            </div>
        </>

    )
}

export default FriendPage