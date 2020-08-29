import AbstractElement from "../view/abstract-element";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, position) => {
  if (container instanceof AbstractElement) {
    container = container.getElement();
  }

  if (element instanceof AbstractElement) {
    element = element.getElement();
  }

  container.insertAdjacentElement(position, element);
};

export const replace = (newChild, oldChild) => {
  if (newChild instanceof AbstractElement) {
    newChild = newChild.getElement();
  }

  if (oldChild instanceof AbstractElement) {
    oldChild = oldChild.getElement();
  }

  const parentElement = oldChild.parentElement;

  try {
    parentElement.replaceChild(newChild, oldChild);
  } catch (e) {
    throw new Error(`Can't replace unexisting elements`);
  }
};

export const renderTemplate = (container, template, position) => {
  if (container instanceof AbstractElement) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(position, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractElement)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
