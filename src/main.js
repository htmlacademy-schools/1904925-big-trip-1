import SiteMenuTemplate from './view/site-menu-view.js';
import SiteFilterTemplate from './view/site-filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';

import { generateMock } from './utils/generate-mock.js';
import { RenderPosition, renderElement } from './render.js';

import { EVENT_COUNT } from './utils/constData.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const siteMenuElement = siteHeaderElement.querySelector(
  '.trip-controls__navigation'
);
const siteFiltersElement = siteHeaderElement.querySelector(
  '.trip-controls__filters'
);
const eventList = Array.from({ length: EVENT_COUNT }, generateMock);

renderElement(
  siteMenuElement,
  new SiteMenuTemplate().element,
  RenderPosition.BEFOREEND
);

renderElement(
  siteFiltersElement,
  new SiteFilterTemplate().element,
  RenderPosition.BEFOREEND
);

new TripPresenter(siteMainElement).init(eventList);
