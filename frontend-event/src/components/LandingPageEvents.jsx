import axios from "axios";
import React, { useEffect, useState } from "react";
import LandingPageEventCards from "./LandingPageEventCard";

const LandingPageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ticketMasterEndpoint =
    "https://happeningevent.azurewebsites.net/TicketMasterAPI/getEvents";
  const visitStockholmEndpoint =
    "https://happeningevent.azurewebsites.net/VisitStockholmAPI/getEvents";

  const normalizeImageUrl = (url) => {
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

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

        console.log("All Events with Normalized URLs:", allEvents);

        // Sort and remove duplicates
        const sortedEvents = allEvents.sort((a, b) => {
          const dateA = new Date(a.dates[0]);
          const dateB = new Date(b.dates[0]);
          return dateA - dateB;
        });

        const seen = new Set();
        const uniqueEvents = sortedEvents.filter((event) => {
          const uniqueKey = `${event.name}-${event.dates[0]}-${event.location}`;
          if (seen.has(uniqueKey)) {
            return false;
          }
          seen.add(uniqueKey);
          return true;
        });

        const lessEvents = uniqueEvents.slice(0, 20);

        setEvents(lessEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty array to only run once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[20rem]">
        <div className="w-12 h-12 border-4 border-t-white border-gray-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-quicksand">
        <p>Failed to load events. Please refresh the webpage.</p>
      </div>
    );
  }

  return (
    <div className="!mb-4 m-auto flex flex-row space-x-1 overflow-x-auto w-3/4 h-auto scrollbar-hide bg-Flesh shadow-lg shadow-grey-200/50 rounded-md">
      {events.map((event, index) => (
        <div
          key={index}
          className="flex-shrink-2 min-w-[17rem] py-4 min-h-[20rem]"
        >
          <LandingPageEventCards event={event} />
        </div>
      ))}
    </div>
  );
};

export default LandingPageEvents;
