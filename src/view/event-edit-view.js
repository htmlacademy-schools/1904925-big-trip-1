import { ADDITIONAL_OPTIONS, WAYPOINTS } from '../utils/constData';
import {
  createEventOptionsMarkup,
  createEventTypesMarkup,
} from '../utils/forms';
import {SmartView} from './smart-view';


const createEventEditTemplate = (data, citiesList) =>
  `<form class='event event--edit' action='#' method='post'>
    <header class='event__header'>
      <div class='event__type-wrapper'>
        <label class='event__type  event__type-btn' for='event-type-toggle-1'>
          <span class='visually-hidden'>Choose event type</span>
          <img class='event__type-icon' width='17' height='17' src='img/icons/${data.travel.waypoint.toLowerCase()}.png' alt='Event type icon'>
        </label>
        <input class='event__type-toggle  visually-hidden' id='event-type-toggle-1' type='checkbox'>

        <div class='event__type-list'>
          <fieldset class='event__type-group'>
            <legend class='visually-hidden'>Event type</legend>
            ${createEventTypesMarkup(WAYPOINTS, data.travel.waypoint)}
          </fieldset>
        </div>
      </div>

      <div class='event__field-group  event__field-group--destination'>
        <label class='event__label  event__type-output' for='event-destination-1'>
          ${data.travel.waypoint}
        </label>
        <input class='event__input  event__input--destination' id='event-destination-1' type='text' name='event-destination' value='${
          data.travel.city
        }' list='destination-list-1'>
        <datalist id='destination-list-1'>
         ${Object.entries(citiesList)
           .map((entry) => `<option value='${entry[0]}'></option>`)
           .join('')}
        </datalist>
      </div>

      <div class='event__field-group  event__field-group--time'>
        <label class='visually-hidden' for='event-start-time-1'>From</label>
        <input class='event__input  event__input--time' id='event-start-time-1' type='text' name='event-start-time' value='${new Date(
          data.travel.date.pure
        ).toLocaleDateString('en-US')} ${data.travel.time.start}'>
        &mdash;
        <label class='visually-hidden' for='event-end-time-1'>To</label>
        <input class='event__input  event__input--time' id='event-end-time-1' type='text' name='event-end-time' value='${new Date(
          data.travel.date.pure
        ).toLocaleDateString('en-US')} ${data.travel.time.end}'>
      </div>

      <div class='event__field-group  event__field-group--price'>
        <label class='event__label' for='event-price-1'>
          <span class='visually-hidden'>Price</span>
          &euro;
        </label>
        <input class='event__input  event__input--price' id='event-price-1' type='text' name='event-price' value='${
          data.price
        }'>
      </div>

      <button class='event__save-btn  btn  btn--blue' type='submit'>Save</button>
      <button class='event__reset-btn' type='reset'>Delete</button>
      <button class='event__rollup-btn' type='button'>
        <span class='visually-hidden'>Open event</span>
      </button>
    </header>
    <section class='event__details'>
      ${createEventOptionsMarkup(ADDITIONAL_OPTIONS)}
    </section>

      <section class='event__section  event__section--destination'>
        <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
        <p class='event__destination-description'>
            ${citiesList[data.travel.city].description}
        </p>
      </section>
    </section>
  </form>`;

export default class PointEditView extends SmartView {
  constructor(point) {
    super();
    this._data = PointEditView.parsePointToData(point);

    this.#setInnerHandlers();
  }

  get template() {
    return createEventEditTemplate(this._data);
  }

  reset = (point) => {
    this.updateData(PointEditView.parsePointToData(point));
  };

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeGroupClickHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element
      .querySelector('.event__input-start-time')
      .addEventListener('change', this.#startTimeChangeHandler);
    this.element
      .querySelector('.event__input-end-time')
      .addEventListener('change', this.#endTimeChangeHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#basePriceChangeHandler);
  };

  #typeGroupClickHandler = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        type: evt.target.value,
      },
      false
    );
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        destination: this.#getChangedDestination(evt.target.value),
      },
      false
    );
  };

  #startTimeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        dateFrom: evt.target.value,
      },
      true
    );
  };

  #endTimeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        dateTo: evt.target.value,
      },
      true
    );
  };

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData(
      {
        basePrice: evt.target.value,
      },
      true
    );
  };

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupClickHandler);
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
    this._callback.formSubmit(this._data);
    this._callback.formSubmit(PointEditView.parseDataToPoint(this._data));
  };

  static parsePointToData = (point) => ({
    ...point,
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };
    return point;
  };

  #getChangedDestination = (destinationName) => {
    const allDestinations = destinations();

    for (let i = 0; i < allDestinations.length; i++) {
      if (allDestinations[i].name === destinationName) {
        return allDestinations[i];
      }
    }

    return {
      description: null,
      name: '',
      pictures: [],
    };
  };
}
