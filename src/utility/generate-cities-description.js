import { CITIES, RANDOM_TEXT } from './constData.js';

export const generateCitiesDesctiprion = () => {
  const getRandomPhotos = (length) =>
    Array.from(Array(length)).map(() =>
      [
        'http://picsum.photos/248/152?r=',
        String(Math.floor(Math.random() * 200)),
      ].join('')
    );

  return CITIES.reduce(
    (a, v) => ({
      ...a,
      [v]: {
        description: RANDOM_TEXT.sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 4) + 1)
          .join(' '),
        photos: getRandomPhotos(Math.floor(Math.random() * 4 + 1)),
      },
    }),
    {}
  );
};
