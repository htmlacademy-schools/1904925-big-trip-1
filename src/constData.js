export const RANDOM_TEXT = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const WAYPOINTS = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const CITIES = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
  'Tokio',
  'Chicago',
  'Moscow',
  'Antananarivo',
];

export const ADDITIONAL_OPTIONS = [
  {
    id: 'luggage',
    title: 'Add luggage',
    price: 10,
  },
  {
    id: 'comfort',
    title: 'Switch to comfort',
    price: 80,
  },
  {
    id: 'meal',
    title: 'Add meal',
    price: 15,
  },
  {
    id: 'seats',
    title: 'Choose seats',
    price: 5,
  },
  {
    id: 'train',
    title: 'Travel by train',
    price: 40,
  },
];

export const TRAVEL_DATE = [
  {
    pure: '2019-05-19',
    readable: 'MAY 19',
  },
  {
    pure: '2021-04-23',
    readable: 'APR 23',
  },
  {
    pure: '2020-03-10',
    readable: 'MAR 10',
  },
  {
    pure: '2020-06-30',
    readable: 'JUN 30',
  },
  {
    pure: '2021-07-02',
    readable: 'JUL 02',
  },
];

export const TRAVEL_TIME = [
  {
    start: '21:00',
    end: '23:00',
    duration: '02H',
  },
  {
    start: '19:00',
    end: '22:00',
    duration: '03H',
  },
  {
    start: '22:30',
    end: '23:30',
    duration: '01H',
  },
  {
    start: '07:30',
    end: '11:30',
    duration: '04H',
  },
  {
    start: '12:00',
    end: '18:00',
    duration: '06H',
  },
];

export const PRICE = ['120', '180', '200', '165', '115'];


export const INITIAL_EVENT_DATA = {
  travel: {
    date: {
      pure: '2019-05-19',
      readable: 'MAY 19',
    },
    time: {
      start: '21:00',
      end: '23:00',
      duration: '02H',
    },
    waypoint: 'Flight',
    city: 'Amsterdam'
  },
  price: '0',
  additionOptions: [],
};
