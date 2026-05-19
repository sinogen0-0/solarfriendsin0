import React, { useState } from 'react';
import './styles/App.css';
import CeramicArtGrid from './components/CeramicArtGrid';
import DigitalPhysicalArtGrid from './components/DigitalPhysicalArtGrid';
import Music from './components/Music';
import DungeonDeckRecorder from './components/DungeonDeckRecorder';
import portraitImage from './images/about/sin0_platter.JPG';

function App() {
  const [showArtistInfo, setShowArtistInfo] = useState(false);
  const [currentView, setCurrentView] = useState('card-stack');
  const [isArtistInfoClosing, setIsArtistInfoClosing] = useState(false);
  const [isViewTransitioning, setIsViewTransitioning] = useState(false);

  const handleArtistInfoClose = () => {
    setIsArtistInfoClosing(true);
    setTimeout(() => {
      setShowArtistInfo(false);
      setIsArtistInfoClosing(false);
    }, 300);
  };

  const handleViewChange = (newView) => {
    setIsViewTransitioning(true);
    setTimeout(() => {
      setCurrentView(newView);
      setIsViewTransitioning(false);
    }, 300);
  };

  const handleBackToCards = () => {
    setIsViewTransitioning(true);
    setTimeout(() => {
      setCurrentView('card-stack');
      setIsViewTransitioning(false);
    }, 300);
  };

  return (
    <div className="App">
      <h1 className="main-title">SOLAR FRIEND SIN0</h1>
      <div className="artist-button-container">
        <button 
          className="artist-info-button" 
          onClick={() => !isArtistInfoClosing && setShowArtistInfo(true)}
        >
          About
        </button>
      </div>
      
      {(showArtistInfo || isArtistInfoClosing) && (
        <div 
          className={`artist-info-overlay ${isArtistInfoClosing ? 'fade-out' : ''}`} 
          onClick={handleArtistInfoClose}
        >
          <div className="artist-info-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleArtistInfoClose}>×</button>
            <h2>About Solar Friend Sin0</h2>
            <div className="about-layout">
              <div className="about-portrait">
                <img 
                  src={portraitImage} 
                  alt="Solar Friend Sin0 Portrait"
                />
              </div>
              <div className="about-details">
                <div className="contact-info">
                  <h3>Enchantments & Other Magical Wares</h3>
                    <p className="about-description">Jacob Pierce — Engineer, Artist, Designer who solo-devs the Solar Friend Sin0 project.</p>
                    <p className="about-description">Currently looking for work in any field related to the displayed areas of interest.</p>
                    <p className="about-description">Priority order:</p>
                    <ol className="about-list">
                      <li>Ceramics — specifically the material &amp; financial business side of it</li>
                      <li>Game development, or adjacent field, working on design with engineering focus &amp; specialty (able to monitor agentic iteration workflows)</li>
                      <li>Electronics/Device development — specifically things that could be considered part of the solar punk cultural canon</li>
                    </ol>
                  <div className="contact-links">
                    <p><strong>Email:</strong> jwpierce14@gmail.com</p>
                    <p><strong>Phone:</strong> 262-949-3748</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`view-container ${isViewTransitioning ? 'fade-out' : ''}`}>
        {currentView === 'card-stack' && <CardStack onViewChange={handleViewChange} />}
        {currentView === 'ceramic-art' && <CeramicArtGrid onBack={handleBackToCards} />}
        {currentView === 'digital-physical-art' && <DigitalPhysicalArtGrid onBack={handleBackToCards} />}
        {currentView === 'music' && <Music onBack={handleBackToCards} />}
        {currentView === 'dungeon-deck-recorder' && <DungeonDeckRecorder onBack={handleBackToCards} />}
      </div>

      <footer>
      </footer>
    </div>
  );
}

function CardStack({ onViewChange }) {
  const [expanded, setExpanded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    if(expanded) return;
    
    setIsTransitioning(true);
    setExpanded(!expanded);

    setTimeout(() => {
      setIsTransitioning(false);      
    }, 300);
  };

  const handleCardClick = (e) => {
    if(!expanded) return;
    if(isTransitioning) return;
    e.stopPropagation();

    switch(e.target.className) {
      case 'card card-1':
        onViewChange('ceramic-art');
        break;
      case 'card card-2':
        onViewChange('digital-physical-art');
        break;
      case 'card card-3':
        onViewChange('music');
        break;
      case 'card card-4':
        onViewChange('dungeon-deck-recorder');
        break;
      default:
        break;
    }
  };

  return (
    <div className={`card-stack ${expanded ? 'expanded' : ''} ${isTransitioning ? 'transitioning' : ''}`} onClick={handleClick}>
      <div className="card card-1" onClick={handleCardClick}>{expanded ? 'Ceramic Art' : 'Enchantments'} </div>
      <div className="card card-2" onClick={handleCardClick}>{expanded ? 'Digital & Physical Art' : ''}</div>
      <div className="card card-3" onClick={handleCardClick}>{expanded ? 'Music' : ''}</div>
      <div className="card card-4" onClick={handleCardClick}>{expanded ? 'Dungeon Deck Recorder' : ''}</div>
    </div>
  );
}

export default App;
