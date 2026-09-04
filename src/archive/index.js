const STORE_KEY = 'solar-friend-signal-archive';

export class NullArchiveAdapter {
  async submit(entry) {
    const drafts = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    const record = {
      id: `local-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      ...entry,
    };

    drafts.unshift(record);
    localStorage.setItem(STORE_KEY, JSON.stringify(drafts.slice(0, 50)));
    return record;
  }

  async fetchAggregate() {
    const raw = localStorage.getItem(STORE_KEY) || '[]';
    return JSON.parse(raw);
  }

  async deleteByToken(token) {
    const drafts = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    const next = drafts.filter((item) => item.deletionToken !== token);
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
    return { deleted: next.length !== drafts.length };
  }
}

export function createArchiveAdapter() {
  const backend = process.env.REACT_APP_SIGNAL_BACKEND || 'null';

  if (backend === 'null') {
    return new NullArchiveAdapter();
  }

  return new NullArchiveAdapter();
}
