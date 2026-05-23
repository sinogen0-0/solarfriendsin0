import React from 'react';

const DMR_DEPLOY_URL = 'https://dungeon-deck-recorder.vercel.app';
const DMR_GITHUB_URL = 'https://github.com/sinogen0-0/DMR';

const DungeonDeckRecorder = ({ onBack }) => {
    return (
        <div style={{ padding: '20px' }}>
            <button className="artist-info-button" onClick={onBack} style={{ margin: '20px' }}>
                Back to Enchantments
            </button>
            <div style={{ 
                textAlign: 'center', 
                padding: '2rem',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <h2 style={{ color: '#e0e0e0', marginBottom: '2rem' }}>Dungeon Deck Recorder</h2>
                <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
                    A tool for recording and managing your tabletop RPG sessions.
                </p>
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button 
                        className="artist-info-button"
                        onClick={() => window.open(DMR_DEPLOY_URL, '_blank', 'noopener,noreferrer')}
                        style={{ margin: '0.5rem' }}
                    >
                        Open Live App
                    </button>
                    <a 
                        href={DMR_GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="artist-info-button"
                        style={{ 
                            display: 'inline-block',
                            margin: '0.5rem',
                            textDecoration: 'none'
                        }}
                    >
                        View GitHub Repository
                    </a>
                </div>
                <p style={{ 
                    color: '#888', 
                    fontSize: '0.9rem', 
                    marginTop: '2rem',
                    fontStyle: 'italic'
                }}>
                    Note: The Dungeon Deck Recorder is a separate Svelte application with web deployment and source code maintained independently.
                </p>
            </div>
        </div>
    );
};

export default DungeonDeckRecorder;
