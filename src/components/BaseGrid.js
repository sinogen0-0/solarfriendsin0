import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import './PotteryGrid.css';

// Normalizes an item's photos into a single array of { imageUrl, previewUrl },
// whether it declares a multi-image `images` array or just one imageUrl/previewUrl.
const getItemImages = (item) => {
    if (Array.isArray(item.images) && item.images.length > 0) {
        return item.images;
    }
    return [{ imageUrl: item.imageUrl, previewUrl: item.previewUrl }];
};

const GridCard = ({ item, isSelected, onClick }) => {
    const images = getItemImages(item);
    const [index, setIndex] = useState(0);
    const hasMultiple = images.length > 1;
    const current = images[index] || images[0];

    const goTo = (e, newIndex) => {
        e.stopPropagation();
        setIndex((newIndex + images.length) % images.length);
    };

    return (
        <div
            className={`pottery-item ${isSelected ? 'enlarged' : ''}`}
            onClick={() => onClick(item, index)}
        >
            <LazyLoad height={200} offset={100} once>
                {item.isVideo ? (
                    item.previewUrl ? (
                        <img src={item.previewUrl} alt={`${item.title} preview`} loading="lazy" decoding="async" />
                    ) : (
                        <div className="video-preview-placeholder">Video</div>
                    )
                ) : (
                    <img src={current.previewUrl || current.imageUrl} alt={item.title} loading="lazy" decoding="async" />
                )}
            </LazyLoad>
            {hasMultiple && !item.isVideo && (
                <>
                    <button
                        type="button"
                        className="carousel-arrow carousel-arrow-prev"
                        aria-label="Previous photo"
                        onClick={(e) => goTo(e, index - 1)}
                    >
                        &#8249;
                    </button>
                    <button
                        type="button"
                        className="carousel-arrow carousel-arrow-next"
                        aria-label="Next photo"
                        onClick={(e) => goTo(e, index + 1)}
                    >
                        &#8250;
                    </button>
                    <div className="carousel-dots" onClick={(e) => e.stopPropagation()}>
                        {images.map((_, dotIndex) => (
                            <button
                                type="button"
                                key={dotIndex}
                                className={`carousel-dot ${dotIndex === index ? 'active' : ''}`}
                                aria-label={`Show photo ${dotIndex + 1} of ${images.length}`}
                                onClick={(e) => goTo(e, dotIndex)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const BaseGrid = ({ data, onBack }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
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
            setSelectedItem(null);
            setIsClosing(false);
        }, 300);
    };

    const handleImageClick = (item, index) => {
        if (selectedItem && selectedItem.id === item.id) {
            handleClose();
        } else {
            setSelectedItem(item);
            setSelectedIndex(index);
        }
    };

    const selectedImages = selectedItem ? getItemImages(selectedItem) : [];
    const selectedCurrent = selectedImages[selectedIndex] || selectedImages[0];

    const goToSelected = (e, newIndex) => {
        e.stopPropagation();
        setSelectedIndex((newIndex + selectedImages.length) % selectedImages.length);
    };

    return (
        <div>
            <button className="artist-info-button" onClick={onBack} style={{ margin: '20px' }}>
                Back to Enchantments
            </button>
            <div className="pottery-grid">
                {data.map(item => (
                    <GridCard
                        key={item.id}
                        item={item}
                        isSelected={selectedItem?.id === item.id}
                        onClick={handleImageClick}
                    />
                ))}
                {selectedItem && (
                    <div className={`overlay ${isClosing ? 'fade-out' : ''}`} onClick={handleClose}>
                        <div className="enlarged-container" onClick={handleClose}>
                            <div className="enlarged-image-container">
                                {selectedItem.isVideo ? (
                                    <video 
                                        src={selectedItem.videoUrl || selectedItem.imageUrl} 
                                        controls 
                                        autoPlay 
                                        loop
                                        preload="metadata"
                                        poster={selectedItem.previewUrl}
                                        style={{ maxWidth: '100%', maxHeight: '80vh' }}
                                    />
                                ) : (
                                    <>
                                        <img src={selectedCurrent.imageUrl} alt={selectedItem.title} />
                                        {selectedImages.length > 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="carousel-arrow carousel-arrow-prev lightbox-arrow"
                                                    aria-label="Previous photo"
                                                    onClick={(e) => goToSelected(e, selectedIndex - 1)}
                                                >
                                                    &#8249;
                                                </button>
                                                <button
                                                    type="button"
                                                    className="carousel-arrow carousel-arrow-next lightbox-arrow"
                                                    aria-label="Next photo"
                                                    onClick={(e) => goToSelected(e, selectedIndex + 1)}
                                                >
                                                    &#8250;
                                                </button>
                                                <div className="carousel-dots lightbox-dots" onClick={(e) => e.stopPropagation()}>
                                                    {selectedImages.map((_, dotIndex) => (
                                                        <button
                                                            type="button"
                                                            key={dotIndex}
                                                            className={`carousel-dot ${dotIndex === selectedIndex ? 'active' : ''}`}
                                                            aria-label={`Show photo ${dotIndex + 1} of ${selectedImages.length}`}
                                                            onClick={(e) => goToSelected(e, dotIndex)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BaseGrid;
