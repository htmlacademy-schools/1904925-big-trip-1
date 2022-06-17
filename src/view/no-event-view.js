import AbstractView from "./abstract-view";
import { FilterType } from "../utils/const";

const NoEventsTextType = {
  [FilterType.EVERYTHING]: "Click New Event to create your first event",
  [FilterType.PAST]: "There are no past events now",
  [FilterType.FUTURE]: "There are no future events now",
};

const createNoEventsTemplate = (filterType) => {
  const noEventTextValue = NoEventsTextType[filterType];

  return `<p class="trip-events__msg">
      ${noEventTextValue}
    </p>`;
};

export default class NoEventView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoEventsTemplate(this._data);
  }
}
