import AbstractView from './abstract-view';

const createSiteFilterTemplate = (filters, currentFilter) =>
  `<form class='trip-filters' action='#' method='get'>
    ${filters.map((filter) => (
      `<div class='trip-filters__filter'>
      <input id='filter-${filter.type}' class='trip-filters__filter-input  visually-hidden' type='radio' name='trip-filter' value='${filter.type}' ${type === currentFilterType ? 'checked' : ''}>
      <label class='trip-filters__filter-label' for='filter-${filter.type}'>${filter.type}</label>
    </div>`
    )).join('')}
    <button class='visually-hidden' type='submit'>Accept filter</button>
  </form>`;

export default class SiteFilterTemplate extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createSiteFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
