// Every collector returns { ok, entries[], note } so the panel can render partial reads
// and unsupported APIs identically. An unanswered signal is displayable material, not an error.

export function entry(key, value, detail) {
  return { key, value, detail };
}

export function unsupported(note) {
  return { ok: false, entries: [], note };
}

export function reading(entries, note) {
  return { ok: true, entries: entries.filter(Boolean), note };
}

// Collectors touch APIs that throw in hardened or privacy-patched browsers. A refusal is
// recorded as its own reading rather than propagating.
export function attempt(label, fn, fallback = null) {
  try {
    const value = fn();
    if (value === undefined || value === null || value === '') return fallback;
    return value;
  } catch (err) {
    return fallback === null ? `refused (${label})` : fallback;
  }
}

export function round(value, places = 2) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

// FNV-1a. Not cryptographic — this only needs to be stable and short enough to display.
export function hashString(input) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
