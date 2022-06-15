import { createElement } from "../render";

const createSiteMenuTemplate = () =>
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;


export default class SiteMenuTemplate {
  #domElement = null;

  get element () {
    if (this.#domElement === null) {
      this.#domElement = createElement(this.template);
    }
    return this.#domElement;
  }

  get template() {
    return createSiteMenuTemplate();
  }

  removeElement() {
    this.#domElement = null;
  }
}