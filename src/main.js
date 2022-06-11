import { createSiteMenuTemplate } from "./view/site-menu-view.js";
import { createSiteFilterTemplate } from "./view/site-filters-view.js";
import { createSiteSortTemplate } from "./view/site-sort-view.js";

import { createEventAddTemplate } from "./view/event-add-view.js";
import { createEventEditTemplate } from "./view/event-edit-view.js";
import { createEventItemTemplate } from "./view/event-item-view.js";
import { generateMoki } from "./utility/generate-moki.js";
import { generateCitiesDesctiprion } from "./utility/generate-cities-description.js";

import { renderTemplate, RenderPosition } from "./render.js";
import { INITIAL_EVENT_DATA } from "./constData.js";

const siteHeaderElement = document.querySelector(".page-header");
const siteMainElement = document.querySelector(".page-main");
const siteMenuElement = siteHeaderElement.querySelector(
  ".trip-controls__navigation"
);
const siteFiltersElement = siteHeaderElement.querySelector(
  ".trip-controls__filters"
);
const siteEventsElement = siteMainElement.querySelector(".trip-events");

const siteEventsListElement = document.createElement("ul");
siteEventsListElement.classList.add("trip-events__list");

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

// renderTemplate(
//   siteEventsListElement,
//   eventsItemWrapper(createEventAddTemplate()),
//   RenderPosition.BEFOREEND
// );

const mokiEvents = [];
const citiesList = generateCitiesDesctiprion();
console.log(citiesList);

for (let i = 0; i < 15; i++) {
  mokiEvents.push(generateMoki());
}

// renderTemplate(
//   siteEventsListElement,
//   eventsItemWrapper(createEventAddTemplate(INITIAL_EVENT_DATA, citiesList)),
//   RenderPosition.BEFOREEND
// )

mokiEvents.forEach((moki, index) =>
  renderTemplate(
    siteEventsListElement,
    eventsItemWrapper(
      !index
        ? createEventEditTemplate(moki, citiesList)
        : createEventItemTemplate(moki)
    ),
    RenderPosition.BEFOREEND
  )
);

renderTemplate(
  siteEventsElement,
  siteEventsListElement.outerHTML,
  RenderPosition.BEFOREEND
);
