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
    let items = [{
      "id": 1,
      "imgPath": "img/cart-1.png",
      "name": "REBOX ZANE",
    }, {
      "id": 2,
      "imgPath": "img/cart-2.png",
      "name": "REBOX ZANE",
    }];
    const cartWrapper = document.querySelector(this.settings.cartWrapperSelector);
    const itemsAddButtonsSelector = document.querySelectorAll(this.settings.itemsAddButtonsSelector);
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
    //сначала очищаем содержимое HTML корзины
    cartElem.innerHTML = null;

    //проходим по массиву товаров и рендерим для них HTML и добавляем его в корзину
    items.forEach((item, i, arr) => {
      //создаем разделитель
      let hr = document.createElement("div");
      hr.style.backgroundColor = "rgba(237, 237, 237, 0.75)";
      hr.style.height = "1px";
      hr.style.marginTop = "16px";
      hr.style.marginBottom = "16px";
      //создаем див куда вкладываем картинку названием рейтинг, кнопку удаления и цену с количеством
      let prod = document.createElement("div");
      prod.style.width = "230px";
      prod.style.height = "85px";
      let itemImg = document.createElement("img");
      itemImg.src = item.imgPath;
      itemImg.maxWidth = "72px";
      itemImg.maxHeight = "85px";
      prod.append(itemImg);
      //добавляем получившийся элемент в корзину
      cartElem.append(prod);
      //добавляем разделитель снизу
      cartElem.append(hr);
    });
    this.cartButtons(cartElem, items);
  },
  cartButtons(cartElem, items) {
    //создаем кнопку checkout
    let buttonCheckout = document.createElement("button");
    buttonCheckout.style.marginTop = "16px";
    buttonCheckout.style.fontSize = "16px";
    buttonCheckout.style.color = "#f16d7f";
    buttonCheckout.style.border = "1px solid #f16d7f";
    buttonCheckout.textContent = "checkout";
    buttonCheckout.style.textTransform = "uppercase";
    buttonCheckout.style.width = "100%";
    buttonCheckout.style.height = "50px";
    buttonCheckout.style.outline = "none";
    buttonCheckout.style.cursor = "pointer";
    buttonCheckout.style.backgroundColor = "#fff";
    $(buttonCheckout).hover(function () {
      $(this).css("background-color", "#f16d7f");
      $(this).css("color", "#fff");
    }, function () {
      $(this).css("background-color", "#fff");
      $(this).css("color", "#f16d7f");
    });
    cartElem.append(buttonCheckout);

    //создаем кнопку go to cart
    let buttonGoToCart = document.createElement("button");
    buttonGoToCart.style.marginTop = "16px";
    buttonGoToCart.style.fontSize = "16px";
    buttonGoToCart.style.color = "#b1b1b1";
    buttonGoToCart.style.border = "1px solid #b1b1b1";
    buttonGoToCart.textContent = "go to cart";
    buttonGoToCart.style.textTransform = "uppercase";
    buttonGoToCart.style.width = "100%";
    buttonGoToCart.style.height = "50px";
    buttonGoToCart.style.outline = "none";
    buttonGoToCart.style.cursor = "pointer";
    buttonGoToCart.style.backgroundColor = "#fff";
    $(buttonGoToCart).hover(function () {
      $(this).css("background-color", "#b1b1b1");
      $(this).css("color", "#fff");
    }, function () {
      $(this).css("background-color", "#fff");
      $(this).css("color", "#b1b1b1");
    });
    cartElem.append(buttonGoToCart);
  },
  showEmptyCart(cartElem) {
    if (cartElem.children.length === 0) {
      cartElem.style.lineHeight = "85px";
      cartElem.style.fontSize = "14px";
      cartElem.style.textAlign = "center";
      cartElem.style.verticalAlign = "center";
      cartElem.style.backgroundColor = "#fff";
      cartElem.style.сolor = "#bbb";
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