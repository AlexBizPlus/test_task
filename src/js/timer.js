(function () {
  const MICRO_DELAY = 50;

  let itemsList = document.querySelectorAll('.item__caption');

  const timer = document.getElementById('timer');
  const timerMin = document.getElementById('min');
  const timerSec = document.getElementById('sec');
  let intervalCount;
  let delay = 900000; //custom__time

  const timeIsUp = function () {
    alert('Акция закончилась');
    timer.classList.add('hidden');
    let storageArray = JSON.parse(sessionStorage.getItem('cart'));

    for (item of itemsList) {
      let oldPrice = document.getElementById(`old-price-${item.id}`).textContent
      document.getElementById(`price-${item.id}`).textContent = oldPrice;
      document.getElementById(`old-price-${item.id}`).style.display = 'none';
      for (storageItem of storageArray) {
        if (storageItem.id === item.id) {
          storageItem.price = oldPrice;
        }
      }

      let shoppingList = document.getElementById('shopping-list');
      let shoppingItems = shoppingList.getElementsByTagName('li');
      for (shoppingItem of shoppingItems) {
        if (shoppingItem.id === item.id) {
          shoppingItem.price = oldPrice;
        }
      }
    }
    renderStorageElements();
    sessionStorage.setItem('cart', JSON.stringify(storageArray));
  }

  const onLoadTimer = function () {

    if (timer.classList.contains('hidden')) {
      timer.classList.remove('hidden');
    }

    let now = new Date().getTime();

    if (sessionStorage.time && JSON.parse(sessionStorage.getItem('time')) < delay) {
      delay = JSON.parse(sessionStorage.getItem('time'));
    }

    now += delay;

    let min = Math.trunc(delay / 1000 / 60);
    let sec = Math.trunc(Math.abs(min * 1000 * 60 - delay) / 1000);
    timerMin.textContent = min > 9 ? min : `0${min}`;
    timerSec.textContent = sec > 9 ? sec : `0${sec}`;

    clearTimeout(intervalCount);
    intervalCount = window.setInterval(countTimer, 1000);

    function countTimer() {
      let newNow = new Date().getTime() - MICRO_DELAY;
      min = Math.trunc(Math.floor((now - newNow) / 1000 / 60));
      sec = Math.abs(Math.round((now - newNow) / 1000) - min * 60);
      timerMin.textContent = min > 9 ? min : `0${min}`;
      timerSec.textContent = sec > 9 ? sec : `0${sec}`;

      sessionStorage.setItem('time', JSON.stringify(now - newNow));

      if (now <= newNow) {
        timerMin.textContent = `00`;
        timerSec.textContent = `00`;
        clearTimeout(intervalCount);

        timeIsUp();
      }
    }
  };

  window.addEventListener('DOMContentLoaded', onLoadTimer);

})();
