import { ADDITIONAL_OPTIONS, WAYPOINTS } from '../utils/constData';
import { createEventOptionsMarkup, createEventTypesMarkup } from '../utils/forms';
import AbstractView from './abstract-view';

const createEventAddTemplate = (data, citiesList) =>
  `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${data.travel.waypoint.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypesMarkup(WAYPOINTS, data.travel.waypoint)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${data.travel.waypoint}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
  data.city
}" list="destination-list-1">
        <datalist id="destination-list-1">
${Object.entries(citiesList)
    .map((entry) => `<option value="${entry[0]}"></option>`)
    .join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${new Date(
    data.travel.date.pure
  ).toLocaleDateString('en-US')} ${data.travel.time.start}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${new Date(
    data.travel.date.pure
  ).toLocaleDateString('en-US')} ${data.travel.time.end}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${
  data.price
}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      ${createEventOptionsMarkup(ADDITIONAL_OPTIONS)}

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${citiesList[data.travel.city].description}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${citiesList[data.travel.city].photos.map(
    (photoUrl) => `
                  <img class="event__photo" src="${photoUrl}" alt="Event photo">
                `
  )}
            </div>  
          </div>
      </section>
    </section>
  </form>`;


export default class EventAddTemplate extends AbstractView {
  #initialData = null;
  #citiesList = null;

  constructor (data, citiesList) {
    this.#initialData = data;
    this.#citiesList = citiesList;
  }

  get template () {
    return createEventAddTemplate(this.#initialData, this.#citiesList)
  }
}
