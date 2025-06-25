"use client";

import { useMapContext } from "@/app/context/MapContext";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const pickupIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const dropoffIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapSectionClient() {
  const { pickup, dropoff } = useMapContext();
  const [route, setRoute] = useState<LatLngExpression[] | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (pickup && dropoff) {
      const fetchRoute = async () => {
        const [startLat, startLng] = pickup;
        const [endLat, endLng] = dropoff;
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=pk.eyJ1IjoicmNhcnJhc2JsYXQ5NSIsImEiOiJjbWNianFjYmcwZXA3MmxwdHEza3Fzd3BpIn0.gVCgoS2mYgzOZNA_fErLbw`
        );
        const data = await res.json();
        const coords = data.routes[0]?.geometry?.coordinates;
        if (coords) {
          const latlngs = coords.map(([lng, lat]: [number, number]) => [lat, lng]);
          setRoute(latlngs);
          if (mapRef.current) {
            const bounds = L.latLngBounds(latlngs);
            const offsetBounds = bounds.pad(0.2); // Agrega un 20% extra de espacio alrededor
            mapRef.current.fitBounds(offsetBounds, { paddingTopLeft: [0, 150], paddingBottomRight: [0, 0] });
          }
        }
      };
      fetchRoute();
    }
  }, [pickup, dropoff]);

  return (
    
    <MapContainer
      center={pickup || [27.994402, -81.760254]} // Florida default
      zoom={8}
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
      ref={mapRef}
      style={{
        height: "500px",
        width: "100%",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 0,
        zIndex: 0,
      }}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmNhcnJhc2JsYXQ5NSIsImEiOiJjbWNianFjYmcwZXA3MmxwdHEza3Fzd3BpIn0.gVCgoS2mYgzOZNA_fErLbw"
        attribution='© <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      {pickup && <Marker position={pickup} icon={pickupIcon} />}
      {dropoff && <Marker position={dropoff} icon={dropoffIcon} />}
      {route && <Polyline positions={route} color="#4A90E2" weight={5} />}
      
    </MapContainer>
  );
}