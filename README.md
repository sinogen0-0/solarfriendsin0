# Solar Friend Sin0's Enchantments & Other Magical Wares

A React-based portfolio website showcasing ceramic art, digital & physical art, music, and the Dungeon Deck Recorder application.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

The site will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Adding Your Content

### Adding Images

The website currently uses placeholder images. To add your own:

#### Ceramic Art
1. Place your photos in `src/images/ceramics/`
2. Edit `src/data/ceramicArt.js`:
   - Import your images at the top
   - Replace the placeholder URLs with your imports
   - Update titles, descriptions, and metadata

#### Digital & Physical Art
1. Place digital art in `src/images/digital_art/`
2. Place physical art in `src/images/physical_art/`
3. Edit `src/data/digitalPhysicalArt.js`:
   - Import your images
   - Replace placeholder URLs
   - Update metadata

#### Music (Album Art)
1. Place album covers in `src/images/music/`
2. Edit `src/data/music.js`:
   - Import your album art
   - Replace placeholder URLs
   - Update Bandcamp URLs for each album/single

### Customization

- **Site Title**: Edit the main title in `src/App.js`
- **About Section**: Update the artist info in `src/App.js`
- **Colors**: Modify the dark mode palette in `src/styles/App.css`
- **Font**: Currently uses Cascadia Code. Update font-family in CSS files to change

## Project Structure

```
solarfriend-enchantments/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BaseGrid.js
│   │   ├── CeramicArtGrid.js
│   │   ├── DigitalPhysicalArtGrid.js
│   │   ├── Music.js
│   │   ├── DungeonDeckRecorder.js
│   │   └── PotteryGrid.css
│   ├── data/
│   │   ├── ceramicArt.js
│   │   ├── digitalPhysicalArt.js
│   │   └── music.js
│   ├── images/
│   │   ├── ceramics/
│   │   ├── digital_art/
│   │   ├── physical_art/
│   │   └── music/
│   ├── styles/
│   │   └── App.css
│   ├── App.js
│   └── index.js
└── package.json
```

## Features

- **4-Card Navigation**: Expandable card stack interface
- **Dark Mode**: Inverted color scheme with high contrast
- **Monospace Font**: Cascadia Code for a unique aesthetic
- **Image Galleries**: Lightbox view with descriptions
- **Bandcamp Integration**: Direct links to your music
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Lazy Loading**: Optimized image loading for performance

## Technologies

- React 18
- React Lazy Load
- Framer Motion
- Emotion (CSS-in-JS)
- Material-UI

## Author

Jacob Pierce (Solar Friend Sin0)
- Email: jwpierce14@gmail.com
- Bandcamp: https://sinogen.bandcamp.com/

## License

All content and code © Jacob Pierce
