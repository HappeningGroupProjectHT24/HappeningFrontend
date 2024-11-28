import React from 'react';
import { Link } from 'react-router-dom';

const AllUsersBox = ({ allUsers, onDeleteUser }) => {
    // Ensure allUsers is an array and has at least one user
    if (!Array.isArray(allUsers) || allUsers.length === 0) {
        return <p>No Users found.</p>;
    }

    return (
        <>
            {/* User container */}
            <div className="bg-BrightOrange shadow-lg rounded-lg p-6 max-w-md mx-auto mt-8">
                <strong className="text-2xl font-bebas color-color-white">Manage users:</strong>
                <br />
                <div className="bg-Flesh shadow-md rounded-lg p-5 w-80 mx-auto m-1">
                    <div className="mb-4">
                        <input type="text" placeholder=" Search.." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-DarkPurple" />
                    </div>
                </div>
                {/* Friends grid */}
                <div className="grid grid-cols-1 gap-4 w-70 h-70">

                    {allUsers.map((user, index) => (

                        // A div (card) that will be created for every user object
                        <div key={user.id || index} className="bg-Flesh shadow-md rounded-lg p-5 w-80 mx-auto m-1"
                        >
                            {/* User profile image */}
                            <div className="flex justify-center">
                                <img
                                    src={user.profilePictureUrl || '/default-profile.png'}
                                    alt="FriendProfilePicture"
                                    className="w-12 h-12 rounded-md object-cover border-2 border-black"
                                />
                            </div>
                            <div className="flex justify-center">
                                <p className="break-words flex text-center font-quicksand">
                                    {user.userName} <br /> {user.email}

                                </p>
                            </div>

                            {/* User name */}
                            <div className="flex justify-center"><p>

                                <button className="bg-red-700 border-2 border-black text-black text-center w-20 h-6.5 rounded-md hover:bg-red-500 "
                                    onClick={() => onDeleteUser(user.id)}>
                                    <strong className='font-quicksand'>Delete</strong>
                                </button>
                            </p>
                            </div>

                        </div>

                    ))}
                </div>
            </div>
        </>
    );
};

export default AllUsersBox;