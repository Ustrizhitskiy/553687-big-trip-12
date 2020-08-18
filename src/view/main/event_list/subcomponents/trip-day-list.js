import {createElement} from "../../../../util";

const createTripDayListTemplate = (dayDate) => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayDate.getDate()}</span>
          <time class="day__date" datetime="${dayDate.getFullYear()}-${dayDate.getMonth() + 1}-${dayDate.getDate()}">
            ${dayDate.getMonth() + 1} ${dayDate.getFullYear()}
          </time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>`
  );
};


export default class TripDayList {
  constructor(dayDate) {
    this.dayDate = dayDate;
    this._element = null;
  }

  getTemplate() {
    return createTripDayListTemplate(this.dayDate);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
