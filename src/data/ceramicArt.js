// Ceramic art data with actual images
import img1 from '../images/ceramics/0F514756-BE46-4601-9455-ADE990CF952E.jpg';
import img2 from '../images/ceramics/5B04FE91-2549-4A3D-80CF-74DD49A9091F.jpg';
import img3 from '../images/ceramics/8BDD0694-C180-44D8-8B7D-A9CD2DAFF0D2.jpg';
import img4 from '../images/ceramics/D4E9410C-B0E3-4992-9138-4F3E858F7564.jpg';
import img5 from '../images/ceramics/IMG_3033.jpg';
import img6 from '../images/ceramics/IMG_3435.jpg';
import img7 from '../images/ceramics/IMG_3436.jpg';
import img8 from '../images/ceramics/IMG_3437.jpg';
import img9 from '../images/ceramics/IMG_3440.jpg';
import img10 from '../images/ceramics/IMG_3669.jpg';
import { ceramicPreviews } from './previews';

const ceramicArt = [
    {
        id: 1,
        title: "Ceramic Piece 10",
        imageUrl: img10,
        description: "Artisan ceramic creation with distinctive character.",
        medium: "Ceramic, glaze",
        year: "2024"
    },
    {
        id: 2,
        title: "Ceramic Piece 9",
        imageUrl: img9,
        description: "Unique ceramic artwork showcasing craftsmanship.",
        medium: "Ceramic, glaze",
        year: "2024"
    },
    {
        id: 3,
        title: "Ceramic Piece 8",
        imageUrl: img8,
        description: "Handmade ceramic piece with artistic expression.",
        medium: "Ceramic, glaze",
        year: "2024"
    },
    {
        id: 4,
        title: "Ceramic Piece 7",
        imageUrl: img7,
        description: "Contemporary ceramic sculpture.",
        medium: "Ceramic, glaze",
        year: "2024"
    },
    {
        id: 5,
        title: "Ceramic Piece 6",
        imageUrl: img6,
        description: "Elegant ceramic form with refined detail.",
        medium: "Ceramic, glaze",
        year: "2024"
    },
    {
        id: 6,
        title: "Ceramic Piece 5",
        imageUrl: img5,
        description: "Stunning ceramic artwork with unique texture.",
        medium: "Ceramic, glaze",
        year: "2024"
    },
    {
        id: 7,
        title: "Ceramic Piece 4",
        imageUrl: img4,
        description: "Expertly crafted ceramic sculpture, shown from two angles.",
        medium: "Ceramic, glaze",
        year: "2024",
        images: [
            { imageUrl: img4, previewUrl: ceramicPreviews.img4 },
            { imageUrl: img2, previewUrl: ceramicPreviews.img2 }
        ]
    },
    {
        id: 8,
        title: "Ceramic Piece 3",
        imageUrl: img3,
        description: "Artisan ceramic work featuring organic forms.",
        medium: "Ceramic, glaze",
        year: "2024"
    },
    {
        id: 10,
        title: "Ceramic Piece 1",
        imageUrl: img1,
        description: "Beautiful ceramic artwork showcasing unique glazing techniques.",
        medium: "Ceramic, glaze",
        year: "2024"
    }
];

const ceramicPreviewById = {
    1: ceramicPreviews.img10,
    2: ceramicPreviews.img9,
    3: ceramicPreviews.img8,
    4: ceramicPreviews.img7,
    5: ceramicPreviews.img6,
    6: ceramicPreviews.img5,
    7: ceramicPreviews.img4,
    8: ceramicPreviews.img3,
    10: ceramicPreviews.img1
};

export default ceramicArt.map((item) => ({
    ...item,
    previewUrl: ceramicPreviewById[item.id] || item.previewUrl
}));

/* 
TO ADD YOUR OWN IMAGES:
1. Place your ceramic art photos in: src/images/ceramics/
2. Import them at the top of this file, for example:
   import ceramic1 from '../images/ceramics/my-pot-1.jpg';
   import ceramic2 from '../images/ceramics/my-pot-2.jpg';
3. Replace the imageUrl placeholder URLs with your imports:
   imageUrl: ceramic1,
4. Update title, description, medium, dimensions, and year
*/
