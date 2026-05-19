import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import './PotteryGrid.css';

const BaseGrid = ({ data, onBack }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedImage(null);
            setIsClosing(false);
        }, 300);
    };

    const handleImageClick = (item) => {
        if (selectedImage && selectedImage.id === item.id) {
            handleClose();
        } else {
            setSelectedImage(item);
        }
    };

    return (
        <div>
            <button className="artist-info-button" onClick={onBack} style={{ margin: '20px' }}>
                Back to Enchantments
            </button>
            <div className="pottery-grid">
                {data.map(item => (
                    <div 
                        key={item.id} 
                        className={`pottery-item ${selectedImage?.id === item.id ? 'enlarged' : ''}`}
                        onClick={() => handleImageClick(item)}
                    >
                        <LazyLoad height={200} offset={100} once>
                            {item.isVideo ? (
                                <video 
                                    src={item.videoUrl || item.imageUrl} 
                                    muted 
                                    loop 
                                    playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <img src={item.previewUrl || item.imageUrl} alt={item.title} />
                            )}
                        </LazyLoad>
                    </div>
                ))}
                {selectedImage && (
                    <div className={`overlay ${isClosing ? 'fade-out' : ''}`} onClick={handleClose}>
                        <div className="enlarged-container" onClick={handleClose}>
                            <div className="enlarged-image-container">
                                {selectedImage.isVideo ? (
                                    <video 
                                        src={selectedImage.videoUrl || selectedImage.imageUrl} 
                                        controls 
                                        autoPlay 
                                        loop
                                        style={{ maxWidth: '100%', maxHeight: '80vh' }}
                                    />
                                ) : (
                                    <img src={selectedImage.imageUrl} alt={selectedImage.title} />
                                )}
                            </div>
                            <div className="enlarged-description-container">
                                <h3>{selectedImage.title}</h3>
                                <p>{selectedImage.description}</p>
                                {selectedImage.medium && <p><strong>Medium:</strong> {selectedImage.medium}</p>}
                                {selectedImage.dimensions && <p><strong>Dimensions:</strong> {selectedImage.dimensions}</p>}
                                {selectedImage.year && <p><strong>Year:</strong> {selectedImage.year}</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BaseGrid;
