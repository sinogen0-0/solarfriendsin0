import pot01 from '../images/store/DSC_0001.JPG';
import pot04 from '../images/store/DSC_0004.JPG';
import pot06 from '../images/store/DSC_0006.JPG';
import pot07 from '../images/store/DSC_0007.JPG';
import pot08 from '../images/store/DSC_0008.JPG';
import pot09 from '../images/store/DSC_0009.JPG';
import pot10 from '../images/store/DSC_0010.JPG';
import pot11 from '../images/store/DSC_0011.JPG';
import pot12 from '../images/store/DSC_0012.JPG';
import pot14 from '../images/store/DSC_0014.JPG';
import pot15 from '../images/store/DSC_0015.JPG';
import pot16 from '../images/store/DSC_0016.JPG';
import pot17 from '../images/store/DSC_0017.JPG';
import pot18 from '../images/store/DSC_0018.JPG';
import pot19 from '../images/store/DSC_0019.JPG';
import pot20 from '../images/store/DSC_0020.JPG';
import pot21 from '../images/store/DSC_0021.JPG';
import pot22 from '../images/store/DSC_0022.JPG';
import pot23 from '../images/store/DSC_0023.JPG';
import pot24 from '../images/store/DSC_0024.JPG';
import pot25 from '../images/store/DSC_0025.JPG';
import pot26 from '../images/store/DSC_0026.JPG';
import pot27 from '../images/store/DSC_0027.JPG';
import pot28 from '../images/store/DSC_0028.JPG';

import { storePreviews } from './previews';

const withPreview = (imageUrl, previewUrl) => ({
  imageUrl,
  previewUrl: previewUrl || imageUrl
});

const products = [
  {
    id: 'plate-green_white',
    name: 'Green & White Plate',
    title: 'Green & White Plate',
    price: 115,
    image: pot01,
    images: [withPreview(pot01, storePreviews.pot01), withPreview(pot04, storePreviews.pot04)],
    description: 'Smooth flat and glossy finish, with a cream sig on the inside and forest green on the outside. Clear coat glaze pools in the plates inner ring forming a faint green shadow.'
  },
  {
    id: 'platter-pink',
    name: 'Pink Pattern Platter',
    title: 'Pink Pattern Platter',
    price: 165,
    image: pot06,
    images: [withPreview(pot06, storePreviews.pot06)],
    description: 'A smooth and glossy decorative platter. Patterned with a sin0 graphic print, and pink crystalline glaze.'
  },
  {
    id: 'blue-cancer-bowl',
    name: 'Cancer Spell Bowl',
    title: 'Cancer Spell Bowl',
    price: 185,
    image: pot07,
    images: [withPreview(pot07, storePreviews.pot07), withPreview(pot08, storePreviews.pot08)],
    description: 'Hand-built bowl with three feet. Light blue sig application, with carving spell reliefs in dark blue.'
  },
  {
    id: 'dark-blue-spell-bowl',
    name: 'Dark Blue Carved Bowl',
    title: 'Dark Blue Carved Bowl',
    price: 115,
    image: pot09,
    images: [withPreview(pot09, storePreviews.pot09)],
    description: 'Raw white clay exterior, with smooth glassy glaze over dark blue sig and carved graphic prints.'
  },
  {
    id: 'sea-monster-bowl',
    name: 'Sea Monster Bowl',
    title: 'Sea Monster Bowl',
    price: 155,
    image: pot11,
    images: [withPreview(pot11, storePreviews.pot11), withPreview(pot12, storePreviews.pot12), withPreview(pot14, storePreviews.pot14)],
    description: 'Hand built bowl with sea monster face and tail, light blue sig exterior and four small feet, and dark blue sig inside with white sig flower.'
  },
  {
    id: 'deer-rabbit-cup',
    name: 'Scythin Deer, Tri-skellion Rabbit Cup',
    title: 'Scythin Deer, Tri-skellion Rabbit Cup',
    price: 300,
    image: pot16,
    images: [withPreview(pot16, storePreviews.pot16), withPreview(pot17, storePreviews.pot17)],
    description: 'A sleek cup, with underglaze scything deer motif and tri-skellion rabbit on either side of the cup.'
  },
  {
    id: 'animal-bard-cup',
    name: 'Bard Band Cup',
    title: 'Bard Band Cup',
    price: 95,
    image: pot18,
    images: [withPreview(pot18, storePreviews.pot18), withPreview(pot19, storePreviews.pot19)],
    description: 'Animal motifs playing instruments, blobbed crystalline flake glaze cup.'
  },
  {
    id: 'squirrel-cup',
    name: 'Squirrel Cup',
    title: 'Squirrel Cup',
    price: 45,
    image: pot20,
    images: [withPreview(pot20, storePreviews.pot20)],
    description: 'A small cup with a motif saying, "The way we live is wrong. RIP squirrel."'
  },
  {
    id: 'river-cup',
    name: 'River Cup',
    title: 'River Cup',
    price: 85,
    image: pot21,
    images: [withPreview(pot21, storePreviews.pot21), withPreview(pot22, storePreviews.pot22)],
    description: 'Hand molded and carved cup that has a water holding spell and plant/sun/moon motif'
  },
  {
    id: 'serpent-cup',
    name: 'Serpent Cup',
    title: 'Serpent Cup',
    price: 45,
    image: pot23,
    images: [withPreview(pot23, storePreviews.pot23), withPreview(pot24, storePreviews.pot24)],
    description: 'A medievel tree of eden motif, and a serpent. 6oz water cup.'
  },
  {
    id: 'grass-cup',
    name: 'Grass Cup',
    title: 'Grass Cup',
    price: 45,
    image: pot25,
    images: [withPreview(pot25, storePreviews.pot25)],
    description: 'A hand thrown and carved cup with green sig sin0 motif.'
  },
  {
    id: 'shard-sand-cup',
    name: 'Sharp Sand Cup',
    title: 'Sharp Sand Cup',
    price: 45,
    image: pot26,
    images: [withPreview(pot26, storePreviews.pot26)],
    description: 'geometric parabolic shaped cup with sand colored glaze'
  },
  {
    id: 'friend-cup',
    name: 'Friend Cup',
    title: 'Friend Cup',
    price: 75,
    image: pot27,
    images: [withPreview(pot27, storePreviews.pot27), withPreview(pot28, storePreviews.pot28)],
    description: 'a little friendly face, and some circular motifs.'
  }
];

export const storeCatalog = products;
export default products;
