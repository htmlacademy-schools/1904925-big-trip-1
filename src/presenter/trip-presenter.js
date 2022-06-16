import { renderElement, RenderPosition } from "../render";
import EventListTemplate from "../view/event-list-view";
import NoEventView from "../view/no-event-view";
import SiteSortTemplate from "../view/site-sort-view";
import PointPresenter from "./point-presenter";
import { updateItem } from "../utils/common";

export default class Presenter {
  #mainElement = null;
  #pointsElement = null;

  #SortComponent = new SiteSortTemplate();
  #noPointsComponent = new NoEventView();
  #pointsListElement = new EventListTemplate();

  #points = [];
  #pointPresenter = new Map();
  constructor(mainElement) {
    this.#mainElement = mainElement;

    this.#pointsElement = this.#mainElement.querySelector(".-events");
  }

  init = (points) => {
    this.#points = [...points];
    this.#renderMain();
  };

  #renderNoTasks = () => {
    renderElement(
      this.#pointsElement,
      this.#noPointsComponent,
      RenderPosition.BEFOREEND
    );
  };

  #renderPointsListElement = () => {
    renderElement(
      this.#pointsElement,
      this.#pointsListElement,
      RenderPosition.BEFOREEND
    );
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    renderElement(
      this.#pointsElement,
      this.#SortComponent,
      RenderPosition.AFTERBEGIN
    );
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(
      this.#pointsListElement,
      this.#handlePointChange,
      this.#handleModeChange
    );
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPointsList = () => {
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };

  #renderMain = () => {
    if (this.#points.length === 0) {
      this.#renderNoTasks();
    } else {
      this.#renderSort();
      this.#renderPointsListElement();
      this.#renderPointsList();
    }
  };

  #clearTaskList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
