import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const FriendsAll = () => {
    // using 'uselocation' to fetch 'friends' from parent komponent
    const location = useLocation();
    const friends = location.state || [];
    const navigate = useNavigate();

    const HandleGoBack = () => {
        if (location.pathname === "/user") {
            navigate("/user")
        } else {
            navigate("/friend", { state: { userId: location.state.userId } })
        }
    }

    return (
        <>
            <div className='userPage min-h-screen bg-DarkPurple flex justify-center item-center'>
                <div className="flex flex-col justify-top items-left mt-4 space-y-4 h-[90%]">

                    {/* <div onClick={HandleGoBack} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-Flesh 
                            rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:purpleContrast 
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-1 cursor-pointer font-quicksand">Back</div> */}

                    {friends.length > 0 ? (friends.map((friend, index) => (

                        <div key={index} className='flex justify-left shadow-md w-[17rem] hover:scale-105 rounded-md bg-Flesh'>
                            <div>
                                <img src={friend.profilePictureUrl} alt="FriendProfilePicture" className="w-12 h-12 rounded-md object-cover border-2 border-purple-500" />
                            </div>
                            <div className='flex items-center font-quicksand'>
                                <p>{friend.firstName} {friend.lastName}</p>
                            </div>
                        </div>

                    ))) : (<p>No friends found!</p>)}
                </div>
            </div>
        </>
    )
}

export default FriendsAll