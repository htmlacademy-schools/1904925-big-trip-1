import { renderElement, RenderPosition } from "../render";
import EventListTemplate from "../view/event-list-view";
import NoEventView from "../view/no-event-view";
import SiteSortTemplate from "../view/site-sort-view";
import PointPresenter from "./point-presenter";
import { updateItem } from "../utils/common";
import {SORT_TYPE} from '../utils/const';
import {sortTaskByDay, sortTaskByDuration, sortTaskByPrice} from '../utils/point';

export default class Presenter {
  #mainElement = null;
  #pointsElement = null;

  #SortComponent = new SiteSortTemplate();
  #noPointsComponent = new NoEventView();
  #pointsListElement = new EventListTemplate();

  #points = [];
  #pointPresenter = new Map();

  #currentSortType = SORT_TYPE.SORT_DAY;
  #sourcedPoints = [];

  constructor(mainElement) {
    this.#mainElement = mainElement;

    this.#pointsElement = this.#mainElement.querySelector(".-events");
  }

  init = (points) => {
    this.#points = [...points];
    this.#sourcedPoints = [...points];
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
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.SORT_DAY:
        this.#points.sort(sortTaskByDay);
        break;
      case SORT_TYPE.SORT_TIME:
        this.#points.sort(sortTaskByDuration);
        break;
      case SORT_TYPE.SORT_PRICE:
        this.#points.sort(sortTaskByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearPointList();
    this.#renderPointsList();
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

  #renderSort = () => {
    render(this.#pointsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListElement, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPointsList = () => {
    for (let i = 0; i < this.#pPoints.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };

  #renderMain = () => {
    if (this.#points.length === 0) {
      this.#renderNoTasks();
    } else {
      this.#renderSort();
      this.#renderPointsListElement();
      this.#sortTasks(this.#currentSortType);
      this.#renderPointsList();
    }
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
