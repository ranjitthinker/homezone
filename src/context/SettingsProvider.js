// context/SettingsProvider.js
'use client';
import { createContext, useContext } from 'react';

const SettingsContext = createContext({}); // ✅ default to empty object, not null

export default function SettingsProvider({ settings, children }) {
  return (
    <SettingsContext.Provider value={settings ?? {}}>  {/* ✅ fallback if null */}
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext); // ✅ no more throw, just returns {} if unavailable
}