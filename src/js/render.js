const checkout = document.getElementById('checkout');

let total = document.getElementById('checkout-total');
let shoppingList = document.getElementById('shopping-list');
let shoppingItems = shoppingList.getElementsByTagName('li');


const deleteAllItems = function () {
  shoppingList.innerHTML = '';
  total.textContent = '0.0 руб.';
  sessionStorage.removeItem('cart');
};

const deleteItem = function (id) {
  for (item of shoppingItems) {
    if (item.id === id) {
      item.remove();

      let storageItems = JSON.parse(sessionStorage.getItem('cart'));
      let lostItem = storageItems.splice(id[id.length - 1], 1);
      sessionStorage.setItem('cart', JSON.stringify(storageItems));

      return;
    }
  }
};

const renderItem = function (elem) {
  let fragment = document.createDocumentFragment();
  let template = document.querySelector('#template-item').content.querySelector('li');
  let newElement = template.cloneNode(true);
  newElement.id = elem.id;
  newElement.querySelector('.checkout__text').textContent = elem.name;
  newElement.querySelector('.checkout__item-price').textContent = elem.price;
  newElement.querySelector('.checkout__delete-item').id = 'delete-' + elem.id;
  fragment.appendChild(newElement);
  shoppingList.appendChild(fragment);
}

const addItem = function (id) {
  for (item of shoppingItems) {
    if (item.id === id) {
      return;
    }
  }

  let storageItems = JSON.parse(sessionStorage.getItem('cart'));
  let lastStorageItem = storageItems[storageItems.length - 1];

  renderItem(lastStorageItem);
}

const renderStorageElements = function () {
  let storageItems = JSON.parse(sessionStorage.getItem('cart'));
  shoppingList.innerHTML = '';
  for (storageItem of storageItems) {
    renderItem(storageItem);
  }
}
