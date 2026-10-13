// context/SettingsProvider.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '@/utils/api/apiService';

const SettingsContext = createContext({});

export default function SettingsProvider({ settings: initialSettings, children }) {
  const [settings, setSettings] = useState(initialSettings ?? {});

  useEffect(() => {
    let isMounted = true;

    const fetchLatestSettings = async () => {
      try {
        const res = await apiService.get('/settings', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        });
        if (isMounted && res?.data) {
          setSettings(res.data);
        }
      } catch (err) {
        // Silently preserve initialSettings if network fails
      }
    };

    fetchLatestSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SettingsContext.Provider value={settings ?? {}}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}