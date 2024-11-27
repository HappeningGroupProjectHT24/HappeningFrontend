import axios from "axios";
import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import ChooseDateButton from "../components/ChooseDate";
import ReactPaginate from "react-paginate";
import { jwtDecode } from 'jwt-decode';
import GuestEventCard from '../components/GuestEventCard'

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [displayedEvents, setDisplayedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [userType, setUserType] = useState("");

    const eventsPerPage = 7;

  const ticketMasterEndpoint =
    "https://localhost:7261/TicketMasterAPI/getEvents";
  const visitStockholmEndpoint =
    "https://localhost:7261/VisitStockholmAPI/getEvents";
  const KBEventsEndpoint = "https://localhost:7621/KBEventAPI/getEvents";

    const normalizeImageUrl = (url) => {
        if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
            return `https://${url}`;
        }
        return url;
    };

    useEffect(() => {
        const checkForUser = () => {
            const token = localStorage.getItem("token");

            if (token === null) {
                setUserType("guest");
            } else {
                setUserType("user")
            }
        }

        checkForUser();
    }, [])

  // Fetch events from both APIs with pagination
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const [response1, response2] = await Promise.all([
          axios.get(ticketMasterEndpoint),
          axios.get(visitStockholmEndpoint),
        ]);

        let allEvents = [...response1.data, ...response2.data];

                // Normalize image URLs
                allEvents = allEvents.map((event) => ({
                    ...event,
                    imageUrl: normalizeImageUrl(event.imageUrl),
                }));

                // Filter out events with passed dates
                const today = new Date();
                allEvents = allEvents.filter((event) =>
                    event.dates.some((eventDateString) => {
                        const eventDate = new Date(eventDateString);
                        return eventDate >= today; // Keep only events with future or current dates
                    })
                );

                // Sort the events by date
                const sortedEvents = allEvents.sort((a, b) => {
                    const dateA = new Date(a.dates[0]);
                    const dateB = new Date(b.dates[0]);
                    return dateA - dateB;
                });

                // Remove duplicates
                const seen = new Set();
                const uniqueEvents = sortedEvents.filter((event) => {
                    const uniqueKey = `${event.name}-${event.dates[0]}-${event.location}`;
                    if (seen.has(uniqueKey)) {
                        return false;
                    }
                    seen.add(uniqueKey);
                    return true;
                });

        console.log("Unique Events:", uniqueEvents);

        setEvents(uniqueEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
        setLoading(false);
      }
    };

        fetchEvents();
    }, []); // Empty array to only run once on mount


  // Handle date selection and filter events
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update selected date
  };

  // Filter events based on the selected date
  useEffect(() => {
    if (selectedDate) {
      const filteredEvents = events.filter((event) =>
        event.dates.some((eventDateString) => {
          const eventDate = new Date(eventDateString); // Parse the date string into a Date object
          return eventDate >= selectedDate; // Check if the event's date is on or after the selected date
        })
      );
      setDisplayedEvents(filteredEvents.slice(0, eventsPerPage)); // Set filtered events to the state
    } else {
      setDisplayedEvents(events.slice(0, eventsPerPage)); // Show all events if no date is selected
    }
  }, [selectedDate, events]);

  // Handle page change in ReactPaginate
  const handlePageChange = ({ selected }) => {
    setPage(selected + 1); // ReactPaginate uses 0-based indexing, so add 1
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enables smooth scrolling
    });
  };

  const handleFavoriteToggle = (eventId, isFavorite) => {
    if (isFavorite) {
      // Add event to favorites
      setFavoriteEvents((prevFavorites) => [...prevFavorites, eventId]);
    } else {
      // Remove event from favorites
      setFavoriteEvents((prevFavorites) =>
        prevFavorites.filter((id) => id !== eventId)
      );
    }
  };

  // Paginate the events based on the current page
  useEffect(() => {
    const startIndex = (page - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    setDisplayedEvents(events.slice(startIndex, endIndex));
  }, [page, events]);

    return (
        <main className="pb-20">
            <div>
                <ChooseDateButton onDateSelect={handleDateSelect} />
            </div>

            <div className="min-h-screen pt-6 flex flex-col align-middle justify-evenly content-evenly">
                {displayedEvents.map((event) => (
                    userType === "guest" ? (
                        <GuestEventCard key={event.eventId} event={event} />
                    ) : (
                        <EventCard
                            key={event.eventId}
                            event={event}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    )
                ))}

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full border-t-4 border-white border-solid w-16 h-16"></div>
          </div>
        )}
        {error && <div>Error loading events: {error.message}</div>}

                {/* Pagination Controls */}
                <ReactPaginate
                    pageCount={Math.ceil(events.length / eventsPerPage)} // Total number of pages
                    pageRangeDisplayed={3} // Number of pages to show in pagination
                    marginPagesDisplayed={1} // Number of pages to show on either side of the current page
                    onPageChange={handlePageChange}
                    pageClassName="px-1 border-2 rounded-lg"
                    containerClassName="pagination fixed bottom-0 left-0 right-0 flex justify-center mt-4 border-black bg-white py-4 text-l z-10"
                    activeClassName="bg-DarkPurple text-white rounded-lg"
                    previousLabel="Previous"
                    nextLabel="Next"
                    previousClassName="px-1 border-2 rounded-lg"
                    nextClassName="px-1 border-2 rounded-lg"
                />


            </div>
        </main>
    );
};

export default EventPage;
