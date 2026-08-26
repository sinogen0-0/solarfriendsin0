import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import CeramicArtGrid from './components/CeramicArtGrid';
import DigitalPhysicalArtGrid from './components/DigitalPhysicalArtGrid';
import Music from './components/Music';
import RageEngineShowcase from './components/RageEngineShowcase';
import './styles/Portfolio.css';

const projects = [
  {
    title: 'R.A.G.E. Engine',
    label: 'Graphics / Tools / AI workflows',
    description: 'A custom C and raylib engine with generated asset catalogs, hot reload, cross-platform build tooling, and a documented agentic content pipeline.',
    href: '/rage-engine',
    tone: 'magenta'
  },
  {
    title: 'WWE 2K',
    label: 'AAA UI systems / C++',
    description: 'Five consecutive annual console releases, including cross-platform character customization, Common UI systems, defect triage, and designer-facing tooling.',
    href: '#experience',
    tone: 'magenta'
  },
  {
    title: 'Dungeon Deck Recorder',
    label: 'Product engineering / Svelte',
    description: 'An offline-first tabletop session tool that brings recording, transcription, entity extraction, and searchable dossiers into one focused workflow.',
    href: '/dungeon-deck-recorder',
    tone: 'magenta'
  }
];

function Shell({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [darkMode, setDarkMode] = React.useState(() => localStorage.getItem('solar-friend-theme') === 'dark');

  React.useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('solar-friend-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <Link className="wordmark" to="/">SOLAR FRIEND <span>SIN0</span></Link>
        <nav aria-label="Primary navigation">
          <Link className={isHome ? 'active' : ''} to="/">Work</Link>
          <Link to="/ceramic-art">Ceramics</Link>
          <Link to="/digital-physical-art">Image + Motion</Link>
          <Link to="/music">Sound</Link>
          <Link to="/about">About</Link>
        </nav>
        <div className="header-tools"><button className="theme-toggle" type="button" onClick={() => setDarkMode((current) => !current)} aria-pressed={darkMode}>{darkMode ? 'Light mode' : 'Dark mode'}</button><a className="header-contact" href="mailto:jwpierce14@gmail.com">Contact</a></div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <span>JACOB PIERCE / SOLAR FRIEND SIN0</span>
        <span>ENGINEERING, ART, AND SYSTEMS THINKING</span>
      </footer>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow">ENGINEER + MAKER / MINNEAPOLIS</p>
          <h1>Systems with a pulse.</h1>
          <p className="hero-lede">I build dependable software, expressive tools, and physical objects. My work lives where engineering precision meets handmade irregularity.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#selected-work">View selected work</a>
            <a className="button button-quiet" href="mailto:jwpierce14@gmail.com">Start a conversation</a>
          </div>
        </div>
        <div className="hero-art preview-square" aria-label="Abstract magenta portfolio preview" role="img">
          <span className="hero-stamp">FIELD NOTE 01<br />OBJECT / IMAGE / TOOL</span>
        </div>
      </section>

      <section className="signal-band" aria-label="Professional highlights">
        <div><strong>8+</strong><span>years in game development</span></div>
        <div><strong>5</strong><span>annual AAA releases shipped</span></div>
        <div><strong>300K+</strong><span>daily users supported in live service</span></div>
        <div><strong>R.A.G.E.</strong><span>custom C / raylib engine</span></div>
      </section>

      <section className="section-wrap" id="selected-work">
        <div className="section-heading"><p className="eyebrow">SELECTED WORK</p><h2>Built for the real world.</h2><p>Production systems, creative experiments, and the connective tissue between them.</p></div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1}`} key={project.title}>
              <Link to={project.href} className={`project-image preview-square ${project.tone}`} aria-label={`Open ${project.title}`} />
              <div className="project-body"><p className="eyebrow">{project.label}</p><h3>{project.title}</h3><p>{project.description}</p><Link className="text-link" to={project.href}>Read the case study <span aria-hidden="true">↗</span></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-band" id="experience">
        <div className="section-wrap experience-grid"><div><p className="eyebrow">THE THROUGH-LINE</p><h2>Make the complicated usable.</h2></div><div><p>I have worked across player-facing UI, live-service systems, networked features, build pipelines, and creative tooling. The job changes; the instinct stays the same: clarify the system, make iteration cheap, and ship something people can feel.</p><Link className="text-link" to="/about">More about my practice <span aria-hidden="true">↗</span></Link></div></div>
      </section>

      <section className="section-wrap practice-section"><div className="section-heading"><p className="eyebrow">PRACTICE MAP</p><h2>Four materials, one studio.</h2></div><div className="practice-grid"><Link to="/ceramic-art"><strong>01</strong><span>Ceramics</span><small>Form, surface, object</small></Link><Link to="/digital-physical-art"><strong>02</strong><span>Image</span><small>Symbol, color, motion</small></Link><Link to="/rage-engine"><strong>03</strong><span>Code</span><small>Tools, engines, pipelines</small></Link><Link to="/music"><strong>04</strong><span>Sound</span><small>Atmosphere, rhythm, story</small></Link></div></section>
    </>
  );
}

function About() {
  return <section className="section-wrap about-page"><p className="eyebrow">ABOUT / CONTACT</p><h1>Jacob Pierce</h1><p className="about-intro">Senior software engineer, ceramic artist, and creative technologist. I make systems that hold up under pressure and objects that reward a closer look.</p><div className="about-columns"><div><h2>What I bring</h2><ul><li>Gameplay, UI, and systems engineering</li><li>Cross-platform content and asset pipelines</li><li>Live-service operations and production reliability</li><li>Developer experience and agentic workflow design</li><li>Ceramic form, surface, and visual composition</li></ul></div><div><h2>Find me</h2><p><a className="text-link" href="mailto:jwpierce14@gmail.com">jwpierce14@gmail.com</a></p><p><a className="text-link" href="https://github.com/sinogen0-0" target="_blank" rel="noreferrer">GitHub ↗</a></p><p><a className="text-link" href="https://sinogen.bandcamp.com/" target="_blank" rel="noreferrer">Bandcamp ↗</a></p></div></div></section>;
}

export default function PortfolioApp() {
  return <Shell><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/ceramic-art" element={<CeramicArtGrid onBack={() => {}} />} /><Route path="/digital-physical-art" element={<DigitalPhysicalArtGrid onBack={() => {}} />} /><Route path="/music" element={<Music onBack={() => {}} />} /><Route path="/dungeon-deck-recorder" element={<RageEngineShowcase mode="recorder" />} /><Route path="/rage-engine" element={<RageEngineShowcase />} /></Routes></Shell>;
}