import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import FriendBox from '../components/FriendBox';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteBox from '../components/FavoriteBox';
import { jwtDecode } from 'jwt-decode';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendReq, setFriendReq] = useState([])
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const theId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    const userId = decodedToken[theId]

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

    // function with 'navigate' for editProfile to send userId as prop
    const HandleEditProfile = () => {
        navigate('/editprofile', { state: { userId, userData: user } })
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
                    <h5 className='text-center'>{user ? `${user.firstName} ${user.lastName}` : "Guest"}</h5>

                    {/* edit profile section */}
                    <div>
                        <button
                            onClick={HandleEditProfile}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-Flesh 
                            rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:purpleContrast 
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-1">
                            Ändra profil
                        </button>
                    </div>

                    {/* friendsBox component */}
                    <FriendBox friends={friends} friendReq={friendReq} />

                    {/* favorite Box component */}
                    <FavoriteBox id={userId} />
                </div>
            </div>
        </>

    )
}

export default UserPage
// const userId = "73f663e9-f16b-4503-988a-461318f3ebca";