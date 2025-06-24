"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import L, { Map as LeafletMap } from "leaflet";
import { debounce } from "lodash";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapClient() {
  const [pickup, setPickup] = useState<[number, number] | null>(null);
  const [dropoff, setDropoff] = useState<[number, number] | null>(null);
  const [distanceMiles, setDistanceMiles] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const mapRef = useRef<LeafletMap | null>(null);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const coord: [number, number] = [e.latlng.lat, e.latlng.lng];
        if (!pickup) setPickup(coord);
        else if (!dropoff) setDropoff(coord);
      },
    });
    return null;
  }

  const fetchSuggestions = debounce(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1&limit=5`
    );
    const data = await res.json();
    setSuggestions(data);
  }, 300);

  async function handleSearch() {
    if (!searchTerm.trim()) return;
    const query = encodeURIComponent(searchTerm);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
    );
    const data = await res.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      const coord: [number, number] = [lat, lon];
      mapRef.current?.flyTo(coord, 14);
      setPickup(coord);
    } else {
      alert("Dirección no encontrada");
    }
  }

  useEffect(() => {
    async function fetchDistance() {
      if (!pickup || !dropoff) return;

      const res = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          method: "POST",
          headers: {
            Authorization: process.env.NEXT_PUBLIC_ORS_API_KEY || "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: [
              [pickup[1], pickup[0]],
              [dropoff[1], dropoff[0]],
            ],
          }),
        }
      );

      if (!res.ok) {
        console.error("Error al obtener distancia");
        return;
      }

      const data = await res.json();
      const meters = data.routes?.[0]?.summary?.distance;
      if (meters) {
        setDistanceMiles(meters / 1609.34);
      }
    }
    fetchDistance();
  }, [pickup, dropoff]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center relative">
      {/* Input flotante */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md px-4">
        <div className="bg-[#111]/90 backdrop-blur-md p-4 rounded-xl shadow border border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              placeholder="Ej: Times Square, NY"
              className="w-full p-2 rounded-md border border-gray-600 bg-[#1e1e1e] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Buscar
            </button>
          </div>
          {suggestions.length > 0 && (
            <ul className="mt-2 max-h-48 overflow-auto bg-[#1e1e1e] rounded-md shadow text-sm">
              {suggestions.map((sug, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    const lat = parseFloat(sug.lat);
                    const lon = parseFloat(sug.lon);
                    const coord: [number, number] = [lat, lon];
                    mapRef.current?.flyTo(coord, 14);
                    setSearchTerm(sug.display_name);
                    setSuggestions([]);
                    setPickup(coord);
                  }}
                >
                  {sug.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className="relative w-full" style={{ height: "100dvh" }}>
        <MapContainer
          center={[27.9944024, -81.7602544]}
          zoom={9}
          className="h-full w-full z-0"
          ref={mapRef as any}
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapClickHandler />
          {pickup && <Marker position={pickup} icon={customIcon} />}
          {dropoff && <Marker position={dropoff} icon={customIcon} />}
        </MapContainer>

        {/* Resumen flotante */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-[1000]">
          <div className="bg-[#111]/90 backdrop-blur-md p-4 rounded-xl shadow border border-gray-700 space-y-2">
            <p>📍 Recogida: {pickup?.join(", ") || "haz clic en el mapa"}</p>
            <p>🏁 Entrega: {dropoff?.join(", ") || "haz clic en el mapa"}</p>
            {distanceMiles && (
              <p>
                🧭 Distancia: <strong>{distanceMiles.toFixed(2)} millas</strong>
              </p>
            )}
            {pickup && dropoff && (
              <button
                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
                onClick={() => {
                  setPickup(null);
                  setDropoff(null);
                  setDistanceMiles(null);
                }}
              >
                Reiniciar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}