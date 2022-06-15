import {
  WAYPOINTS,
  CITIES,
  TRAVEL_DATE,
  TRAVEL_TIME,
  ADDITIONAL_OPTIONS,
  PRICE,
} from '../constData.js';

const getRandomItem = (list) => list[Math.floor(Math.random() * list.length)];


export const generateMock = () => ({
  travel: {
    date: getRandomItem(TRAVEL_DATE),
    time: getRandomItem(TRAVEL_TIME),
    waypoint: getRandomItem(WAYPOINTS),
    city: getRandomItem(CITIES),
  },
  price: getRandomItem(PRICE),
  additionalOptions: ADDITIONAL_OPTIONS.sort(() => 0.5 - Math.random()).slice(
    0,
    Math.floor(Math.random() * 5)
  ),
});
