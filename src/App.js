import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/App.css';
import CeramicArtGrid from './components/CeramicArtGrid';
import DigitalPhysicalArtGrid from './components/DigitalPhysicalArtGrid';
import Music from './components/Music';
import DungeonDeckRecorder from './components/DungeonDeckRecorder';
import portraitImage from './images/about/sin0_platter.JPG';

const viewToPathMap = {
  'card-stack': '/',
  'ceramic-art': '/ceramic-art',
  'digital-physical-art': '/digital-physical-art',
  music: '/music',
  'dungeon-deck-recorder': '/dungeon-deck-recorder'
};

const pathToViewMap = {
  '/': 'card-stack',
  '/ceramic-art': 'ceramic-art',
  '/digital-physical-art': 'digital-physical-art',
  '/music': 'music',
  '/dungeon-deck-recorder': 'dungeon-deck-recorder'
};

const decodeText = (codes) => String.fromCharCode(...codes);

const getProtectedContactInfo = () => ({
  email: decodeText([106, 119, 112, 105, 101, 114, 99, 101, 49, 52, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109]),
  phone: decodeText([50, 54, 50, 45, 57, 52, 57, 45, 51, 55, 52, 56])
});

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showArtistInfo, setShowArtistInfo] = useState(false);
  const [isArtistInfoClosing, setIsArtistInfoClosing] = useState(false);
  const [isViewTransitioning, setIsViewTransitioning] = useState(false);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [isContactUnlocked, setIsContactUnlocked] = useState(false);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const turnstileSiteKey = process.env.REACT_APP_TURNSTILE_SITE_KEY;
  const currentView = pathToViewMap[location.pathname] || 'card-stack';

  useEffect(() => {
    if (pathToViewMap[location.pathname]) {
      return;
    }

    navigate('/', { replace: true });
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (window.turnstile) {
      setTurnstileLoaded(true);
      return undefined;
    }

    const existingScript = document.getElementById('turnstile-script');
    if (existingScript) {
      const handleScriptLoad = () => setTurnstileLoaded(true);
      existingScript.addEventListener('load', handleScriptLoad);
      return () => existingScript.removeEventListener('load', handleScriptLoad);
    }

    const script = document.createElement('script');
    script.id = 'turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => setTurnstileLoaded(true);
    script.onerror = () => setCaptchaError('Could not load captcha challenge. Please try refreshing.');
    document.body.appendChild(script);

    return undefined;
  }, []);

  useEffect(() => {
    if (!showArtistInfo || isContactUnlocked || !turnstileLoaded || !turnstileSiteKey || !turnstileContainerRef.current) {
      return;
    }

    if (!window.turnstile || turnstileWidgetIdRef.current !== null) {
      return;
    }

    setCaptchaError('');
    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      callback: () => {
        setIsContactUnlocked(true);
        setCaptchaError('');
      },
      'error-callback': () => {
        setCaptchaError('Captcha validation failed. Please retry.');
      },
      'expired-callback': () => {
        setCaptchaError('Captcha expired. Please complete it again.');
      }
    });
  }, [isContactUnlocked, showArtistInfo, turnstileLoaded, turnstileSiteKey]);

  useEffect(() => {
    if (!showArtistInfo || !window.turnstile || turnstileWidgetIdRef.current === null || isContactUnlocked) {
      return;
    }

    window.turnstile.reset(turnstileWidgetIdRef.current);
  }, [showArtistInfo, isContactUnlocked]);

  const handleArtistInfoClose = () => {
    setIsArtistInfoClosing(true);
    setTimeout(() => {
      setShowArtistInfo(false);
      setIsArtistInfoClosing(false);
    }, 300);
  };

  const navigateWithTransition = (path) => {
    if (location.pathname === path) {
      return;
    }

    setIsViewTransitioning(true);
    setTimeout(() => {
      navigate(path);
      setIsViewTransitioning(false);
    }, 300);
  };

  const handleViewChange = (newView) => {
    const targetPath = viewToPathMap[newView];
    if (!targetPath) {
      return;
    }

    navigateWithTransition(targetPath);
  };

  const handleBackToCards = () => {
    navigateWithTransition('/');
  };

  const contactInfo = isContactUnlocked ? getProtectedContactInfo() : null;

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
                    {!isContactUnlocked && (
                      <div className="contact-lock">
                        <p>Contact details are protected. Complete the captcha to reveal.</p>
                        {turnstileSiteKey ? (
                          <div ref={turnstileContainerRef} className="turnstile-widget" />
                        ) : (
                          <p className="captcha-error">
                            Captcha is not configured yet. Set REACT_APP_TURNSTILE_SITE_KEY in your environment.
                          </p>
                        )}
                        {captchaError && <p className="captcha-error">{captchaError}</p>}
                      </div>
                    )}
                    {isContactUnlocked && contactInfo && (
                      <>
                        <p><strong>Email:</strong> {contactInfo.email}</p>
                        <p><strong>Phone:</strong> {contactInfo.phone}</p>
                      </>
                    )}
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
    if (expanded) {
      return;
    }

    setIsTransitioning(true);
    setExpanded(true);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleCardClick = (view, event) => {
    if (!expanded || isTransitioning) {
      return;
    }

    event.stopPropagation();
    onViewChange(view);
  };

  return (
    <div className={`card-stack ${expanded ? 'expanded' : ''} ${isTransitioning ? 'transitioning' : ''}`} onClick={handleClick}>
      <div className="card card-1" onClick={(event) => handleCardClick('ceramic-art', event)}>{expanded ? 'Ceramic Art' : 'Enchantments'}</div>
      <div className="card card-2" onClick={(event) => handleCardClick('digital-physical-art', event)}>{expanded ? 'Digital & Physical Art' : ''}</div>
      <div className="card card-3" onClick={(event) => handleCardClick('music', event)}>{expanded ? 'Music' : ''}</div>
      <div className="card card-4" onClick={(event) => handleCardClick('dungeon-deck-recorder', event)}>{expanded ? 'Dungeon Deck Recorder' : ''}</div>
    </div>
  );
}

export default App;
