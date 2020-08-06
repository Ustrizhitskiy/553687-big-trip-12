export const createFilterItemTemplate = () => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>`
  );
};
