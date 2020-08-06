// const MOCK_DATA = [{
//   id: 'item-0',
//   name: 'Alchemy of crystals sticker pack',
//   price: '99.0 руб.'
// }];

const buyButtonItemOne = document.getElementById('buy-item-1');
const buyButtonItemTwo = document.getElementById('buy-item-2');
const cart = document.getElementById('cart');
const main = document.getElementById('main');

const checkoutCloseLink = checkout.querySelector('.checkout__continue');
const checkoutLink = checkout.querySelector('.checkout__link');
const deleteAllButton = checkout.querySelector('.checkout__delete-items');

let deleteButtons = checkout.getElementsByClassName('checkout__delete-item');

const deleteSpaces = function (str) {
  return str.split(' ').join('');
};

const onCheckoutClick = function (evt) {
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
      sessionStorage.clear();
      break;

    default:
      break;
  }

  switch (evt.target) {
    case checkoutLink:
      closeCart();
      break;
  }

  for (button of deleteButtons) {
    if (evt.target.parentElement === button) {
      deleteItem(button.id.slice(7));
      return;
    }
  }
};

const closeCart = function () {
  main.classList.remove('main--shadow');
  checkout.classList.add('hidden');
  document.removeEventListener('keydown', onCartEscPress);
  checkout.removeEventListener('click', onCheckoutClick);
  buyButtonItemOne.addEventListener('click', onBuyButtonClick);
  buyButtonItemTwo.addEventListener('click', onBuyButtonClick);
};

const openCart = function () {
  main.classList.add('main--shadow');
  checkout.classList.remove('hidden');
  document.addEventListener('keydown', onCartEscPress);
  checkout.addEventListener('click', onCheckoutClick);
  buyButtonItemOne.removeEventListener('click', onBuyButtonClick);
  buyButtonItemTwo.removeEventListener('click', onBuyButtonClick);
};

const onCartClick = function (evt) {
  evt.preventDefault();
  if (!main.classList.contains('main--shadow')) {
    openCart();
    return;
  }
  if (main.classList.contains('main--shadow')) {
    closeCart();
  }
};

const onCartEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeCart();
  }
};

const onLoadPage = function () {
  console.log('onLoadPage');
  // if (!sessionStorage.flag) {
  //   sessionStorage.setItem('cart', JSON.stringify(MOCK_DATA));
  //   sessionStorage.setItem('flag', 'true');
  // }

  if (sessionStorage.cart) {
    shoppingList.innerHTML = '';
    renderStorageElements();
  }

};

const addItemToStorage = function (elem) {
  let storageArray = JSON.parse(sessionStorage.getItem('cart'));

  if (!storageArray) {
    storageArray = [];
  }


  for (item of storageArray) {
    if (item.id === elem.id) {
      return;
    }
  }
  storageArray.push(elem);

  sessionStorage.setItem('cart', JSON.stringify(storageArray));
};

const onBuyButtonClick = function (evt) {
  evt.preventDefault();

  let obj = {
    id: '',
    name: '',
    price: ''
  };

  if (evt.target === buyButtonItemOne || evt.target.parentElement === buyButtonItemOne) {
    let elemId = document.getElementById('item-1');
    let elemPrice = document.getElementById('price-item-1');

    obj.id = 'item-1';
    obj.name = elemId.textContent;
    obj.price = parseInt(deleteSpaces(elemPrice.textContent));
  }

  if (evt.target === buyButtonItemTwo || evt.target.parentElement === buyButtonItemTwo) {
    let elemId = document.getElementById('item-2');
    let elemPrice = document.getElementById('price-item-2');

    obj.id = 'item-2';
    obj.name = elemId.textContent;
    obj.price = parseInt(deleteSpaces(elemPrice.textContent));
  }

  addItemToStorage(obj);
  addItem(obj.id);
  openCart();
};

buyButtonItemOne.addEventListener('click', onBuyButtonClick);
buyButtonItemTwo.addEventListener('click', onBuyButtonClick);
cart.addEventListener('click', onCartClick);
window.addEventListener('DOMContentLoaded', onLoadPage);
