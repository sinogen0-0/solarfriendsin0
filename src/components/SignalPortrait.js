import React from 'react';
import { createArchiveAdapter } from '../archive';
import { useSignalConsent } from '../hooks/useSignalConsent';
import { signalGroups } from '../signals/registry';

const groupOrder = ['display', 'locale', 'accessibility', 'hardware', 'rendering', 'audio', 'typography', 'gesture'];
const orderedGroups = groupOrder.map((id) => signalGroups.find((group) => group.id === id)).filter(Boolean);

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'Unavailable';
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2).slice(0, 220);
  }

  return String(value).slice(0, 160);
}

export default function SignalPortrait() {
  const { settings, toggleGroup } = useSignalConsent();
  const [snapshot, setSnapshot] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [withdrawn, setWithdrawn] = React.useState(false);

  React.useEffect(() => {
    const nextSnapshot = {};

    orderedGroups.forEach((group) => {
      if (settings[group.id]) {
        nextSnapshot[group.id] = group.collect();
      }
    });

    setSnapshot(nextSnapshot);
  }, [settings]);

  const handleSubmit = async () => {
    const adapter = createArchiveAdapter();
    const deletionToken = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `signal-${Date.now()}`;
    const record = {
      deletionToken,
      consent: { ...settings },
      snapshot,
      archivedAt: new Date().toISOString(),
    };

    try {
      await adapter.submit(record);
      localStorage.setItem('solar-friend-signal-deletion-token', deletionToken);
      setSubmitted(true);
      setWithdrawn(false);
    } catch (error) {
      setSubmitted(false);
    }
  };

  const handleWithdraw = async () => {
    const token = localStorage.getItem('solar-friend-signal-deletion-token');

    if (token) {
      const adapter = createArchiveAdapter();
      try {
        await adapter.deleteByToken(token);
      } catch (error) {
        // Best-effort deletion; still clear the local reference below.
      }
    }

    localStorage.removeItem('solar-friend-signal-deletion-token');
    setSubmitted(false);
    setWithdrawn(true);
  };

  return (
    <aside className="signal-portrait-panel" aria-live="polite">
      <div className="signal-portrait-surface">
        <div className="signal-portrait-header">
          <div>
            <p className="eyebrow">CONSENTED READ</p>
            <h3>Signal Portrait</h3>
          </div>
        </div>

          <div className="signal-portrait-intro">
            <p>What the browser reveals without a prompt is shown first. Deeper fingerprinting stays off until you switch it on.</p>
          </div>

          <div className="signal-tier-block">
            <h4>Visible now</h4>
            {orderedGroups.filter((group) => group.defaultOn).map((group) => (
              <div className="signal-card" key={group.id}>
                <div className="signal-card-header">
                  <div>
                    <strong>{group.label}</strong>
                    <small>{group.description}</small>
                  </div>
                  <button
                    type="button"
                    className={`signal-toggle ${settings[group.id] ? 'is-on' : 'is-off'}`}
                    onClick={() => toggleGroup(group.id)}
                    aria-pressed={settings[group.id]}
                  >
                    {settings[group.id] ? 'On' : 'Off'}
                  </button>
                </div>

                {settings[group.id] && snapshot[group.id] ? (
                  <dl className="signal-metrics">
                    {Object.entries(snapshot[group.id]).slice(0, 4).map(([key, value]) => (
                      <div key={`${group.id}-${key}`}>
                        <dt>{key}</dt>
                        <dd>{formatValue(value)}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="signal-muted">Hidden until enabled.</p>
                )}
              </div>
            ))}
          </div>

          <div className="signal-tier-block">
            <h4>Off until you allow it</h4>
            {orderedGroups.filter((group) => !group.defaultOn).map((group) => (
              <div className="signal-card danger-card" key={group.id}>
                <div className="signal-card-header">
                  <div>
                    <strong>{group.label}</strong>
                    <small>{group.description}</small>
                  </div>
                  <button
                    type="button"
                    className={`signal-toggle ${settings[group.id] ? 'is-on' : 'is-off'}`}
                    onClick={() => toggleGroup(group.id)}
                    aria-pressed={settings[group.id]}
                  >
                    {settings[group.id] ? 'On' : 'Off'}
                  </button>
                </div>

                {settings[group.id] && snapshot[group.id] ? (
                  <dl className="signal-metrics">
                    {Object.entries(snapshot[group.id]).slice(0, 4).map(([key, value]) => (
                      <div key={`${group.id}-${key}`}>
                        <dt>{key}</dt>
                        <dd>{formatValue(value)}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="signal-muted">No fingerprinting yet.</p>
                )}
              </div>
            ))}
          </div>

          <div className="signal-actions">
            <button type="button" className="button button-primary" onClick={handleSubmit}>
              Submit portrait
            </button>
            <button type="button" className="button button-quiet" onClick={handleWithdraw}>
              Withdraw
            </button>
          </div>

          {submitted ? <p className="signal-success">Stored with your consent and a deletion token.</p> : null}
          {withdrawn ? <p className="signal-success">Withdrawn. Your archived portrait was deleted.</p> : null}
      </div>
    </aside>
  );
}
