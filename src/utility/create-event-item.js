import {
  WAYPOINTS,
  CITIES,
  DATE as TRAVEL_DATE,
  TRAVEL_TIME,
  ADDITIONAL_OPTIONS,
  PRICE,
} from "../constData.js";
import { createEventItemTemplate } from "../view/event-item-view.js";

const getRandomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

export const createEventItemWithParamsTemplate = () => {
  const setOptions = new Set();

  for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
    setOptions.add(Math.floor(Math.random() * 5));
  }

  const additionalOptions = [];

  for (let value of setOptions) {
    additionalOptions.push(ADDITIONAL_OPTIONS[value]);
  }

  const price = getRandomItem(PRICE);

  const travel = {
    waypoint: getRandomItem(WAYPOINTS),
    city: getRandomItem(CITIES),
    date: getRandomItem(TRAVEL_DATE),
    time: getRandomItem(TRAVEL_TIME),
  };

  console.log(travel);
  console.log(price);
  console.log(additionalOptions);
  return createEventItemTemplate(travel, price, additionalOptions);
};
