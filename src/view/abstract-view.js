
import {createElement} from '../render.js';

export default class AbstractView {
  #domElement = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get element() {
    if (!this.#domElement) {
      this.#domElement = createElement(this.template);
    }

    return this.#domElement;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    this.#domElement = null;
  }
}
