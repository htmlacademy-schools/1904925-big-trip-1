export const createEventItemTemplate = (data) =>
  `<div class="event">
    <time class="event__date" datetime="${data.travel.date.pure}">${
    data.travel.date.readable
  }</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${data.travel.waypoint.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${data.travel.waypoint} ${data.travel.city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${
          [data.travel.date.pure, 'T', data.travel.time.start].join('')
        }">${data.travel.time.start}</time>
        &mdash;
        <time class="event__end-time" datetime="${
          [data.travel.date.pure, 'T', data.travel.time.end].join('')
        }">${data.travel.time.end}</time>
      </p>
      <p class="event__duration">${data.travel.time.duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${data.price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${
        data.additionalOptions.length !== 0
          ? data.additionalOptions
              .map(
                (option) =>
                  `<li>
          <span class="event__offer-title">${option.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${option.price}</span>
        </li>
        `
              )
              .join('')
          : `<li><span class="event__offer-title">No additional options</span></li>`
      }
    </ul>
    <button class="event__favorite-btn ${
      Math.floor(Math.random() * 2) ? `event__favorite-btn--active` : ``
    }" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
