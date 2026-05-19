# Digital Art Images

Place your digital art (renders, illustrations, videos screenshots) in this directory.

## Recommended Format

- **File Type**: JPG, PNG, or WebP
- **Resolution**: At least 1200x1200px for quality display
- **File Size**: Optimize images to 200-500KB for web performance
- **Naming**: Use descriptive names (e.g., `3d-render-space-scene.jpg`, `character-illustration.png`)

## How to Add Your Images

1. Copy your digital art into this directory
2. Open `src/data/digitalPhysicalArt.js`
3. Import your images at the top of the file:
   ```javascript
   import spaceRender from '../images/digital_art/3d-render-space-scene.jpg';
   import characterArt from '../images/digital_art/character-illustration.png';
   ```
4. Update the data array with your imports:
   ```javascript
   {
       id: 1,
       title: "Space Scene",
       imageUrl: spaceRender,
       description: "3D rendered sci-fi environment",
       medium: "Blender 3D, Photoshop",
       year: "2024"
   }
   ```

The images will automatically appear in the Digital & Physical Art gallery!
