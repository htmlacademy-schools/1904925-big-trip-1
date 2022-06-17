import TripFiltersView from "../view/site-filter-view";
import {
  renderElement,
  RenderPosition,
  replaceElement,
  removeElement,
} from "../render.js";
import { UpdateType } from "../utils/const";

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tasksModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, tasksModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tasksModel = tasksModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return ["everything", "future", "past"];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripFiltersView(
      filters,
      this.#filterModel.filter
    );
    this.#filterComponent.setFilterTypeChangeHandler(
      this.#handleFilterTypeChange
    );

    if (prevFilterComponent === null) {
      renderElement(
        this.#filterContainer,
        this.#filterComponent,
        RenderPosition.BEFOREEND
      );
      return;
    }

    replaceElement(this.#filterComponent, prevFilterComponent);
    removeElement(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
