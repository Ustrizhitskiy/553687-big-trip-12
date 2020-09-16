import Observer from "../utils/observer";
import {FilterType} from "../const";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  getFilter() {
    return this._activeFilter;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }
}
