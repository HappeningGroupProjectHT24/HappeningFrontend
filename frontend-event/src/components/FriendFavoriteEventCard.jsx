import React, { useState } from 'react'
import FavoriteEventPopup from './FavoriteEventPopup';
import './style/FavoriteEventCardStyle.css'
import { jwtDecode } from 'jwt-decode';

const FriendFavoriteEventCard = ({ event }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const dateDisplay = event.date;

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const theId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    const userId = decodedToken[theId]

    const handleDetailsClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleEventDelete = async () => {
        const id = event.id;
        try {
            const response = await fetch(`https://happeningevent.azurewebsites.net/api/User/${userId}/event/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to remove event');
            }
            console.log("Event successfully removed from user favorites");
            location.reload();
        } catch (error) {
            console.log("Error deleting event", error)
        }
    }

    return (
        <div className="flex flex-col justify-between bg-Flesh border border-gray-200 rounded-lg shadow dark:purpleDark dark:border-gray-700 h-[25rem] w-full m-1">
            {/* picture and date div */}
            <div>
                {/* picture div */}
                <div className="min-h-[10rem] bg-gray-200 dark:bg-white-700 rounded-t-lg">
                    <a href={event.apiEventUrlPage} target="_blank" rel="noopener noreferrer">
                        {event.imageUrl
                            ?
                            (<img className="w-full h-[10rem] object-cover rounded-t-lg" src={event.imageUrl} alt="event image" />)
                            :
                            (<img className="w-full h-full object-cover rounded-t-lg" src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30" alt="Default event image" />)
                        }
                    </a>
                </div>

                <div className="pt-4">
                    {/* date div */}
                    <div className='p-1 pl-4'>
                        <p className="mb-2 font-normal text-black-700 dark:text-black-400">{dateDisplay
                            ?
                            (<p>{new Date(dateDisplay).toLocaleString('sv-SE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: false,
                            })}</p>)
                            :
                            (<p>No date</p>)}
                        </p>
                    </div>
                </div>
            </div>

            {/* title, venue, city, button div */}
            <div className="flex-1 p-1 overflow-hidden pl-4">
                {/* title div */}
                <div className='w-auto h-[3rem] mb-2'>
                    <a href="#">
                        <h6 className="mb-2 text-xl font-bold tracking-tight text-black truncate">{event.title}</h6>
                    </a>
                </div>
                {/* venue & city div */}
                <div>
                    <p className="mb-4">{event.venue.name} <br />{event.venue.city}</p>
                </div>
                {/* button div */}
                <div >
                    <button onClick={handleDetailsClick} href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-DarkPurple rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:purpleContrast dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Detaljer
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>

            {isPopupOpen && (
                <FavoriteEventPopup event={event} onClose={handleClosePopup} />
            )}
        </div>
    );
}

export default FriendFavoriteEventCard
