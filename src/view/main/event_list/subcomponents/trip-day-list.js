import AbstractElement from "../../../abstract-element";
import {createElement} from "../../../../util/render";

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

const createNoParamsTemplate = () => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>`
  );
};


export default class TripDayList extends AbstractElement {
  constructor(dayDate) {
    super();
    this.dayDate = dayDate;
  }

  getTemplate() {
    return createTripDayListTemplate(this.dayDate);
  }

  getElementWithoutDay() {
    return createElement(createNoParamsTemplate());
  }
}
