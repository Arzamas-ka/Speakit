export const removeElement = (selector) => {
  const element = document.querySelector(selector);

  if (element) {
    element.remove();
  }
};

export const createElement = (elementType, className) => {
  const element = document.createElement(elementType);

  if (className) {
    element.classList.add(className);
  }

  return element;
};

export const findElement = (selector) => document.querySelector(selector);
