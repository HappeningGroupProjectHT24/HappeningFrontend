import { React } from "react";
import "./style/EventCard.css";
import { htmlToText } from "html-to-text";

const LandingPageEventPopup = ({ event, onClose }) => {
  const eventDescription = htmlToText(event.description);

  const currentDate = new Date();

  const upcomingDates = event.dates;

  const handleRedirect = (url) => {
    window.open(url);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-flesh bg-opacity-50 transition-opacity duration-300 ease-out animate-fadeIn">
      {/* card Wrapper*/}
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full overflow-hidden">
        {/* pic div */}
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={event.imageUrl}
            alt="event image"
          />
        </div>

        {/* c */}
        <div className="p-5">
          {/* Titel */}
          <h2 className="text-xl font-dancing text-Purple">{event.title}</h2>

          {/* Date */}
          <div className="mt-3">
            <p className="font-semibold">Datum:</p>
            <p className="text-sm text-gray-600">
              {new Date(upcomingDates).toLocaleString("sv-SE", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
          </div>

          {/* description */}
          <div className="mt-3">
            <p className="font-semibold">Beskrivning:</p>
            <p className="text-sm text-gray-600">
              {event.description || "Ingen beskrivning tillgänglig."}
            </p>
          </div>

          {/* Adress & price */}
          <div className="mt-3">
            <p>
              <strong>Adress:</strong> {event.venue.address}, {event.venue.city}
            </p>
            <p>
              <strong>Pris från:</strong>
              {event.lowestPrice !== undefined && event.lowestPrice !== 0
                ? ` ${event.lowestPrice}:-`
                : event.highestPrice !== undefined && event.highestPrice !== 0
                ? ` ${event.highestPrice}:-`
                : " Se biljettssidan"}
            </p>
          </div>

          {/* buttons */}
          <div className="mt-5 flex justify-between">
            <button
              onClick={() => handleRedirect(event.eventUrlPage)}
              className="bg-DarkPurple text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Biljetter
            </button>
            <button
              onClick={onClose}
              className="bg-DarkPurple text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Stäng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageEventPopup;
