import React from 'react';

export const DEFAULT_SIGNAL_CONSENT = {
  display: true,
  locale: true,
  accessibility: true,
  rendering: false,
  audio: false,
  typography: false,
  gesture: false,
  hardware: false,
};

const STORAGE_KEY = 'solar-friend-signal-consent';

export function readSignalConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_SIGNAL_CONSENT };
    }

    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SIGNAL_CONSENT, ...parsed };
  } catch (error) {
    return { ...DEFAULT_SIGNAL_CONSENT };
  }
}

export function useSignalConsent() {
  const [settings, setSettings] = React.useState(() => readSignalConsent());

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggleGroup = (groupId) => {
    setSettings((current) => ({
      ...current,
      [groupId]: !current[groupId],
    }));
  };

  const setGroup = (groupId, value) => {
    setSettings((current) => ({
      ...current,
      [groupId]: Boolean(value),
    }));
  };

  const reset = () => setSettings({ ...DEFAULT_SIGNAL_CONSENT });

  return {
    settings,
    toggleGroup,
    setGroup,
    reset,
  };
}
