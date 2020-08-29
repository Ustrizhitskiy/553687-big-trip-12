export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updateEvent = (events, updatedEvent) => {
  const index = events.findIndex((event) => event.id === updatedEvent.id);

  if (index === -1) {
    return events;
  }

  return [
    ...events.slice(0, index),
    updatedEvent,
    ...events.slice(index + 1)
  ];
};
