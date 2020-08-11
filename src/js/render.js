import {
  replacePrices
} from './checkout.js';

const mainWrapper = document.querySelector('.main__wrapper');
const footer = document.getElementById('footer');
const checkout = document.getElementById('checkout');
const shoppingList = document.getElementById('shopping-list');
const checkoutTotal = document.getElementById('checkout-total');
const cart = document.getElementById('cart');
const cartTotal = cart.querySelector('span');

let shoppingItems = shoppingList.getElementsByTagName('li');

export function startPriceAction() {
  const mainElement = document.querySelector('.main__wrapper');
  let fragment = new DocumentFragment();
  let priceActionContainer = document.createElement('div');
  priceActionContainer.style.width = '100%';
  priceActionContainer.style.height = '60px';
  priceActionContainer.style.display = 'flex';
  priceActionContainer.style.flexDirection = 'row';
  priceActionContainer.style.flexDirection = 'row';
  priceActionContainer.style.justifyContent = 'center';
  priceActionContainer.style.alignItems = 'center';
  priceActionContainer.style.backgroundColor = '#ffffff';
  priceActionContainer.classList.add('price-action');

  let text = document.createElement('p');
  priceActionContainer.prepend(text);

  fragment.prepend(priceActionContainer);
  mainElement.prepend(fragment);
};

export function stopPriceAction() {
  const priceActionContainer = document.querySelector('.price-action');
  if (priceActionContainer) {
    priceActionContainer.innerHTML = '<p>Акция закончилась</p>';
  }

  replacePrices();
};

export function countPriceAction(min, sec) {
  const priceActionText = document.querySelector('.price-action p');
  if (priceActionText) {
    priceActionText.textContent = `До конца акции осталось: ${min} : ${sec}`;
  }
};

export function showCart() {
  document.body.style.position = 'fixed';
  checkout.classList.remove('hidden');
  mainWrapper.classList.add('main--shadow');
  footer.classList.add('main--shadow');
};

export function hideCart() {
  document.body.style.position = '';
  checkout.classList.add('hidden');
  mainWrapper.classList.remove('main--shadow');
  footer.classList.remove('main--shadow');
};

export function renderItem(elem) {
  let fragment = document.createDocumentFragment();
  let template = document.querySelector('#template-item').content.querySelector('li');
  let newElement = template.cloneNode(true);
  newElement.id = elem.id;
  newElement.querySelector('.checkout__text').textContent = elem.name;
  newElement.querySelector('.checkout__old-price').innerHTML = `${elem.oldPrice} &#8381;`;
  newElement.querySelector('.checkout__item-price').innerHTML = `${elem.price} &#8381;`;
  newElement.querySelector('.checkout__delete-item').id = 'delete-' + elem.id;
  fragment.appendChild(newElement);
  shoppingList.appendChild(fragment);
};

export function renderStorageElements() {
  shoppingList.innerHTML = '';
  let total = JSON.parse(sessionStorage.getItem('total'));
  const storageItems = JSON.parse(sessionStorage.getItem('cart'));
  if (storageItems) {
    for (const storageItem of storageItems) {
      renderItem(storageItem);
    }
  }

  if (!total) {
    total = 0;
  }

  checkoutTotal.innerHTML = `${total} &#8381;`;
  cartTotal.innerHTML = `${total} &#8381;`;
};

export function deleteItem(id) {
  for (const item of shoppingItems) {
    if (item.id === id) {
      item.remove();

      let storageItems = JSON.parse(sessionStorage.getItem('cart'));

      for (const storageItem of storageItems) {
        if (storageItem.id === id) {
          var lostItem = storageItems.splice(storageItems.indexOf(storageItem), 1);
        }
      }
      sessionStorage.setItem('cart', JSON.stringify(storageItems));

      let total = JSON.parse(sessionStorage.getItem('total')) - lostItem[0].price;
      sessionStorage.setItem('total', JSON.stringify(total));

      checkoutTotal.innerHTML = `${total} &#8381;`;
      cartTotal.innerHTML = `${total} &#8381;`;

      return;
    }
  }
};
