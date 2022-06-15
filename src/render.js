export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      return;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      return;
    case RenderPosition.BEFOREEND:
      container.append(element);
      return;
    case RenderPosition.AFTEREND:
      container.after(element);
      return;      
  }
}

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  
  return newElement.firstElementChild;
};
