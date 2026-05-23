// Digital & Physical art data with actual images and videos
// Images
import albumCover from '../images/digital_art/album cover.png';
import alternate from '../images/digital_art/alternate.png';
import caged from '../images/digital_art/CAGED.jpg';
import digitalForm from '../images/digital_art/digitalForm.png';
import face from '../images/digital_art/face.png';
import finalish from '../images/digital_art/finalish.png';
import flame from '../images/digital_art/flame.jpg';
import header from '../images/digital_art/header.png';
import manWings from '../images/digital_art/man_wings.png';
import moonBoom from '../images/digital_art/moon_boom.png';
import mwxPoster from '../images/digital_art/mwx_poster_final.png';
import poster from '../images/digital_art/poster.png';
import quickie from '../images/digital_art/quickie.png';
import room2 from '../images/digital_art/room2.png';
import scallopsFront from '../images/digital_art/scallops_front.png';
import theEmpress from '../images/digital_art/the_empress.png';
import theHighPriestess from '../images/digital_art/the_high_priestess_notcard.png';
import ticket3 from '../images/digital_art/ticket_3.png';
import trump from '../images/digital_art/tRuMp.png';
import untitled from '../images/digital_art/untitled.jpg';
import photoAug1 from '../images/digital_art/Photo Aug 12, 5 00 05 PM.jpg';
import photoAug2 from '../images/digital_art/Photo Aug 12, 5 00 23 PM.jpg';

// Videos
import buddha from '../images/digital_art/buddha.mp4';
import eleganz from '../images/digital_art/ELEGANZ.mp4';
import finish1 from '../images/digital_art/finish1.mp4';
import fluidLegs from '../images/digital_art/fluid_legs.mp4';
import fwazoom from '../images/digital_art/fwazoom.mp4';
import goopeyDropey from '../images/digital_art/goopey_droopey.mp4';
import insight from '../images/digital_art/INSIGHT.mp4';
import manWingsVideo from '../images/digital_art/man_wings_video.mp4';
import obelisk from '../images/digital_art/obelisk.mkv';
import particularMatters from '../images/digital_art/PARTICULAR_MATTERS.mp4';
import philosopher from '../images/digital_art/phil0s0pher.mp4';
import ripuh from '../images/digital_art/ripuh.mp4';
import shapeForm from '../images/digital_art/shape_form.mp4';
import shinyBloob from '../images/digital_art/ShinyBloob.avi';
import spaceman from '../images/digital_art/spaceman.mp4';
import spinFin from '../images/digital_art/spin_fin.mp4';
import colorShapeFluid from '../images/digital_art/_color_shape_fluid.avi';

// Physical Art
import physicalArt1 from '../images/physical_art/000.jpg';
import { digitalArtPreviews, physicalArtPreviews } from './previews';

const digitalPhysicalArt = [
    // Sorted by creation date - newest first
    {
        id: 1,
        title: "The High Priestess",
        imageUrl: theHighPriestess,
        description: "Mystical tarot-inspired art.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 2,
        title: "The Empress",
        imageUrl: theEmpress,
        description: "Tarot-inspired digital artwork.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 3,
        title: "Obelisk",
        videoUrl: obelisk,
        imageUrl: obelisk,
        description: "Monumental 3D animation.",
        medium: "3D Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 4,
        title: "MWX Poster Final",
        imageUrl: mwxPoster,
        description: "Final poster design for MWX project.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 5,
        title: "Header",
        imageUrl: header,
        description: "Designed for web presence.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 6,
        title: "Album Cover",
        imageUrl: albumCover,
        description: "Custom album artwork blending digital elements.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 7,
        title: "Shiny Bloob",
        videoUrl: shinyBloob,
        imageUrl: shinyBloob,
        description: "Reflective blob animation.",
        medium: "3D Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 8,
        title: "Quickie",
        imageUrl: quickie,
        description: "Fast digital sketch.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 9,
        title: "PARTICULAR MATTERS",
        videoUrl: particularMatters,
        imageUrl: particularMatters,
        description: "Particle system artwork.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 10,
        title: "Fwazoom",
        videoUrl: fwazoom,
        imageUrl: fwazoom,
        description: "Dynamic motion piece.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 11,
        title: "CAGED",
        imageUrl: caged,
        description: "Digital artwork exploring confinement and freedom.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 12,
        title: "Moon Boom",
        imageUrl: moonBoom,
        description: "Cosmic digital artwork.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 13,
        title: "INSIGHT",
        videoUrl: insight,
        imageUrl: insight,
        description: "Introspective animated work.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 14,
        title: "Finish 1",
        videoUrl: finish1,
        imageUrl: finish1,
        description: "Animated completion sequence.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 15,
        title: "Flame",
        imageUrl: flame,
        description: "Digital representation of elemental fire.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 16,
        title: "ELEGANZ",
        videoUrl: eleganz,
        imageUrl: eleganz,
        description: "Elegant motion graphics.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 17,
        title: "Photo Study 2",
        imageUrl: photoAug2,
        description: "Digital photograph.",
        medium: "Photography",
        year: "2024"
    },
    {
        id: 18,
        title: "Photo Study 1",
        imageUrl: photoAug1,
        description: "Digital photograph.",
        medium: "Photography",
        year: "2024"
    },
    {
        id: 19,
        title: "Scallops Front",
        imageUrl: scallopsFront,
        description: "Organic digital patterns.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 20,
        title: "Face",
        imageUrl: face,
        description: "Digital portrait exploration.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 21,
        title: "tRuMp",
        imageUrl: trump,
        description: "Political commentary through digital art.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 22,
        title: "Room 2",
        imageUrl: room2,
        description: "Digital environment design.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 23,
        title: "Finalish",
        imageUrl: finalish,
        description: "Nearly complete digital composition.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 24,
        title: "Alternate",
        imageUrl: alternate,
        description: "Experimental digital composition.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 25,
        title: "Digital Form",
        imageUrl: digitalForm,
        description: "Abstract digital forms and shapes.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 26,
        title: "Ticket 3",
        imageUrl: ticket3,
        description: "Digital ticket design.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 27,
        title: "Goopey Droopey",
        videoUrl: goopeyDropey,
        imageUrl: goopeyDropey,
        description: "Playful fluid animation.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 28,
        title: "Fluid Legs",
        videoUrl: fluidLegs,
        imageUrl: fluidLegs,
        description: "Fluid simulation animation.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 29,
        title: "Buddha",
        videoUrl: buddha,
        imageUrl: buddha,
        description: "Animated meditation on spiritual forms.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 30,
        title: "Color Shape Fluid",
        videoUrl: colorShapeFluid,
        imageUrl: colorShapeFluid,
        description: "Colorful fluid dynamics.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 31,
        title: "Untitled",
        imageUrl: untitled,
        description: "Experimental digital piece.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 32,
        title: "Spin Fin",
        videoUrl: spinFin,
        imageUrl: spinFin,
        description: "Spinning finale animation.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 33,
        title: "Spaceman",
        videoUrl: spaceman,
        imageUrl: spaceman,
        description: "Cosmic journey animation.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 34,
        title: "Shape Form",
        videoUrl: shapeForm,
        imageUrl: shapeForm,
        description: "Geometric shape transformations.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 35,
        title: "Ripuh",
        videoUrl: ripuh,
        imageUrl: ripuh,
        description: "Ripple effect animation.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 36,
        title: "Poster",
        imageUrl: poster,
        description: "Digital poster art.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 37,
        title: "Phil0s0pher",
        videoUrl: philosopher,
        imageUrl: philosopher,
        description: "Philosophical animation piece.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 38,
        title: "Man Wings Animation",
        videoUrl: manWingsVideo,
        imageUrl: manWingsVideo,
        description: "Animated version of Man Wings.",
        medium: "Digital Animation",
        year: "2024",
        isVideo: true
    },
    {
        id: 39,
        title: "Man Wings",
        imageUrl: manWings,
        description: "Surreal digital portrait with wings.",
        medium: "Digital",
        year: "2024"
    },
    {
        id: 40,
        title: "Physical Art Piece",
        imageUrl: physicalArt1,
        description: "Traditional physical artwork.",
        medium: "Mixed Media",
        year: "2024"
    }
];

const digitalPhysicalPreviewById = {
    1: digitalArtPreviews.theHighPriestess,
    2: digitalArtPreviews.theEmpress,
    4: digitalArtPreviews.mwxPoster,
    5: digitalArtPreviews.header,
    6: digitalArtPreviews.albumCover,
    8: digitalArtPreviews.quickie,
    11: digitalArtPreviews.caged,
    12: digitalArtPreviews.moonBoom,
    15: digitalArtPreviews.flame,
    17: digitalArtPreviews.photoAug2,
    18: digitalArtPreviews.photoAug1,
    19: digitalArtPreviews.scallopsFront,
    20: digitalArtPreviews.face,
    21: digitalArtPreviews.trump,
    22: digitalArtPreviews.room2,
    23: digitalArtPreviews.finalish,
    24: digitalArtPreviews.alternate,
    25: digitalArtPreviews.digitalForm,
    26: digitalArtPreviews.ticket3,
    31: digitalArtPreviews.untitled,
    36: digitalArtPreviews.poster,
    39: digitalArtPreviews.manWings,
    40: physicalArtPreviews.physicalArt1
};

export default digitalPhysicalArt.map((item) => ({
    ...item,
    previewUrl: digitalPhysicalPreviewById[item.id] || item.previewUrl
}));
