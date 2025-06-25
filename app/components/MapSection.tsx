"use client";

import dynamic from "next/dynamic";

const MapSection = dynamic(() => import("./MapSectionClient"), { ssr: false });
export default MapSection;