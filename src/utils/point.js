import moment from "moment";
import {ACTIVITY_EVENTS} from "../const";

export const isPointAfterNow = (date) => {
  if (date === null) {
    return false;
  }

  return moment(new Date()).isAfter(date, `day`);
};

export const isPointBeforeNow = (date) => {
  if (date === null) {
    return false;
  }

  return moment(new Date()).isBefore(date, `day`);
};

export const isDatesEqual = (date1, date2) => {
  if (date1 === null && date2 === null) {
    return true;
  }

  return moment(date1).isSame(date2, `ms`);
};

export const getPreposition = (type) => {
  return ACTIVITY_EVENTS.some((elem) => elem === type) ? `in` : `to`;
};
