// context/SettingsProvider.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import apiService from '@/utils/api/apiService';

const SettingsContext = createContext({});

const normalizeSettings = (raw) => {
  if (!raw) return {};
  const list = Array.isArray(raw?.data) ? raw.data : (Array.isArray(raw) ? raw : []);
  const map = { data: list };
  list.forEach((item) => {
    if (item && item.key) {
      map[item.key] = item.value;
    }
  });
  return map;
};

export default function SettingsProvider({ settings: initialSettings, children }) {
  const [settings, setSettings] = useState(() => normalizeSettings(initialSettings));

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
          setSettings(normalizeSettings(res.data));
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