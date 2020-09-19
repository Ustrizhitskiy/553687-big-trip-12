import AbstractElement from "./abstract";
import {MenuItem} from "../const";
import {capitalizeFirstLetter} from "../utils/render";

const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-name="${MenuItem.TABLE}">
          ${capitalizeFirstLetter(MenuItem.TABLE)}
      </a>
      <a class="trip-tabs__btn" href="#" data-name="${MenuItem.STATISTICS}">
          ${capitalizeFirstLetter(MenuItem.STATISTICS)}
      </a>
    </nav>`
  );
};

export default class SiteMenuView extends AbstractElement {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.name);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelectorAll(`a`)
      .forEach((link) => link.addEventListener(`click`, this._menuClickHandler));
    document.querySelector(`.trip-main__event-add-btn`)
      .addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-name=${menuItem}]`);

    if (item !== null) {
      this.getElement().querySelectorAll(`.trip-tabs__btn`)
        .forEach((elem) => elem.classList.remove(`trip-tabs__btn--active`));

      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
