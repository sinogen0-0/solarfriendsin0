import React from 'react';

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
                        onClick={() => window.open('http://localhost:5173', '_blank', 'noopener,noreferrer')}
                        style={{ margin: '0.5rem' }}
                    >
                        Open Local App (Dev)
                    </button>
                    <a 
                        href="file:///C:/Users/Sinogen/Desktop/DMR"
                        className="artist-info-button"
                        style={{ 
                            display: 'inline-block',
                            margin: '0.5rem',
                            textDecoration: 'none'
                        }}
                    >
                        Open Project Folder
                    </a>
                </div>
                <p style={{ 
                    color: '#888', 
                    fontSize: '0.9rem', 
                    marginTop: '2rem',
                    fontStyle: 'italic'
                }}>
                    Note: The Dungeon Deck Recorder is a separate Svelte application. 
                    Run 'npm run dev' in the DMR directory to start the local development server.
                </p>
            </div>
        </div>
    );
};

export default DungeonDeckRecorder;
