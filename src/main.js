import SiteMenuTemplate from './view/site-menu-view.js';
import SiteFilterTemplate from './view/site-filters-view.js';
import SiteSortTemplate from './view/site-sort-view.js';

// import { EventAddTemplate } from './view/event-add-view.js';
import EventListTemplate from './view/event-list-view.js';
import EventEditTemplate from './view/event-edit-view.js';
import EventItemTemplate from './view/event-item-view.js';
import { generateMock } from './utility/generate-mock.js';
import { generateCitiesDesctiprion } from './utility/generate-cities-description.js';

import { RenderPosition, renderElement } from './render.js';
import { EVENT_COUNT } from './constData.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteMenuElement = siteHeaderElement.querySelector(
  '.trip-controls__navigation'
);
const siteFiltersElement = siteHeaderElement.querySelector(
  '.trip-controls__filters'
);
const siteEventsElement = siteMainElement.querySelector('.trip-events');
const eventListTemplate = new EventListTemplate();
const eventList = Array.from({ length: EVENT_COUNT }, generateMock);
const citiesList = generateCitiesDesctiprion();


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

renderElement(
  siteEventsElement,
  new SiteSortTemplate().element,
  RenderPosition.BEFOREEND
);

renderElement(
  siteEventsElement,
  eventListTemplate.element,
  RenderPosition.BEFOREEND
);

const renderEvent = (eventListElement, event) => {
  const eventItemComponent = new EventItemTemplate(event);
  const eventEditComponent = new EventEditTemplate(event, citiesList);

  const replaceItemToForm = () => {
    eventListElement.replaceChild(eventEditComponent.element, eventItemComponent.element);
  };
  const replaceFormToItem = () => {
    eventListElement.replaceChild(eventItemComponent.element, eventEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventItemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceItemToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToItem();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(eventListElement, eventItemComponent.element, RenderPosition.BEFOREEND);
};

eventList.map((event) => renderEvent(eventListTemplate.element, event));
