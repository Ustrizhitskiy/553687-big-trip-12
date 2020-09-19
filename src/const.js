export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const UserAction = {
  ADD_TRIP_POINT: `ADD_TRIP_POINT`,
  UPDATE_TRIP_POINT: `UPDATE_TRIP_POINT`,
  DELETE_TRIP_POINT: `DELETE_TRIP_POINT`
};

export const MenuItem = {
  ADD_NEW_POINT: `add_new_point`,
  TABLE: `table`,
  STATISTICS: `stats`
};

export const TRANSFER_EVENTS = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const ACTIVITY_EVENTS = [`check-in`, `sightseeing`, `restaurant`];
