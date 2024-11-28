import React, { useState, useEffect } from "react";;
import EventDetailsPopup from "./EventDetailsPopup";
import { jwtDecode } from "jwt-decode";
import axios from 'axios'; // Make sure axios is imported

const EventCard = ({ event, onFavoriteToggle }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userFavorites, setFavoriteEvents] = useState([]);

    const currentDate = new Date();

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const theId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    const userId = decodedToken[theId];

    const addEventToUserEndpoint = `https://happeningevent.azurewebsites.net/api/User/${userId}/event`;
    const removeEventFromuser = `https://happeningevent.azurewebsites.net/api/User/${userId}/event/${event.id}`;

    // Fetch user favorites when the component mounts or userId changes
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`https://happeningevent.azurewebsites.net/api/User/${userId}/event`);
                const userFavorites = response.data; console.log

                setFavoriteEvents(userFavorites);

                const isEventFavorite = userFavorites.some(favoriteEvent => favoriteEvent.eventId === event.eventId);
                setIsFavorite(isEventFavorite);
            } catch (error) {
                console.error("Error fetching user favorites:", error);
            }
        };

        fetchFavorites();
    }, [userId, event.eventId]);

    const futureDates = event.dates.filter(date => new Date(date) > currentDate);

    const handleFavoriteToggle = async () => {
        setIsFavorite(!isFavorite);
        onFavoriteToggle(event.id, !isFavorite);

        if (!isFavorite) {
            const eventToAdd = {
                eventId: event.eventId,
                category: event.category,
                title: event.title,
                description: event.description,
                imageUrl: event.imageUrl,
                apiEventUrlPage: event.apiEventUrlPage,
                eventUrlPage: event.eventUrlPage,
                date: event.dates[0],
                ticketsRelease: event.ticketsRelease,
                highestPrice: event.highestPrice,
                lowestPrice: event.lowestPrice,
                venue: event.venue,
            };

            try {
                const response = await fetch(addEventToUserEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(eventToAdd),
                });

                if (!response.ok) throw new Error('Failed to add event');
                console.log("Event successfully added to user");
            } catch (error) {
                console.error('Error adding event to user', error);
            }
        } else {
            try {
                const eventToDelete = userFavorites.find(e => e.eventId === event.eventId);
                const response = await fetch(`https://happeningevent.azurewebsites.net/api/User/${userId}/event/${eventToDelete.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Failed to remove event');
                console.log("Event successfully removed from user favorites");
            } catch (error) {
                console.error('Error removing event from user', error);
            }
        }
    };

    const dateDisplay = futureDates.length > 1
        ? `${new Date(futureDates[0]).toLocaleString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false })}, flera datum`
        : new Date(futureDates[0]).toLocaleString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: false });

    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupOpen]);

    const handleDetailsClick = () => {
        console.log(
            "Details clicked for",
            event.title,
            "with ID:",
            event.eventId,
            event.lowestPrice,
            event
        );
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="mt-8 m-auto flex-col w-5/6 max-w-full bg-Flesh border border-gray-200 rounded-lg shadow">
            <a href="#">
                <img className="rounded-t-lg object-cover w-full" src={event.imageUrl} alt="official event image" />
            </a>
            <div className="p-5">
                <p className="mb-3 font-normal text-black dark:text-black">{dateDisplay}</p>
                <a href="#">
                    <h6 id="event-card-name " className=" mb-2 text-2xl font-bold text-black dark:text-black !important">{event.title}</h6>
                </a>
                <p className="mb-4">{event.venue.name} {event.venue.city}</p>
                <div className="flex justify-between">
                    <button onClick={handleDetailsClick} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-DarkPurple rounded-lg">
                        Detaljer
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                    <button onClick={handleFavoriteToggle} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite ? "yellow" : "none"} stroke={isFavorite ? "yellow" : "black"} strokeWidth="2" className="w-6 h-6 cursor-pointer">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </button>
                </div>
            </div>

            {isPopupOpen && (
                <EventDetailsPopup event={event} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default EventCard;
