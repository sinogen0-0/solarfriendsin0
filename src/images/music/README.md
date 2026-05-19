# Album Art / Music Images

Place your album covers and music-related artwork in this directory.

## Recommended Format

- **File Type**: JPG or PNG
- **Resolution**: At least 1200x1200px (square format preferred for album art)
- **File Size**: Optimize images to 200-500KB for web performance
- **Naming**: Use album/track names (e.g., `album-echoes-2024.jpg`, `single-dreams.png`)

## How to Add Your Images

1. Copy your album art into this directory
2. Open `src/data/music.js`
3. Import your images at the top of the file:
   ```javascript
   import echoesAlbum from '../images/music/album-echoes-2024.jpg';
   import dreamsSingle from '../images/music/single-dreams.png';
   ```
4. Update the data array with your imports and Bandcamp URLs:
   ```javascript
   {
       id: 1,
       title: "Echoes",
       imageUrl: echoesAlbum,
       description: "Ambient electronic album exploring themes of memory",
       year: "2024",
       bandcampUrl: "https://sinogen.bandcamp.com/album/echoes"
   }
   ```

The album art will appear in the Music gallery with links to your Bandcamp!
