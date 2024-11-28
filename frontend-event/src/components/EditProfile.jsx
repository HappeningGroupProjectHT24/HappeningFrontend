import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const EditProfile = () => {
    const location = useLocation();
    const userId = location.state?.userId;
    const userData = location.state?.userData;
    const [firstName, setFirstName] = useState(userData?.firstName || "");
    const [lastName, setLastName] = useState(userData?.lastName || "");
    const [nickName, setNickName] = useState(userData?.nickName || "");
    const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const updateProfileInfo = async (e) => {
        e.preventDefault();
        if (!firstName, !lastName, !nickName, !phoneNumber) { alert('Fill all the fields!'); return; }

        try {
            const updateData = { firstName, lastName, nickName, phoneNumber };
            const response = await axios.post(`https://happeningevent.azurewebsites.net/api/User/UpdateUser?userId=${userId}`, updateData);
            if (response.status == 200) {
                setSuccessMessage("Success!");
                console.log(errorMessage)
            }
            else {
                setErrorMessage("Failed to update!")
                console.log(errorMessage)
            }
        } catch (error) {
            console.error("Error updating profile!", userId, error);
            setErrorMessage("An error occurred while updateing profile! Please try again.");
        }
    }

    return (
        <>
            <div className='userPage min-h-screen bg-DarkPurple flex justify-center item-center'>
                <div className="flex flex-col justify-top items-left mt-4 space-y-4 h-[90%]">

                    <form className="flex flex-col space-y-2 max-w-lg mx-auto p-5 bg-white shadow-lg rounded-lg">

                        <label htmlFor="firstName" className="text-m font-medium text-gray-800">First name </label>
                        <input className="bg-Flesh p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-DarkPurple focus:border-DarkPurple w-full"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName} type="text" id='firstName' required
                        />

                        <label htmlFor="lastName" className="text-m font-medium text-gray-800">Last name </label>
                        <input className="bg-Flesh p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-DarkPurple focus:border-DarkPurple w-full"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName} type="text" id='lastName' required
                        />

                        <label htmlFor="nickName" className="text-m font-medium text-gray-800">Nickname </label>
                        <input className="bg-Flesh p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-DarkPurple focus:border-DarkPurple w-full"
                            onChange={(e) => setNickName(e.target.value)}
                            value={nickName} type="text" id='nickName' required
                        />


                        <label htmlFor="phoneNumber" className="text-m font-medium text-gray-800">Phone number </label>
                        <input className="bg-Flesh p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-DarkPurple focus:border-DarkPurple w-full"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber} type="text" id='phoneNumber' required
                        />
                        <div className='flex items-center justify-between'>
                            <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-BloodOrange 
                            rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:purpleContrast 
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">
                                <Link to={"/user/"} >
                                    Back
                                </Link>
                            </div>
                            <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-BloodOrange 
                            rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:purpleContrast 
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">
                                <button
                                    onClick={updateProfileInfo}>
                                    Save
                                </button>
                            </div>
                        </div>

                    </form>
                    {successMessage && (
                        <div className="border-1 bg-green-500 text-white text-m font-medium p-4 rounded-lg shadow-xs max-w-lg mx-auto">
                            {successMessage}
                        </div>
                    )}

                </div >
            </div >
        </>
    )
}

export default EditProfile
