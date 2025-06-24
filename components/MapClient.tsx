"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import L, { Map as LeafletMap, LeafletEvent } from "leaflet";
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
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center">
      <div className="p-4 shadow z-10 relative bg-background text-foreground border-b border-gray-700 w-full max-w-3xl">
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
              className="border border-gray-600 bg-background text-foreground p-2 rounded w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Buscar
            </button>
          </div>

          <ul className="absolute bg-background text-foreground shadow rounded w-full mt-1 z-20">
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
        </div>
      </div>

      <MapContainer
        center={[27.9944024, -81.7602544]}
        zoom={9}
        className="h-[500px] w-full max-w-3xl z-0"
        ref={mapRef as any}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />
        <MapClickHandler />
        {pickup && <Marker position={pickup} icon={customIcon} />}
        {dropoff && <Marker position={dropoff} icon={customIcon} />}
      </MapContainer>

      <div className="p-4 bg-background text-foreground shadow border-t border-gray-700 w-full max-w-3xl">
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
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
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