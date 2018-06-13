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
    //Сначала очищаем содержимое HTML корзины
    cartElem.innerHTML = null;

    //Проходим по массиву товаров и рендерим для них HTML и добавляем его в корзину
    items.forEach((item, i, arr) => {
      //Создаем разделитель
      let hr = document.createElement("div");
      hr.style.backgroundColor = "rgba(237, 237, 237, 0.75)";
      hr.style.height = "1px";
      hr.style.marginTop = "16px";
      hr.style.marginBottom = "16px";
      //Создаем див куда вкладываем картинку названием рейтинг, кнопку удаления и цену с количеством
      let prod = document.createElement("div");
      prod.style.width = "230px";
      prod.style.height = "85px";
      let itemImg = document.createElement("img");
      itemImg.src = item.imgPath;
      itemImg.maxWidth = "72px";
      itemImg.maxHeight = "85px";
      prod.append(itemImg);
      //У первого элемента не добавляем разделитель сверху
      if (i > 0) cartElem.append(hr);
      //Добавляем получившийся элемент в корзину
      cartElem.append(prod);
    });
    this.cartButtons(cartElem, items);
  },
  cartButtons(cartElem, items) {
    let buttonCheckout = document.createElement("button");
    buttonCheckout.style.marginTop = "16px";
    buttonCheckout.style.marginBottom = "16px";
    buttonCheckout.style.fontSize = "16px";
    buttonCheckout.style.color = "#f16d7f";
    buttonCheckout.style.border = "1px solid #f16d7f";
    buttonCheckout.textContent = "checkout";
    buttonCheckout.style.textTransform = "uppercase";
    buttonCheckout.style.width = "100%";
    buttonCheckout.style.height = "50px";
    buttonCheckout.style.outline = "none";
    buttonCheckout.style.backgroundColor = "#fff";
    $(buttonCheckout).hover(function () {
      $(this).css("background-color", "#f16d7f");
      $(this).css("color", "#fff");
    }, function () {
      $(this).css("background-color", "#fff");
      $(this).css("color", "#f16d7f");
    });
cartElem.append(buttonCheckout);
    // @include font-change(#ffffff,
    //   16px,
    //   700);
    //   margin: 17px 0 0 0;
    //   background-color: #f16d7f;
    //   width: 273px;
    //   height: 50px;
    //   outline: none;
    //   border: none;
    //   text-transform: uppercase;
    //   &:hover {
    //     background-color: lighten(#f16d7f, 10)
    //   }
    //   &:active {
    //     background-color: darken(#f16d7f, 20)
    //   }

    let buttonGoToCart = document.createElement("button");
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