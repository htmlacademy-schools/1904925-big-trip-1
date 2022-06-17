import { nanoid } from "nanoid";
import { removeElement, renderElement, RenderPosition } from "../render.js";
import { UserAction, UpdateType } from "../utils/const";
import EventAddView from "../view/event-add-view";

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointAddComponent = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new EventAddView();
    this.#pointAddComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointAddComponent.setDeleteClickHandler(this.#handleDeleteClick);

    renderElement(
      this.#pointListContainer,
      this.#pointAddComponent,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener("keydown", this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointAddComponent === null) {
      return;
    }

    removeElement(this.#pointAddComponent);
    this.#pointAddComponent = null;

    document.removeEventListener("keydown", this.#escKeyDownHandler);
  };

  #handleFormSubmit = (task) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...task }
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      evt.preventDefault();
      this.destroy();
    }
  };
}
