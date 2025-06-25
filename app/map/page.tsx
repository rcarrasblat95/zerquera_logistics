"use client";

import dynamic from "next/dynamic";

// Este wrapper garantiza que Leaflet se cargue solo en cliente
const MapClientWrapper = dynamic(
  () => import("@/components/MapClientWrapper"),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="w-screen overflow-x-hidden">
      <MapClientWrapper />
    </div>
  );
}