"use strict";

window.onload = () => cart.init();

const settings = {
  'cartWrapperSelector': '.cart__wrapper',
  'cartWrapperClass': 'cart__wrapper',
  'cartIconSelector': '.cart__icon',
  'cartIconClass': 'cart__icon',
  'cartElemClass': 'cart__items',
  'itemsAddButtonsSelector': '.product__add',
}

const cart = {
  settings,
  // Инициализируем корзину
  init() {
    const cartWrapper = document.querySelector(this.settings.cartWrapperSelector);
    const itemsAddButtonsSelector = document.querySelectorAll(this.settings.itemsAddButtonsSelector);
    let items = [];
    this.createCartElem(cartWrapper, items);
    this.addToCartEvent(itemsAddButtonsSelector, items);
  },

  // Создаем элемент и добавляем его на страницу
  createCartElem(cartWrapper, items) {
    const cartElem = document.createElement('div');
    cartElem.classList.add(this.settings.cartElemClass);
    cartElem.style.display === "none";

    // Добавляем события на наведение мышкой для открытия коризны и клик снаружи элемента для закрытия
    this.addCartEventShow(cartWrapper, cartElem, items);

    // Добавляем корзину на страницу
    cartWrapper.parentElement.insertBefore(cartElem, cartWrapper.nextSibling);
  },

  addCartEventShow(cartWrapper, cartElem, items) {
    cartWrapper.addEventListener('mouseenter', () => {
      cartElem.style.display = "block";
      if (items.length === 0) {
        this.showEmptyCart(cartElem);
      } else {
        this.cartRender(cartElem, items);
      }
    });
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains(this.settings.cartElemClass) ||
        e.target.classList.contains(this.settings.cartIconClass)) {
        return;
      } else {
        cartElem.style.display = "none";
      }
    });
  },

  cartRender(cartElem, items) {
// console.log(items);

  },

  showEmptyCart(cartElem) {
    if (cartElem.children.length === 0) {
      cartElem.style.lineHeight = "53px";
      cartElem.style.fontSize = "26px";
      cartElem.style.textAlign = "center";
      cartElem.style.verticalAlign = "center";
      cartElem.style.backgroundColor = "#fff";
      cartElem.style.сlor = "#bbb";
      cartElem.textContent = "Cart is empty";
    }
  },

  addToCartEvent(itemsAddButtonsSelector, items) {
    itemsAddButtonsSelector.forEach(item => {
      item.addEventListener('click', (e) => {
        items.push(e.target.closest('.product'));
        console.log(items);
      });
    })
  },
}