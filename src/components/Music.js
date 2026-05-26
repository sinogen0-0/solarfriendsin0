import React, { useState } from 'react';
import LazyLoad from 'react-lazyload';
import './PotteryGrid.css';
import musicData from '../data/music';

const Music = ({ onBack }) => {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedAlbum(null);
            setIsClosing(false);
        }, 300);
    };

    const handleAlbumClick = (item) => {
        if (selectedAlbum && selectedAlbum.id === item.id) {
            handleClose();
        } else {
            setSelectedAlbum(item);
        }
    };

    const handleBandcampClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div>
            <button className="artist-info-button" onClick={onBack} style={{ margin: '20px' }}>
                Back to Enchantments
            </button>
            <div className="pottery-grid">
                {musicData.map(item => (
                    <div 
                        key={item.id} 
                        className={`pottery-item ${selectedAlbum?.id === item.id ? 'enlarged' : ''}`}
                        onClick={() => handleAlbumClick(item)}
                    >
                        <LazyLoad height={200} offset={100} once>
                            <img src={item.previewUrl || item.imageUrl} alt={item.title} />
                        </LazyLoad>
                    </div>
                ))}
                {selectedAlbum && (
                    <div className={`overlay ${isClosing ? 'fade-out' : ''}`} onClick={handleClose}>
                        <div className="enlarged-container" onClick={(e) => e.stopPropagation()}>
                            <div className="enlarged-image-container">
                                <img src={selectedAlbum.imageUrl} alt={selectedAlbum.title} />
                            </div>
                            <div className="enlarged-description-container">
                                {selectedAlbum.bandcampUrl && (
                                    <button 
                                        className="artist-info-button" 
                                        onClick={() => handleBandcampClick(selectedAlbum.bandcampUrl)}
                                        style={{ marginTop: '1rem' }}
                                    >
                                        Listen on Bandcamp
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Music;
