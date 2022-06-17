import { renderElement, RenderPosition } from "./render.js";
import SiteMenuView from "./view/site-menu-view.js";
import TripPresenter from "./presenter/trip-presenter";
import FilterPresenter from "./presenter/filter-presenter";
import { generatePoint } from "./utils/point.js";
import PointsModel from "./model/points-model.js";
import FilterModel from "./model/filter-model";
import {TRIP_COUNT} from "./utils/const";

const tripPoints = Array.from({ length: TRIP_COUNT }, generatePoint);
const pageMainElement = document.querySelector(".page-body");

const tripControlsNavigationElement = document.querySelector(
  ".trip-controls__navigation"
);
const tripControlsFiltersElement = document.querySelector(
  ".trip-controls__filters"
);

const pointsModel = new PointsModel();
pointsModel.points = tripPoints;

const filterModel = new FilterModel();

renderElement(
  tripControlsNavigationElement,
  new SiteMenuView(),
  RenderPosition.BEFOREEND
);

const tripPresenter = new TripPresenter(
  pageMainElement,
  pointsModel,
  filterModel
);
const filterPresenter = new FilterPresenter(
  tripControlsFiltersElement,
  filterModel
);

filterPresenter.init();
tripPresenter.init();

document
  .querySelector(".trip-main__event-add-btn")
  .addEventListener("click", (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();
  });
