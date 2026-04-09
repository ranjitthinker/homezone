// app/ClientProviders.jsx — Client Component
"use client";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import SettingsProvider from "@/context/SettingsProvider";
import ScrollToTop from "@/components/common/ScrollTop";

export default function ClientProviders({ settings, children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap");
    }
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });
  }, []);

  return (
    <SettingsProvider settings={settings}>  {/* ✅ wraps everything once */}
      <div className="wrapper ovh">{children}</div>
      <ScrollToTop />
    </SettingsProvider>
  );
}