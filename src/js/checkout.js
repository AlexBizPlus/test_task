import {
  showCart,
  hideCart,
  renderStorageElements,
  deleteItem
} from './render.js';

const patternId = /^[b]{1}[u]{1}[y]{1}[-]{1}[i]{1}[t]{1}[e]{1}[m]{1}[-]{1}[\d]{1,3}$/;

const checkout = document.getElementById('checkout');
const buttons = document.querySelectorAll('.button');
const checkoutCloseLink = checkout.querySelector('.checkout__continue');
const checkoutLink = checkout.querySelector('.checkout__link');
const deleteAllButton = checkout.querySelector('.checkout__delete-items');
const cart = document.getElementById('cart');
const cartTotal = cart.querySelector('span');
const checkoutTotal = document.getElementById('checkout-total');
const shoppingList = document.getElementById('shopping-list');

let deleteButtons = checkout.getElementsByClassName('checkout__delete-item');
let shoppingItems = shoppingList.getElementsByTagName('li');

const deleteSpaces = (str) => {
  return str.split(' ').join('');
};

const onCheckoutClick = (evt) => {
  evt.preventDefault();

  switch (evt.target.parentElement) {
    case checkoutCloseLink:
      closeCart();
      break;

    case checkoutLink:
      closeCart();
      break;

    case deleteAllButton:
      deleteAllItems();
      break;
  }

  switch (evt.target) {
    case checkoutCloseLink:
      closeCart();
      break;

    case checkoutLink:
      closeCart();
      break;

    case deleteAllButton:
      deleteAllItems();
      break;
  }

  for (const button of deleteButtons) {
    if (evt.target.parentElement === button) {
      deleteItem(button.id.slice(7));
      return;
    }
  }
};

const openCart = () => {
  showCart();

  document.addEventListener('keydown', onCartEscPress);
  checkout.addEventListener('click', onCheckoutClick);
};

const closeCart = () => {
  hideCart();
  document.removeEventListener('keydown', onCartEscPress);
  checkout.removeEventListener('click', onCheckoutClick);
};

const onCartEscPress = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeCart();
  }
};

const addItemToCart = (buttonId) => {
  let total = JSON.parse(sessionStorage.getItem('total'));
  let storageArray = JSON.parse(sessionStorage.getItem('cart'));

  if (!storageArray) {
    storageArray = [];
  }

  if (!total) {
    total = 0;
  }

  let id = buttonId.slice(4);

  for (const item of storageArray) {
    if (item.id === id) {
      return;
    }
  }

  const obj = {
    id: '',
    name: '',
    oldPrice: '',
    price: ''
  };

  obj.id = id;
  obj.name = document.getElementById(id).textContent;
  obj.oldPrice = parseInt(deleteSpaces(document.getElementById(`old-price-${id}`).textContent));
  obj.price = parseInt(deleteSpaces(document.getElementById(`price-${id}`).textContent));

  storageArray.push(obj);
  total += obj.price;

  sessionStorage.setItem('cart', JSON.stringify(storageArray));
  sessionStorage.setItem('total', JSON.stringify(total));
};

const onBuyButtonClick = (evt) => {
  evt.preventDefault();

  addItemToCart(evt.target.id);
  renderStorageElements();
  openCart();
};

const deleteAllItems = () => {
  shoppingList.innerHTML = '';
  checkoutTotal.innerHTML = '0 &#8381;';
  cartTotal.innerHTML = '0 &#8381;';
  sessionStorage.removeItem('cart');
  sessionStorage.removeItem('total');
};

export function onCartClick(evt) {
  evt.preventDefault();

  if (checkout.classList.contains('hidden')) {
    renderStorageElements();
    openCart();
    return;
  }

  closeCart();
};

export function loadButtonsListener() {
  let buttonsArray = new Array;

  for (const button of buttons) {
    if (patternId.test(button.id)) {
      buttonsArray.push(button);
    }
  };

  buttonsArray.forEach((buttonItem, index) => {
    buttonItem.addEventListener('click', onBuyButtonClick);
  });
};

export function clearAll(evt) {
  evt.preventDefault();
  shoppingList.innerHTML = '';
  checkoutTotal.innerHTML = '0 &#8381;';
  cartTotal.innerHTML = '0 &#8381;';
  sessionStorage.clear();
};

export function replacePrices() {
  let itemsList = document.querySelector('.items__list');
  let items = itemsList.querySelectorAll('.item');
  for (const item of items) {
    item.querySelector('.price__current-price').innerHTML = parseInt(deleteSpaces(item.querySelector('.price__old-price').textContent)) + '<span class="price__currency">&#8381;</span>';
  }

  for (const shoppingItem of shoppingItems) {
    shoppingItem.querySelector('.checkout__item-price').innerHTML = shoppingItem.querySelector('.checkout__old-price').innerHTML;
  }

  let total = 0;
  let storageArray = JSON.parse(sessionStorage.getItem('cart'));

  for (const storageItem of storageArray) {
    storageItem.price = storageItem.oldPrice;
    total += storageItem.price;
  };

  sessionStorage.setItem('cart', JSON.stringify(storageArray));
  sessionStorage.setItem('total', JSON.stringify(total));

  checkoutTotal.innerHTML = `${total} &#8381;`;
  cartTotal.innerHTML = `${total} &#8381;`;
};
