import {FilterType} from "../const";
import {isPointAfterNow, isPointBeforeNow} from "./point";

export const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((point) => isPointBeforeNow(point.dateTo)),
  [FilterType.PAST]: (tripPoint) => tripPoint.filter((point) => isPointAfterNow(point.dateFrom))
};
