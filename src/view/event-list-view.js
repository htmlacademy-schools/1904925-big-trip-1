import {createElement} from '../render.js';

const createEventsListTemplate = () => ('<ul class="trip-events__list"></ul>');

export class EventListTemplate {
  #domElement = null;

  get element() {
    if (this.#domElement === null) {
      this.#domElement = createElement(this.template);
    }
    return this.#domElement;
  }

  get template() {
    return createEventsListTemplate();
  }

  removeElement() {
    this.#domElement = null;
  }
}