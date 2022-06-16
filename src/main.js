import SiteMenuTemplate from './view/site-menu-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter';

import { generateMock } from './utils/generate-mock.js';
import { RenderPosition, renderElement } from './render.js';

import { EVENT_COUNT } from './utils/constData.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const siteMenuElement = siteHeaderElement.querySelector(
  '.trip-controls__navigation'
);
const siteFiltersElement = siteHeaderElement.querySelector(
  '.trip-controls__filters'
);
const eventList = Array.from({ length: EVENT_COUNT }, generateMock);

const pointsModel = new PointsModel();
pointsModel.points = eventList;

const filterModel = new FilterModel();

renderElement(
  siteMenuElement,
  new SiteMenuTemplate(),
  RenderPosition.BEFOREEND
);

const tripPresenter = new TripPresenter(
  siteMainElement,
  pointsModel,
  filterModel
);
const filterPresenter = new FilterPresenter(siteFiltersElement, filterModel);

filterPresenter.init();
tripPresenter.init();

document
  .querySelector('.trip-main__event-add-btn')
  .addEventListener('click', (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();
  });
