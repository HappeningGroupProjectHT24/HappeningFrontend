import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import FriendFavoriteBox from '../components/FriendFavoriteBox';
import { jwtDecode } from 'jwt-decode';
import FriendBox from './FriendBox'

const FriendPage = () => {
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendReq, setFriendReq] = useState([])
    const location = useLocation();
    const userId = location.state?.userId;

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const theId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    const inloggedUserId = decodedToken[theId]

    useEffect(() => {
        const getUser = async () => {
            try {
                const usern = await axios.get(`https://happeningevent.azurewebsites.net/api/User/GetUserById?id=${userId}`)
                const friendz = await axios.get(`https://happeningevent.azurewebsites.net/api/Friendship/ShowAllFriends?userId=${userId}`)
                const requests = await axios.get(`https://happeningevent.azurewebsites.net/api/Friendship/ShowFriendRequests?userId=${userId}`)
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
    const hasSentRequest = friendReq.some(request => request.userId === inloggedUserId);

    const sendFriendReq = async () => {
        try {
            console.log('första inloggad andra kompis', inloggedUserId, user.userId)
            await axios.post(`https://happeningevent.azurewebsites.net/api/Friendship/SendFriendRequest?userId=${inloggedUserId}&friendId=${user.userId}`)
            location.reload();
            //"fake" setting data so it'll show "pending" without refreshing whole page
            setFriendReq(prevReq => [...prevReq, { friendId: inloggedUserId, user: { id: inloggedUserId, firstName: 'user', lastName: 'userson' } }]);

        } catch (error) {
            console.log(error)
        }
    }


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
                    <h5 className='text-center font-quicksand'>{user ? `${user.firstName} ${user.lastName}` : "Guest"}</h5>

                    {/* friend status section */}
                    <div>
                        {isFriend ? (
                            <button
                                className="inline-flex items-center px-3 py-2 text-sm font-medium font-quicksand text-center text-black bg-green-400 
                                rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:purpleContrast 
                                dark:hover:bg-blue-700 dark:focus:ring-white-800 mb-1">
                                Följer
                            </button>
                        ) : hasSentRequest ? (
                            <button
                                className="inline-flex items-center px-3 py-2 text-sm font-medium font-quicksand text-center text-gray-500 bg-gray-300 
                                rounded-lg cursor-not-allowed mb-1">
                                Förfrågan skickad
                            </button>
                        ) : (
                            <button onClick={sendFriendReq}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium font-quicksand text-center text-black bg-Flesh 
                                rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:purpleContrast 
                                dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-1">
                                Följ
                            </button>
                        )}
                    </div>

                    {/* friendsBox component */}
                    <FriendBox friends={friends} />

                    {/* favorite Box component */}
                    <FriendFavoriteBox id={userId} />
                </div>
            </div>
        </>

    )
}

export default FriendPage