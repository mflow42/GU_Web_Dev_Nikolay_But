"use strict";


const settingsCart = {
  'cartElSelector': 'cart',
  'cartMobElSelector': 'cart-mobile',
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
  'itemsAddButtonSelector': 'product__add',
  'itemInShopSelector': 'product',
}

const cart = {
  settingsCart,
  total: 0,
  cartEl: null,
  cartContainer: null,
  cartMobEl: null,
  items: [],
  itemsInShop: [],

  // Инициализируем корзину
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settingsCart, userSettings);

    //создадим заглушку из товаров
    this.items = [{
      "id": "0001",
      "imgPath": "img/cart-1.png",
      "name": "REBOX ZANE1",
      "rating": 4,
      "price": 48,
      "qty": 1,
    }, {
      "id": "0002",
      "imgPath": "img/cart-2.png",
      "name": "REBOX ZANE2",
      "rating": 4,
      "price": 49,
      "qty": 2,
    }];

    this.cartEl = document.querySelector(`#${this.settingsCart.cartElSelector}`);
    this.cartMobEl = document.querySelector(`#${this.settingsCart.cartMobElSelector}`);
    this.itemsInShop = document.querySelectorAll(`.${this.settingsCart.itemInShopSelector}`);

    this.createCartElem(this.cartEl, this.items);
    this.addToCartEvent(this.itemsInShop, this.items);
  },

  // Создаем элемент и добавляем его на страницу
  createCartElem(cartEl, items) {
    this.cartContainer = document.createElement('div');
    this.cartContainer.classList.add(this.settingsCart.cartElemClass);
    this.cartContainer.style.display === "none";

    // Добавляем события на наведение мышкой для открытия коризны и клик снаружи элемента для закрытия
    this.addCartEventShow(cartEl, this.cartContainer, items);

    // Добавляем корзину на страницу
    this.cartEl.parentElement.insertBefore(this.cartContainer, this.cartEl.nextSibling);
  },

  addCartEventShow() {
    const showCart = () => {
      this.cartContainer.style.display = "block";
      if (this.items.length === 0) {
        this.showEmptyCart(this.cartContainer);
      } else {
        this.render(this.cartContainer, this.items);
      }
    };

    document.body.addEventListener('click', (event) => {
      if (event.target.closest(`.${this.settingsCart.cartElemClass}`) ||
        event.target.closest(`.${this.settingsCart.cartIconSelector}`)) {
        return;
      } else {
        this.cartContainer.style.display = "none";
      }
    });

    this.cartEl.addEventListener('mouseenter', showCart);

    //TODO сделать отображение в мобильной версии
    this.cartMobEl.addEventListener('mouseenter', showCart);
  },

  render(cartEl, items) {
    console.log(cartEl);

    //сначала очищаем содержимое HTML корзины
    cartEl.innerHTML = '';

    if (items.length > 0) {

      //проходим по массиву товаров и рендерим для них HTML и добавляем его в корзину
      items.forEach(item => {
        //создаем разделитель
        let hr = document.createElement("div");
        hr.style.backgroundColor = "rgba(237, 237, 237, 0.75)";
        hr.style.height = "1px";
        hr.style.marginTop = "16px";
        hr.style.marginBottom = "16px";
        //создаем див куда вкладываем картинку названием рейтинг, кнопку удаления и цену с количеством
        let prod = document.createElement("div");
        prod.classList.add(this.settingsCart.cartProdClass);
        let itemImg = document.createElement("img");
        itemImg.src = item.imgPath;
        itemImg.classList.add(this.settingsCart.cartImgClass);
        prod.append(itemImg);

        //добавляем элемент с названием товара
        let name = document.createElement("p");
        name.classList.add(this.settingsCart.cartNameClass);
        name.textContent = item.name;
        prod.append(name);

        //создаем див, куда будем добавлять звезды
        let stars = document.createElement("div");
        stars.classList.add(this.settingsCart.cartStarsClass)
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
        priceDiv.classList.add(this.settingsCart.cartTextWrapperClass);

        //добавляем спан с количеством
        let qty = document.createElement("p");
        qty.textContent = item.qty;
        qty.classList.add(this.settingsCart.cartTextPinkClass);
        priceDiv.append(qty);

        //добавляем технический текст "&nbsp;x&nbsp;$"
        let techText = document.createElement("p");
        techText.classList.add(this.settingsCart.cartTextTechClass);
        techText.innerHTML += "&nbsp;&nbsp;x&nbsp;&nbsp;$";
        priceDiv.append(techText);
        prod.append(priceDiv);

        //добавляем цену
        let price = document.createElement("p");
        price.classList.add(this.settingsCart.cartTextTechClass);
        price.textContent = item.price;
        priceDiv.append(price);
        prod.append(priceDiv);

        //добавляем спан с кнопкой-крестиком удаления
        let closeBtn = document.createElement("p");
        closeBtn.innerHTML += `<i class="fas fa-times-circle"></i>`;
        closeBtn.classList.add(this.settingsCart.cartBtnCloseClass);
        prod.append(closeBtn);

        //добавляем получившийся элемент в корзину
        cartEl.append(prod);
        //добавляем разделитель снизу
        cartEl.append(hr);
      });
      this.countTotal(items);
      this.makeTotalElem(cartEl);
      this.cartButtons(cartEl, items);
    }
    console.log(cartEl);

  },

  countTotal(items) {
    this.total = 0;
    items.forEach(item => {
      let sum = item.qty * item.price;
      this.total += sum;
    });
  },

  makeTotalElem(cartEl) {
    let wrapper = document.createElement("div");
    wrapper.classList.add(this.settingsCart.cartTotalClass);
    let text = document.createElement("div");
    text.width = "50%";
    text.textContent = "TOTAL";
    wrapper.append(text);
    let total = document.createElement("div");
    total.width = "50%";
    total.textContent = this.total;
    wrapper.append(total);
    cartEl.append(wrapper);
  },

  cartButtons(cartEl, items) {
    //создаем кнопку checkout
    let buttonCheckout = document.createElement("button");
    buttonCheckout.classList.add(this.settingsCart.cartButtonCheckoutClass);
    buttonCheckout.textContent = "checkout";
    cartEl.append(buttonCheckout);

    //создаем кнопку go to cart
    let buttonGoToCart = document.createElement("button");
    buttonGoToCart.classList.add(this.settingsCart.cartButtonGoToCartClass);
    buttonGoToCart.textContent = "go to cart";
    cartEl.append(buttonGoToCart);
  },
  showEmptyCart(cartEl) {
    if (cartEl.children.length === 0) {
      cartEl.style.lineHeight = "85px";
      cartEl.style.fontSize = "14px";
      cartEl.style.textAlign = "center";
      cartEl.style.verticalAlign = "center";
      cartEl.style.backgroundColor = "#fff";
      cartEl.style.сolor = "#bbb";
      cartEl.textContent = "Cart is empty";
    }
  },

  addToCartEvent(itemsInShop, items) {
    itemsInShop.forEach((item, i) => {
      //находим кнопку внутри div product
      const buttonAddToCart = item.querySelector(`.${this.settingsCart.itemsAddButtonSelector}`)
      //навешиваем событие добавления товара в корзину
      buttonAddToCart.addEventListener('click', () => {
        //пройдемся по массиву методом some() чтобы узнать есть ли в корзине добавляемый товар
        if (this.items.some((cartItem) => {
            //если в корзине уже есть такой товар
            if (cartItem.id === item.dataset.id) {
              //то вместо добавления новой строки увеличим количество
              cartItem.qty++;
            }
            //должны вернуть true чтобы сработал метод some();
            return cartItem.id === item.dataset.id;
          })) {
          // some code
        } else {
          items.push({
            id: item.dataset.id,
            imgPath: item.querySelector('.product__image').src,
            name: item.dataset.name,
            price: parseInt(item.dataset.price),
            qty: 1,
            rating: item.dataset.rating,
          });
        }
        console.log(this.items);

      });
    })
  },
}

window.addEventListener('load', () => cart.init());