export const createFilterItemTemplate = (filterName, isChecked) => {

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${filterName}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filterName}"
        ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
    </div>`
  );
};
