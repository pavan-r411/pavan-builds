"use client";

import { useEffect } from "react";

export function Tracker() {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referer: document.referrer || "",
      }),
    })
      .then((r) => r.json())
      .then((d) => console.log("[tracker]", d))
      .catch(() => {});
  }, []);

  return null;
}
