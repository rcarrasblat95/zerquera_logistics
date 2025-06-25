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
    <section className="min-h-screen flex flex-col text-center py-20 md:py-32 bg-white text-black">
      <div className="max-w-2xl w-full space-y-6 mx-auto">
        <h1 className="my-4 text-fluid-heading-xl font-bold text-4xl md:text-5xl leading-tight">
          Get an estimate
        </h1>
        <p className="text-gray-600 text-lg">Enter your addresses to see your prices and schedule</p>
      </div>
      <div className="relative w-full h-full mt-24 md:mt-12 px-0 md:px-4">
        <div className="absolute top-[-80px] md:top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-3xl px-4">
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
          <MapSection />
        {showMap && pickup && dropoff && (
          <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-3xl px-4 md:top-[150px] md:left-[250px] md:transform-none md:w-[479px] md:h-[288px]">
            <div className="space-y-3 overflow-hidden rounded-xl bg-white p-4 pr-0 ring-2 ring-gray-300 @container md:px-6 md:py-[18px] md:pr-6">
              <div className="flex justify-between">
                <div className="max-w-[300px] space-y-3 @4xl:max-w-none text-left">
                  <h6 className="flex flex-row items-center gap-1.5 text-base font-medium">
                    <span>Pickup</span>
                    <div className="inline font-medium text-xs px-1.5 py-1 rounded-md text-white bg-purple-600">2 Luggers</div>
                  </h6>
                  <p className="text-lg font-bold text-gray-900">
                    ${(
                      parseFloat(
                        (
                          Math.sqrt(
                            Math.pow((pickup[0] - dropoff[0]) * 69, 2) +
                            Math.pow((pickup[1] - dropoff[1]) * 54.6, 2)
                          )
                        ).toFixed(2)
                      ) * 15.22
                    ).toFixed(2)} + $1.62 <span className="text-sm font-medium">per min labor</span>
                  </p>
                  <button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-special-100 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 h-8 rounded-lg px-3 text-sm mt-2">
                    Continue
                  </button>
                </div>
                <img
                  alt="Pickup"
                  draggable="false"
                  loading="lazy"
                  width="1"
                  height="1"
                  decoding="async"
                  className="h-auto object-contain w-auto md:hidden"
                  src="/xl_half.svg"
                  style={{ color: "transparent" }}
                />
                <img
                  alt="Pickup"
                  draggable="false"
                  loading="lazy"
                  width="1"
                  height="1"
                  decoding="async"
                  className="h-auto object-contain hidden md:block"
                  src="/xl.svg"
                  style={{ color: "transparent", width: "183px" }}
                />
              </div>
              {/* <div role="alert" className="relative w-full rounded-xl p-4 bg-purple-50 text-purple-900">
                <div className="flex flex-row items-center justify-between gap-2">
                  <div>
                    <h5 className="mb-1.5 text-sm font-medium leading-none tracking-tight">Save 35% — <span className="text-gray-800">Get 1 Lugger</span></h5>
                    <div className="text-xs text-gray-800">Get a single Lugger. Be ready to help if it’s too heavy.</div>
                  </div>
                  <button type="button" role="switch" aria-checked="false" value="on" className="group relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center rounded-full bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex h-full w-8 items-center justify-center opacity-0 group-data-[state=checked]:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="h-5 w-5 text-white"><path fill="currentColor" fillRule="evenodd" d="M16.423 5.244a.833.833 0 0 1 0 1.179l-8.334 8.333a.833.833 0 0 1-1.178 0l-3.334-3.333a.833.833 0 1 1 1.179-1.179L7.5 12.988l7.744-7.744a.833.833 0 0 1 1.179 0" clipRule="evenodd" /></svg>
                    </div>
                    <span className="pointer-events-none block h-7 w-7 rounded-full bg-white shadow-xl ring-0 transition-transform translate-x-0"></span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}