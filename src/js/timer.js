import {
  startPriceAction,
  countPriceAction
} from './render.js';

import {
  closePriceAction
} from './main.js';

const MICRO_DELAY = 50;

let intervalCount;
let delay = 10000; //custom__time

// const timeIsUp = () => {
//   closePriceAction();
// timer.classList.add('hidden');
// let storageArray = JSON.parse(sessionStorage.getItem('cart'));

// for (const item of itemsList) {
//   let oldPrice = document.getElementById(`old-price-${item.id}`).textContent
//   document.getElementById(`price-${item.id}`).textContent = oldPrice;
//   document.getElementById(`old-price-${item.id}`).style.display = 'none';

//   if (storageArray) {
//     for (let storageItem of storageArray) {
//       if (storageItem.id === item.id) {
//         storageItem.price = oldPrice;
//       }
//     }
//   }

//   let shoppingList = document.getElementById('shopping-list');
//   let shoppingItems = shoppingList.getElementsByTagName('li');
//   for (shoppingItem of shoppingItems) {
//     if (shoppingItem.id === item.id) {
//       shoppingItem.price = oldPrice;
//     }
//   }
// }
// renderStorageElements();
// sessionStorage.setItem('cart', JSON.stringify(storageArray));
// }

export function onLoadTimer() {
  if (!sessionStorage.time) {
    startPriceAction();
  }

  let now = new Date().getTime();

  if (sessionStorage.time && JSON.parse(sessionStorage.getItem('time')) < delay) {
    delay = JSON.parse(sessionStorage.getItem('time'));
  }

  now += delay;

  let min = Math.trunc(delay / 1000 / 60);
  let sec = Math.trunc(Math.abs(min * 1000 * 60 - delay) / 1000);
  countPriceAction(min > 9 ? min : `0${min}`, sec > 9 ? sec : `0${sec}`);

  clearTimeout(intervalCount);
  intervalCount = window.setInterval(countTimer, 1000);

  function countTimer() {
    let newNow = new Date().getTime() - MICRO_DELAY;
    min = Math.trunc(Math.floor((now - newNow) / 1000 / 60));
    sec = Math.abs(Math.round((now - newNow) / 1000) - min * 60);
    countPriceAction(min > 9 ? min : `0${min}`, sec > 9 ? sec : `0${sec}`);

    sessionStorage.setItem('time', JSON.stringify(now - newNow));

    if (now <= newNow) {
      countPriceAction(`00`, `00`);
      clearTimeout(intervalCount);
      closePriceAction();
    }
  }
};
