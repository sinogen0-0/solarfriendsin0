# Physical Art Images

Place your physical art photos (paintings, sewing, mixed media) in this directory.

## Recommended Format

- **File Type**: JPG or PNG
- **Resolution**: At least 1200x1200px for quality display
- **File Size**: Optimize images to 200-500KB for web performance
- **Naming**: Use descriptive names (e.g., `oil-painting-landscape.jpg`, `textile-quilt.jpg`)

## How to Add Your Images

1. Copy your physical art photos into this directory
2. Open `src/data/digitalPhysicalArt.js`
3. Import your images at the top of the file:
   ```javascript
   import landscape from '../images/physical_art/oil-painting-landscape.jpg';
   import quilt from '../images/physical_art/textile-quilt.jpg';
   ```
4. Update the data array with your imports:
   ```javascript
   {
       id: 2,
       title: "Mountain Landscape",
       imageUrl: landscape,
       description: "Oil painting of mountain vista",
       medium: "Oil on canvas",
       dimensions: "24\" x 36\"",
       year: "2024"
   }
   ```

The images will automatically appear in the Digital & Physical Art gallery!
