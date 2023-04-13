import { colorsDummy, sizeDummy } from './filters';

import nc000001 from 'assets/images/NC000001.jpg';
import nc000002 from 'assets/images/NC000002.jpg';

const productDummy = {
  id: 1,
  slug: '',
  code: 'test',
  images: [{ id: 1, path: nc000001 }, { id: 2, path: nc000002 }],
  name: 'Basic Colored Sweatpants With Elastic Hems',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  promo: 12,
  price: 25.09,
  unit: '$',
  starCount: 5,
  reviewCount: 2,
  colors: colorsDummy,
  sizes: sizeDummy,
  sku: 'BE45VGRT',
  categories: ['PANTS', 'WOMEN'],
  tags: ['black', 'white'],
};

export const productTabsDummy = [
  'Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor. Morbi ut sapien vitae odio accumsan gravida.Morbi vitae erat auctor, eleifend nunc a, lobortis neque.Praesent aliquam dignissim viverra.Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor.Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum.Sed consequat luctus ligula.Curabitur laoreet rhoncus blandit.Aenean vel diam ut arcu pharetra dignissim ut sed leo.Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus.Duis semper erat mauris, sed egestas purus commodo vel.',
  'Additional information',
  'Reviews'
];

export default productDummy;
