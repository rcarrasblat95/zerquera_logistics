// app/components/MapClient.tsx
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
      mapRef.current?.flyTo([lat, lon], 14);
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
    <div className="h-screen w-full">
      <div className="p-4 bg-white shadow z-10 relative">
        <h2 className="text-lg font-bold mb-2">Buscar dirección:</h2>
        <div className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              placeholder="Ej: Times Square, NY"
              className="border border-gray-300 p-2 rounded w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Buscar
            </button>
          </div>

          <ul className="absolute bg-white shadow rounded w-full mt-1 z-20">
            {suggestions.map((sug, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  const lat = parseFloat(sug.lat);
                  const lon = parseFloat(sug.lon);
                  mapRef.current?.flyTo([lat, lon], 14);
                  setSearchTerm(sug.display_name);
                  setSuggestions([]);
                }}
              >
                {sug.display_name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MapContainer
        center={[27.9944024, -81.7602544]} // Florida
        zoom={13}
        className="h-3/4 w-full z-0"
        whenReady={({ target }) => (mapRef.current = target)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />
        <MapClickHandler />
        {pickup && <Marker position={pickup} icon={customIcon} />} 
        {dropoff && <Marker position={dropoff} icon={customIcon} />} 
      </MapContainer>

      <div className="p-4 bg-white shadow">
        <h2 className="text-lg font-bold mb-2">Resumen:</h2>
        <p>📍 Recogida: {pickup?.join(", ") || "haz clic en el mapa"}</p>
        <p>🏁 Entrega: {dropoff?.join(", ") || "haz clic en el mapa"}</p>
        {distanceMiles && (
          <p>
            🧭 Distancia: <strong>{distanceMiles.toFixed(2)} millas</strong>
          </p>
        )}
        {pickup && dropoff && (
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
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
  );
}