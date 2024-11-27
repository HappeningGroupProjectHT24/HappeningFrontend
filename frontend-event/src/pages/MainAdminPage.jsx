import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import AllUsersBox from '../components/AllUsersBox';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminPage = () => {

    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllUsers = async () => {

            try {

                const token = localStorage.getItem("token");

                console.log('fetched token : ', token)

                if (!token) {
                    console.error("no token found, redirecting user to login page.")
                    navigate("/login");
                    return;
                }

                //decode token to check if admin
                const decodedToken = jwtDecode(token);
                const roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
                const userRole = decodedToken[roleKey];

                if (userRole != "Admin") {

                    console.error("Unauthorized access. Only admins allowed. Redirecting to login page. you are logged in as:" + userRole);
                    navigate("/login");
                    return
                }

                const response = await axios.get(`https://localhost:7261/api/Admin/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data) {

                    console.log('All users', response)
                    setAllUsers(response.data);
                }

                else {

                    console.log('Couldnt fetch data!', response.data)
                }
            }

            catch (error) {
                console.error("Error fetching data", error);
            }

        };

        getAllUsers();

    }, [navigate]);

    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`https://localhost:7261/api/Admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(`User with ID ${userId} deleted successfully.`);

            //used to update the users on the page after deleting one
            setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    return (
        <>
            <div className='userPage min-h-screen bg-DarkPurple flex justify-center item-center'>
                <div className="flex flex-col justify-top items-center mt-4 space-y-4 text-center">
                    <strong className="text-xl">Admin settings</strong>

                    {<AllUsersBox allUsers={allUsers} onDeleteUser={handleDeleteUser} />}
                </div>
            </div>
        </>
    )
}

export default AdminPage