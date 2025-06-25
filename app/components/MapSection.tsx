"use client";

import { useMapContext } from "@/app/context/MapContext";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyToMarkers({ pickup, dropoff }: { pickup: LatLngExpression | null; dropoff: LatLngExpression | null }) {
  const map = useMap();
  useEffect(() => {
    if (pickup && dropoff) {
      map.fitBounds([pickup, dropoff], { padding: [50, 50] });
    }
  }, [pickup, dropoff, map]);
  return null;
}

export default function MapSection() {
  const { pickup, dropoff } = useMapContext();

  const [routeCoords, setRouteCoords] = useState<LatLngExpression[] | null>(null);

  async function fetchRoute(pickup: LatLngExpression, dropoff: LatLngExpression) {
    try {
      const [startLat, startLng] = pickup;
      const [endLat, endLng] = dropoff;
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=pk.eyJ1IjoicmNhcnJhc2JsYXQ5NSIsImEiOiJjbWNianFjYmcwZXA3MmxwdHEza3Fzd3BpIn0.gVCgoS2mYgzOZNA_fErLbw`
      );
      if (!res.ok) throw new Error("Failed to fetch route from Mapbox");
      const data = await res.json();
      const coords = data.routes[0].geometry.coordinates.map(
        ([lon, lat]: [number, number]) => [lat, lon]
      );
      setRouteCoords(coords);
      console.log("📍 Ruta obtenida:", coords.length, "puntos");
    } catch (error) {
      console.error("Error fetching route from Mapbox:", error);
    }
  }

  useEffect(() => {
    if (pickup && dropoff) {
      fetchRoute(pickup, dropoff);
    }
  }, [pickup, dropoff]);

  if (!pickup || !dropoff) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 bg-white shadow-xl rounded-xl p-4 border border-gray-200">
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={pickup}
          zoom={13}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          zoomControl={false}
          touchZoom={false}
          keyboard={false}
          preferCanvas={true}
          className="h-full w-full rounded-lg z-10"
        >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmNhcnJhc2JsYXQ5NSIsImEiOiJjbWNianFjYmcwZXA3MmxwdHEza3Fzd3BpIn0.gVCgoS2mYgzOZNA_fErLbw"
          attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          tileSize={512}
          zoomOffset={-1}
        />
        <Marker position={pickup} icon={customIcon} />
        <Marker position={dropoff} icon={customIcon} />
        {routeCoords && (
          <>
            {console.log("📍 Ruta con", routeCoords.length, "puntos")}
            <Polyline
              positions={routeCoords}
              pathOptions={{
                color: "#4A90E2",
                weight: 6,
                opacity: 0.9,
                lineCap: "round",
                lineJoin: "round"
              }}
            />
          </>
        )}
        {/* {routeCoords && (
          <div className="text-white absolute top-0 left-0 z-[1000] bg-black/70 px-2 py-1 text-xs">
            Ruta: {routeCoords.length} puntos
          </div>
        )} */}
        <FlyToMarkers pickup={pickup} dropoff={dropoff} />
        </MapContainer>
      </div>
    </div>
  );
}