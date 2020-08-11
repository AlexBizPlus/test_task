import {
  onLoadTimer
} from './timer.js';

import {
  stopPriceAction,
} from './render.js';

import {
  loadButtonsListener,
  clearAll,
  onCartClick
} from './checkout.js';

const header = document.querySelector('.header');
const logoLink = header.querySelector('.header__logo-link');
const cart = document.getElementById('cart');

const onPriceActionClick = (evt) => {
  evt.target.remove();
}

const onLoad = () => {
  // проверить сумму в header

  onLoadTimer();
  loadButtonsListener();
  logoLink.addEventListener('click', clearAll);
  cart.addEventListener('click', onCartClick);
  window.removeEventListener('DOMContentLoaded', onLoad);
};

window.addEventListener('DOMContentLoaded', onLoad);


export function closePriceAction() {
  stopPriceAction();

  const priceActionContainer = document.querySelector('.price-action');
  if (priceActionContainer) {
    priceActionContainer.addEventListener('click', onPriceActionClick)
  }
};
