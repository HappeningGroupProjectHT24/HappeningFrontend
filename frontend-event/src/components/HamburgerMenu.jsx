import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/HappeningNavbarLogo.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const [userRoll, setUserRoll] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const checkForUser = () => {
            const token = localStorage.getItem("token");

            if (token === null) {
                setUserId("Guest");
                setUserRoll("Guest")
            } else {
                const decodedToken = jwtDecode(token);
                const theId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
                const typeOfUser = decodedToken[roleClaim]

                if (typeOfUser === "Admin") {
                    setUserRoll("Admin")
                } else if (typeOfUser === "User") {
                    setUserRoll("User")
                }
            }
        }

        checkForUser();
    }, [])

    const handleLogOut = async () => {
        try {
            // Sending the POST request to logout the user
            const response = await axios.post("https://happeningevent.azurewebsites.net/api/Auth/logout", {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            localStorage.removeItem("token");
            alert("Du har loggats ut");
            navigate("/");

        } catch (error) {
            console.error("Logout failed:", error);
            // You can optionally show a message to the user if the logout fails
            alert("An error occurred while logging out. Please try again.");
        }
    };

    console.log(userRoll);

    return (
        <nav className="bg-Flesh text-black shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                <img src={logo} alt="Logo" className="h-14 py-1" />
                <button
                    className="text-xl focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
            </div>
            <div
                className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="bg-inherit px-4 py-2 space-y-2">
                    {userRoll === "Admin" && (
                        <li>
                            <Link
                                to={`/admin`}
                                className="block bg-gray-200 hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded-md shadow-sm transition-colors duration-200 text-center max-w-[90%] mx-auto"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                Admin
                            </Link>
                        </li>
                    )}
                    {(userRoll === "Admin" || userRoll === "User") && (
                        <li>
                            <Link
                                to={`/user`}
                                className="block bg-gray-200 hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded-md shadow-sm transition-colors duration-200 text-center max-w-[90%] mx-auto"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                Profil
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            to="/events"
                            className="block bg-gray-200 hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded-md shadow-sm transition-colors duration-200 text-center max-w-[90%] mx-auto"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            Evenemang
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/aboutus"
                            className="block bg-gray-200 hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded-md shadow-sm transition-colors duration-200 text-center max-w-[90%] mx-auto"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            Om Oss
                        </Link>
                    </li>
                    {(userRoll === "Admin" || userRoll === "User") && (
                        <li>
                            <Link
                                to="/"
                                className="block bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-md shadow-sm transition-colors duration-200 text-center max-w-[90%] mx-auto"
                                onClick={handleLogOut}
                                aria-label="Toggle menu"
                            >
                                Logga Ut
                            </Link>
                        </li>
                    )}
                    {userRoll === "Guest" && (
                        <li>
                            <Link
                                to="/"
                                className="block bg-gray-200 hover:bg-gray-300 text-black font-semibold py-1 px-4 rounded-md shadow-sm transition-colors duration-200 text-center max-w-[90%] mx-auto"
                            >
                                Startsida
                            </Link>
                        </li>
                    )}
                </ul>

            </div>
        </nav>
    );
};

export default HamburgerMenu;
