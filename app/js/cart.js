"use strict";

window.onload = () => cart.init();

const settings = {
  "cartWrapperSelector": '.cart__wrapper',
  "cartIconSelector": '.cart__icon',
  "cartItemsSelector": '.cart__items',
  "itemsAddButtonsSelector": '.product__add',
}

const cart = {
  settings,
  init() {
    const cartWrapper = document.querySelector(this.settings.cartWrapperSelector);
    const cartItems = document.querySelector(this.settings.cartItemsSelector);
    const itemsAddButtons = document.querySelectorAll(this.settings.cartItemsSelector);
    const itemsAddButtonsSelector = document.querySelectorAll(this.settings.itemsAddButtonsSelector);
    let items = [];
    this.addCartEventShow(cartWrapper, cartItems);
    this.addEventAddToCart(itemsAddButtonsSelector, items);
  },

  addCartEventShow(cartWrapper, cartItems) {
    cartWrapper.addEventListener('click', () => {
      if (cartItems.style.display === "block") {
        cartItems.style.display = "none";
      } else {
        cartItems.style.display = "block";
        this.showEmptyCart(cartItems);
      }
    });
  },

  showEmptyCart(cartItems) {
    if (cartItems.children.length === 0) {
      cartItems.style.lineHeight = "53px";
      cartItems.style.fontSize = "26px";
      cartItems.style.textAlign = "center";
      cartItems.style.verticalAlign = "center";
      cartItems.style.backgroundColor = "#fff";
      cartItems.style.сlor = "#bbb";
      cartItems.textContent = "Cart is empty";
    }
  },

  addEventAddToCart(itemsAddButtonsSelector, items) {
    itemsAddButtonsSelector.forEach(item => {
      item.addEventListener('click', (e) => {
        items.push(e.target);
        console.log(items);
      });
    })
  },
}
