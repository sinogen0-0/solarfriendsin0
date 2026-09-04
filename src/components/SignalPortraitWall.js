import React from 'react';
import { createArchiveAdapter } from '../archive';

function buildSummary(record) {
  return Object.entries(record || {}).slice(0, 6).map(([key, value]) => ({
    key,
    value: typeof value === 'string' ? value : JSON.stringify(value),
  }));
}

export default function SignalPortraitWall() {
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {
    const adapter = createArchiveAdapter();
    adapter.fetchAggregate().then((nextRecords) => setRecords(nextRecords)).catch(() => setRecords([]));
  }, []);

  return (
    <section className="section-wrap about-page">
      <p className="eyebrow">ARCHIVE / SIGNAL PORTRAIT</p>
      <h1>Recorded portraits</h1>
      <p className="about-intro">Every stored record is limited to consented signals and a deletion token. Nothing here is a raw ad profile.</p>

      {records.length === 0 ? (
        <div className="signal-empty-state">
          <p>No portraits have been archived yet.</p>
        </div>
      ) : (
        <div className="signal-wall-grid">
          {records.map((record) => (
            <article className="signal-wall-card" key={record.id || record.createdAt}>
              <p className="eyebrow">{record.createdAt ? new Date(record.createdAt).toLocaleString() : 'Stored record'}</p>
              <ul>
                {buildSummary(record).map((item) => (
                  <li key={`${record.id || record.createdAt}-${item.key}`}>
                    <strong>{item.key}:</strong> {item.value}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
