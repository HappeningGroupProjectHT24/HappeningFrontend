import React from "react";
import logo from "../assets/HappeningLogo.png";
import LandingPageEvents from "../components/LandingPageEvents";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleEventsRedirect = () => {
    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-Flesh flex flex-col text-center">
      {/* Header Section */}
      <div
        className="bg-[url('https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] 
  p-4 shadow-lg sm:w-[100%] m-auto   h-[500px] bg-cover flex flex-col justify-center"
      >
        <img className="lg:w-96 flex m-auto " src={logo}></img>
      </div>
      <div className="p-4 sm:w-full md:w-[75%] md:m-auto bg-cover flex flex-col">
        <h1 className="text-5xl font-dancing text-Purple mb-4 sm:text-4xl">
          Happening
        </h1>
        <p className="text-BloodOrange font-bebas sm:text-2xl leading-relaxed">
          Alla dina evenemang på ett ställe. Kombinera, organisera och missa
          aldrig ett ögonblick.
        </p>
        {/* Fluff Section */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-black font-quicksand sm:text-base">
          <p className="p-4 h-40 bg-white shadow-lg rounded-lg flex items-center justify-center">
            Happening hjälper dig att förenkla ditt liv genom att samla alla
            dina evenemang på ett ställe. Inga fler spridda inbjudningar eller
            bortglömda datum – håll dig organiserad och fokuserad på det som är
            viktigt.
          </p>
          <p className="p-4 h-40 bg-white shadow-lg rounded-lg flex items-center justify-center">
            Planera, upptäck och njut av evenemang utan ansträngning, med
            funktioner som är anpassade för att göra din upplevelse smidig och
            trevlig.
          </p>
        </div>
      </div>

      {/* Action Section */}

      <div className="flex flex-col align-center justify-center my-4">
        <h2 className="mt-3 mb-6 font-bebas bg-Flesh sm:text-2xl">
          Kommande evenemang
        </h2>
        <LandingPageEvents />
      </div>
      <div className="mb-6 flex flex-col gap-4 w-full px-6">
        <button
          onClick={handleEventsRedirect}
          className="bg-BloodOrange font-bebas sm:w-full md:w-96 md:m-auto py-3 rounded-lg font-semibold border-2 border-black hover:bg-[#f4e4e4] transition sm:text-xl"
        >
          Se Alla Events
        </button>
      </div>
      <div className="mb-6 flex flex-col gap-4 w-full px-6 ">
        <button
          onClick={handleLoginRedirect}
          className="bg-BloodOrange font-bebas sm:w-full md:w-96 md:m-auto py-3 rounded-lg font-semibold border-2 border-black hover:bg-[#f4e4e4] transition sm:text-xl"
        >
          Logga In/Skapa Konto
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
