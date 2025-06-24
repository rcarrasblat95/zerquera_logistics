"use client";

import React, { useEffect, useState } from "react";

export default function MapClientWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  // Carga dinámica retardada (solo en el cliente, evita SSR)
  const Lazy = require("./MapClient").default;
  return <Lazy />;
}