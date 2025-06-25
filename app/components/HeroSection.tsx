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
    <section className="min-h-screen flex flex-col justify-center text-center py-20 md:py-32 bg-white text-black">
      <div className="max-w-2xl w-full space-y-6 mx-auto">
        <h1 className="font-bold text-4xl md:text-5xl leading-tight">
          Move <span className="bg-yellow-200 px-2">anything</span><br />
          <span className="text-gray-500 font-semibold">with the push of a button</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Fully insured. On your schedule. Arriving in as little as 30 minutes.
        </p>
      </div>
      <div className="relative w-full h-[600px] mt-8 px-4">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-3xl px-4">
          <form autoComplete="off" className="flex flex-col md:flex-row gap-2 bg-white rounded-xl border-2 border-purple-500 p-4 shadow-lg">
            <div className="relative flex-grow">
              <label htmlFor="pickup-input" className="block text-sm text-gray-600 text-left mb-1">Pick up from</label>
              <input
                type="text"
                id="pickup-input"
                value={pickupInput}
                onChange={(e) => {
                  setPickupInput(e.target.value);
                  fetchPickupSuggestions(e.target.value);
                }}
                onBlur={() => setPickupSuggestions([])}
                placeholder="Pickup address"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-400 focus:outline-none"
              />
              {pickupSuggestions.length > 0 && (
                <ul className="absolute w-full bg-white border rounded-md mt-1 z-50 text-left max-h-48 overflow-auto shadow-md">
                  {pickupSuggestions
                    .filter(
                      (sug: any) =>
                        typeof sug.display_name === "string" &&
                        sug.display_name.includes("Florida") &&
                        (sug.display_name.includes("United States") || sug.display_name.includes("Estados Unidos"))
                    )
                    .map((sug, i) => (
                      <li
                        key={i}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onMouseDown={() => handlePickupSelect(sug)}
                      >
                        {sug.display_name}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div className="relative flex-grow">
              <label htmlFor="dropoff-input" className="block text-sm text-gray-600 text-left mb-1">Move to</label>
              <input
                type="text"
                id="dropoff-input"
                value={dropoffInput}
                onChange={(e) => {
                  setDropoffInput(e.target.value);
                  fetchDropoffSuggestions(e.target.value);
                }}
                onBlur={() => setDropoffSuggestions([])}
                placeholder="Drop-off address"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-400 focus:outline-none"
              />
              {dropoffSuggestions.length > 0 && (
                <ul className="absolute w-full bg-white border rounded-md mt-1 z-50 text-left max-h-48 overflow-auto shadow-md">
                  {dropoffSuggestions
                    .filter(
                      (sug: any) =>
                        typeof sug.display_name === "string" &&
                        sug.display_name.includes("Florida") &&
                        (sug.display_name.includes("United States") || sug.display_name.includes("Estados Unidos"))
                    )
                    .map((sug, i) => (
                      <li
                        key={i}
                        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onMouseDown={() => handleDropoffSelect(sug)}
                      >
                        {sug.display_name}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition hover:from-purple-600 hover:to-purple-800"
              onClick={(e) => {
                e.preventDefault();
                setShowMap(true);
              }}
            >
              See prices
            </button>

          </form>
        </div>
        {showMap && (
          <MapSection />
          )}
      </div>
    </section>
  );
}