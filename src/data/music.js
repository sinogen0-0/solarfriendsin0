// Music data with actual album art
import badboy from '../images/music/badboy.PNG';
import goodboy from '../images/music/good_boy.PNG';
import finalVoyage from '../images/music/TheFinalVoyageOfTheLastKing.PNG';
import lastHuman from '../images/music/TheLastHumanWillBeAKingInSpace.PNG';
import { musicPreviews } from './previews';

const music = [
    {
        id: 1,
        title: "Good Boy",
        imageUrl: goodboy,
        description: "A journey through ambient and electronic territories.",
        year: "2024",
        bandcampUrl: "https://sinogen.bandcamp.com/"
    },
    {
        id: 2,
        title: "Bad Boy",
        imageUrl: badboy,
        description: "Explore sonic landscapes and experimental soundscapes.",
        year: "2024",
        bandcampUrl: "https://sinogen.bandcamp.com/"
    },
    {
        id: 3,
        title: "The Last Human Will Be A King In Space",
        imageUrl: lastHuman,
        description: "Futuristic soundscapes and otherworldly compositions.",
        year: "2024",
        bandcampUrl: "https://sinogen.bandcamp.com/"
    },
    {
        id: 4,
        title: "The Final Voyage Of The Last King",
        imageUrl: finalVoyage,
        description: "An epic musical narrative exploring cosmic themes.",
        year: "2024",
        bandcampUrl: "https://sinogen.bandcamp.com/"
    }
];

const musicPreviewById = {
    1: musicPreviews.goodboy,
    2: musicPreviews.badboy,
    3: musicPreviews.lastHuman,
    4: musicPreviews.finalVoyage
};

export default music.map((item) => ({
    ...item,
    previewUrl: musicPreviewById[item.id] || item.previewUrl
}));

/* 
TO ADD YOUR OWN ALBUM ART:
1. Place your album art in: src/images/music/
2. Import them at the top of this file, for example:
   import album1 from '../images/music/album-cover-1.jpg';
   import album2 from '../images/music/album-cover-2.jpg';
3. Replace the imageUrl placeholder URLs with your imports:
   imageUrl: album1,
4. Update title, description, year, and bandcampUrl to point to specific albums
*/
