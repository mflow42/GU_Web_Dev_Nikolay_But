"use strict";


const settingsCart = {
  'cartWrapperSelector': 'cart__wrapper',
  'cartIconSelector': 'cart__icon',
  'cartElemClass': 'cart__items',
  'cartImgClass': 'cart__img',
  'cartProdClass': 'cart__prod',
  'cartNameClass': 'cart__name',
  'cartStarsClass': 'cart__stars',
  'cartTotalClass': 'cart__total',
  'cartBtnCloseClass': 'cart__btn_close',
  'cartTextPinkClass': 'cart__text_pink',
  'cartTextTechClass': 'cart__text_tech',
  'cartTextWrapperClass': 'cart__text_wrapper',
  'cartButtonCheckoutClass': 'cart__btn_pink',
  'cartButtonGoToCartClass': 'cart__btn_grey',
  'itemsAddButtonsSelector': 'product__add',
}

const cart = {
  settingsCart,
  total: 0,
  // Инициализируем корзину
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settingsCart, userSettings);

    //создадим заглушку из товаров
    let items = [{
      "id": 1,
      "imgPath": "img/cart-1.png",
      "name": "REBOX ZANE1",
      "rating": 4,
      "price": 52,
      "qty": 1,
    }, {
      "id": 2,
      "imgPath": "img/cart-2.png",
      "name": "REBOX ZANE2",
      "rating": 4,
      "price": 52,
      "qty": 2,
    }];
    const cartWrapper = document.querySelector(`#${this.settings.cartWrapperSelector}`);
    const itemsAddButtonsSelector = document.querySelectorAll(`.${this.settings.itemsAddButtonsSelector}`);
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
      if (e.target.closest(`.${this.settings.cartElemClass}`) ||
        e.target.closest(`.${this.settings.cartIconSelector}`)) {
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
      prod.classList.add(this.settings.cartProdClass);
      let itemImg = document.createElement("img");
      itemImg.src = item.imgPath;
      itemImg.classList.add(this.settings.cartImgClass);
      prod.append(itemImg);

      //добавляем элемент с названием товара
      let name = document.createElement("p");
      name.classList.add(this.settings.cartNameClass);
      name.textContent = item.name;
      prod.append(name);

      //создаем див, куда будем добавлять звезды
      let stars = document.createElement("div");
      stars.classList.add(this.settings.cartStarsClass)
      for (let i = 0; i < 5; i++) {
        if (i < item.rating) {
          stars.innerHTML += `<i class="fas fa-star cart__star"></i>`;
        } else {
          stars.innerHTML += `<i class="far fa-star cart__star"></i>`;
        }
      }
      prod.append(stars);

      //создаем обертку под текст количества и цены
      let priceDiv = document.createElement("div");
      priceDiv.classList.add(this.settings.cartTextWrapperClass);

      //добавляем спан с количеством
      let qty = document.createElement("p");
      qty.textContent = item.qty;
      qty.classList.add(this.settings.cartTextPinkClass);
      priceDiv.append(qty);

      //добавляем технический текст "&nbsp;x&nbsp;$"
      let techText = document.createElement("p");
      techText.classList.add(this.settings.cartTextTechClass);
      techText.innerHTML += "&nbsp;&nbsp;x&nbsp;&nbsp;$";
      priceDiv.append(techText);
      prod.append(priceDiv);

      //добавляем цену
      let price = document.createElement("p");
      price.classList.add(this.settings.cartTextTechClass);
      price.textContent = item.price;
      priceDiv.append(price);
      prod.append(priceDiv);

      //добавляем спан с кнопкой-крестиком удаления
      let closeBtn = document.createElement("p");
      closeBtn.innerHTML += `<i class="fas fa-times-circle"></i>`;
      closeBtn.classList.add(this.settings.cartBtnCloseClass);
      prod.append(closeBtn);

      //добавляем получившийся элемент в корзину
      cartElem.append(prod);
      //добавляем разделитель снизу
      cartElem.append(hr);
    });
    this.countTotal(items);
    this.makeTotalElem(cartElem);
    this.cartButtons(cartElem, items);
  },

  countTotal(items) {
    this.total = 0;
    items.forEach(item => {
      let sum = item.qty * item.price;
      this.total += sum;
    });
  },

  makeTotalElem(cartElem) {
    let wrapper = document.createElement("div");
    wrapper.classList.add(this.settings.cartTotalClass);
    let text = document.createElement("div");
    text.width = "50%";
    text.textContent = "TOTAL";
    wrapper.append(text);
    let total = document.createElement("div");
    total.width = "50%";
    total.textContent = this.total;
    wrapper.append(total);
    cartElem.append(wrapper);
  },

  cartButtons(cartElem, items) {
    //создаем кнопку checkout
    let buttonCheckout = document.createElement("button");
    buttonCheckout.classList.add(this.settings.cartButtonCheckoutClass);
    buttonCheckout.textContent = "checkout";
    cartElem.append(buttonCheckout);

    //создаем кнопку go to cart
    let buttonGoToCart = document.createElement("button");
    buttonGoToCart.classList.add(this.settings.cartButtonGoToCartClass);
    buttonGoToCart.textContent = "go to cart";
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

window.addEventListener('load', () => cart.init());