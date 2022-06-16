export const createEventOptionsMarkup = (optionsList) => {
  const createOprionMarkup = (option) =>
    `<div class='event__offer-selector'>
    <input class='event__offer-checkbox  visually-hidden' id='event-offer-${option.id}-1' type='checkbox' name='event-offer-${option.id}'>
    <label class='event__offer-label' for='event-offer-${option.id}-1'>
      <span class='event__offer-title'>${option.title}</span>
      &plus;&euro;&nbsp;
      <span class='event__offer-price'>${option.price}</span>
    </label>
  </div>`;

  const optionsListMarkup = optionsList.map((option) => createOprionMarkup(option)).join('');

  if (optionsList.length !== 0) {
    return `<section class='event__section  event__section--offers'>
              <h3 class='event__section-title  event__section-title--offers'>Offers</h3>
              <div class='event__offer-selector'>
              ${optionsListMarkup}
              </div>
            </section>`;
  }
  return '';
};

export const createEventTypesMarkup = (waypoints, choosenWayPoint) => {
  const createTypeMarkup = (type) => {
    const isChecked = type === choosenWayPoint ? 'checked=""' : '';
    const lowerType = type.toLowerCase();

    return `<div class="event__type-item">
         <input id="event-type-${lowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${lowerType}" ${isChecked}>
        <label class="event__type-label  event__type-label--${lowerType}" for="event-type-${lowerType}-1">${type}</label>
      </div>
    `;
  };

  return waypoints.map(createTypeMarkup).join('');
};
