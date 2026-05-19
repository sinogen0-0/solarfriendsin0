# Ceramic Art Images

Place your ceramic art photos in this directory.

## Recommended Format

- **File Type**: JPG or PNG
- **Resolution**: At least 1200x1200px for quality display
- **File Size**: Optimize images to 200-500KB for web performance
- **Naming**: Use descriptive names (e.g., `blue-vase-cone10.jpg`, `teapot-soda-fired.jpg`)

## How to Add Your Images

1. Copy your ceramic art photos into this directory
2. Open `src/data/ceramicArt.js`
3. Import your images at the top of the file:
   ```javascript
   import bluevase from '../images/ceramics/blue-vase-cone10.jpg';
   import teapot from '../images/ceramics/teapot-soda-fired.jpg';
   ```
4. Update the data array with your imports:
   ```javascript
   {
       id: 1,
       title: "Blue Vase",
       imageUrl: bluevase,
       description: "Wheel-thrown vase with blue glaze",
       medium: "Stoneware, cone 10 reduction",
       dimensions: "12\" x 6\"",
       year: "2024"
   }
   ```

The images will automatically appear in the Ceramic Art gallery!
