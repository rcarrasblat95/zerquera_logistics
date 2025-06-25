"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    state?: string;
    country?: string;
  };
};

type MapContextType = {
  pickup: [number, number] | null;
  dropoff: [number, number] | null;
  setPickup: (value: [number, number] | null) => void;
  setDropoff: (value: [number, number] | null) => void;
  pickupSuggestions: Suggestion[];
  dropoffSuggestions: Suggestion[];
  setPickupSuggestions: (value: Suggestion[]) => void;
  setDropoffSuggestions: (value: Suggestion[]) => void;
  fetchPickupSuggestions: (query: string) => void;
  fetchDropoffSuggestions: (query: string) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [pickup, setPickup] = useState<[number, number] | null>(null);
  const [dropoff, setDropoff] = useState<[number, number] | null>(null);
  const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<Suggestion[]>([]);

  async function fetchSuggestions(query: string, setSuggestions: (s: Suggestion[]) => void) {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=pk.eyJ1IjoicmNhcnJhc2JsYXQ5NSIsImEiOiJjbWNianFjYmcwZXA3MmxwdHEza3Fzd3BpIn0.gVCgoS2mYgzOZNA_fErLbw&autocomplete=true&country=US&limit=5`
      );

      if (!res.ok) {
        console.error("Error en la petición a Mapbox:", res.status);
        setSuggestions([]);
        return;
      }

      const data = await res.json();
      const suggestions: Suggestion[] = data.features.map((f: any) => ({
        display_name: f.place_name,
        lat: f.center[1].toString(),
        lon: f.center[0].toString(),
      }));
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error al buscar sugerencias con Mapbox:", error);
      setSuggestions([]);
    }
  }

  const fetchPickupSuggestions = (q: string) => fetchSuggestions(q, setPickupSuggestions);
  const fetchDropoffSuggestions = (q: string) => fetchSuggestions(q, setDropoffSuggestions);

  return (
    <MapContext.Provider
      value={{
        pickup,
        dropoff,
        setPickup,
        setDropoff,
        pickupSuggestions,
        dropoffSuggestions,
        fetchPickupSuggestions,
        fetchDropoffSuggestions,
        setPickupSuggestions,
        setDropoffSuggestions,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) throw new Error("useMapContext must be used within MapProvider");
  return context;
}