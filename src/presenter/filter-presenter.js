import {FilterType, UpdateType} from "../const";
import {remove, render, RenderPosition, replace} from "../utils/render";
import FilterView from "../view/filter-view";

export default class FilterPresenter {
  constructor(filterContainer, filterModel, tripPointModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tripPointModel = tripPointModel;
    this._currentFilter = null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._tripPointModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(type) {
    if (this._currentFilter === type) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, type);
  }

  _getFilters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: FilterType.EVERYTHING.toUpperCase(),
      },
      {
        type: FilterType.FUTURE,
        name: FilterType.FUTURE.toUpperCase(),
      },
      {
        type: FilterType.PAST,
        name: FilterType.PAST.toUpperCase(),
      },

    ];
  }
}
