"use client";

import dynamic from "next/dynamic";

const MapSection = dynamic(() => import("@/app/components/MapSectionClient"), { ssr: false });
export default MapSection;