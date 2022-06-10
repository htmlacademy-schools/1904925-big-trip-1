import { createSiteMenuTemplate } from './view/site-menu-view.js';
import { createSiteFilterTemplate } from './view/site-filters-view.js';
import { createSiteSortTemplate } from './view/site-sort-view.js';

// import { createEventAddTemplate } from './view/event-add-view.js';
import { createEventEditTemplate } from './view/event-edit-view.js';
import { createEventItemTemplate } from './view/event-item-view.js';

import { renderTemplate, RenderPosition } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteMenuElement = siteHeaderElement.querySelector(
  '.trip-controls__navigation'
);
const siteFiltersElement = siteHeaderElement.querySelector(
  '.trip-controls__filters'
);
const siteEventsElement = siteMainElement.querySelector('.trip-events');

const siteEventsListElement = document.createElement('ul');
siteEventsListElement.classList.add('trip-events__list');

const eventsItemWrapper = (item) =>
  `<li class='trip-events__item'>${item}</li>`;

renderTemplate(
  siteMenuElement,
  createSiteMenuTemplate(),
  RenderPosition.BEFOREEND
);
renderTemplate(
  siteFiltersElement,
  createSiteFilterTemplate(),
  RenderPosition.BEFOREEND
);
renderTemplate(
  siteEventsElement,
  createSiteSortTemplate(),
  RenderPosition.BEFOREEND
);

renderTemplate(
  siteEventsListElement,
  eventsItemWrapper(createEventEditTemplate()),
  RenderPosition.BEFOREEND
);

for (let i = 0; i < 3; i++) {
  renderTemplate(
    siteEventsListElement,
    eventsItemWrapper(createEventItemTemplate()),
    RenderPosition.BEFOREEND
  );
}

renderTemplate(
  siteEventsElement,
  siteEventsListElement.outerHTML,
  RenderPosition.BEFOREEND
);
