export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getOnlyTimeFromDate = (date) => {
  return date.toLocaleTimeString(`en-GB`, {hour: 'numeric', minute:'2-digit'})
};

export const getFormattedDateString = (date) => {
  const formattedDate = date
    .toLocaleDateString(`en-GB`, {day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute:'2-digit'})
    .split(`,`)
    .join(``);

  return `${formattedDate}`;
};

export const getTimeFromStartToEnd = (startDate, endDate) => {
  const timeInMilliseconds = endDate.getTime() - startDate.getTime();
  const timeInMinutes = Math.trunc(timeInMilliseconds / 1000 / 60);
  const days = Math.trunc(timeInMinutes / 1440);
  const hours = Math.trunc((timeInMinutes - days * 1440) / 60);
  const minutes = timeInMinutes - days * 1440 - hours * 60;

  return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes > 0 ? minutes + `M` : ``}`.trim();
};
