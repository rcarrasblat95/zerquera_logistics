"use client";

import { useState } from "react";
import { useMapContext } from "@/app/context/MapContext";
import MapSection from "@/app/components/MapSection";

export default function HeroSection() {
  const {
    setPickup,
    setDropoff,
    pickupSuggestions,
    dropoffSuggestions,
    fetchPickupSuggestions,
    fetchDropoffSuggestions,
    setPickupSuggestions,
    setDropoffSuggestions,
    pickup,
    dropoff,
  } = useMapContext();

  const [pickupInput, setPickupInput] = useState("");
  const [dropoffInput, setDropoffInput] = useState("");
  const [showMap, setShowMap] = useState(false);

  const handlePickupSelect = (sug: { display_name: string; lat: string; lon: string }) => {
    setPickup([parseFloat(sug.lat), parseFloat(sug.lon)]);
    setPickupInput(sug.display_name);
    setPickupSuggestions([]);
  };

  const handleDropoffSelect = (sug: { display_name: string; lat: string; lon: string }) => {
    setDropoff([parseFloat(sug.lat), parseFloat(sug.lon)]);
    setDropoffInput(sug.display_name);
    setDropoffSuggestions([]);
  };

  return (
    <section className="min-h-[800px] flex flex-col justify-center text-center py-20 md:py-32 bg-white text-black">
      <div className="justify-items-center-safe">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-[1200px] w-full mx-auto px-6 md:px-0">
          <div className="flex flex-col justify-center items-start space-y-6 text-left max-w-xl py-8 md:pl-10 md:mr-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-tight">
              Elevating the <br /> world of <span className="text-blue-700">Logistics.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              We set the standard in transporting goods from A to B.
            </p>
          </div>
          <div
            className="w-full h-[400px] md:h-[500px] bg-no-repeat bg-[url('/ban_ram.png')] bg-cover bg-left"
            role="img"
            aria-label="Camión de carga"
          />
        </div>
      </div>
    </section>
  );
}