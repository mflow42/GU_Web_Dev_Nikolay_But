"use strict";
//TODO доделать

const settingsCart = {
  'cartElSelector': 'cart',
  'cartMobElSelector': 'cart-mobile',
  'cartIconSelector': 'cart__icon',
  'cartElemClass': 'cart__items',
  'cartImgClass': 'cart__img',
  'cartProdClass': 'cart__prod',
  'cartEmptyClass': 'cart__empty',
  'cartNameClass': 'cart__name',
  'cartStarsClass': 'cart__stars',
  'cartTotalClass': 'cart__total',
  'cartLineClass': 'cart__line',
  'cartBtnCloseClass': 'cart__btn_close',
  'cartTextPinkClass': 'cart__text_pink',
  'cartTextTechClass': 'cart__text_tech',
  'cartTextWrapperClass': 'cart__text_wrapper',
  'cartButtonCheckoutClassEnabled': 'cart__btn_pink',
  'cartButtonCheckoutClassDisabled': 'cart__btn_disabled',
  'cartButtonGoToCartClassEnabled': 'cart__btn_grey',
  'cartButtonDisabled': 'cart__btn_disabled',
  'itemInShopSelector': 'product',
  'itemsAddButtonSelector': 'product__add',
  'cartBadge': 'cart__icon_badge',
}

const cart = {
  settingsCart,
  total: 0,
  cartEl: null,
  cartContainer: null,
  cartMobEl: null,
  items: [],
  itemsInShop: [],
  cartBadge: null,

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
    this.cartBadge = document.querySelectorAll(`.${this.settingsCart.cartBadge}`);

    //если клик вне корзины, то поставить ей display="none"
    document.body.addEventListener('click', (event) => {
      //возвращаем true если видим "#cart" на всплытии - усложнили из-за path на иконке FontAwesome
      const isItCart = (event) => {
        return (event.target.closest('#cart') || //если находим вверху элемент корзины
          event.srcElement.tagName.toUpperCase() === 'PATH' || //если находим вверху элемент PATH
          event.srcElement.tagName === 'svg' || //если находим вверху элемент SVG
          event.target.closest('.product__add')); //если находим вверху кнопку добавления в корзину
      };
      //проверяем если это не корзина, то ставим display="none", то есть убираем со страницы
      if (!isItCart(event)) {
        this.cartContainer.style.display = "none";
      }
    });

    const showCart = () => {
      //если корзина уже показывается, то не тратим ресурсы и не перерисовываем ее заново
      if (this.cartContainer.style.display === "block") return;
      //если ее нет, то показываем
      else {
        this.cartContainer.style.display = "block";
        this.render();
      }
    };

    //навешиваем на иконку событие показа корзины при наведении
    this.cartEl.addEventListener('mouseenter', showCart);
    //TODO сделать отображение в мобильной версии
    this.cartMobEl.addEventListener('mouseenter', showCart);

    this.createCartElem(this.cartEl, this.items);
    this.addToCartEvent(this.itemsInShop, this.items);
  },
  // Создаем элемент и добавляем его на страницу
  createCartElem() {
    this.cartContainer = document.createElement('div');
    this.cartContainer.classList.add(this.settingsCart.cartElemClass);
    this.cartContainer.style.display === "none";

    // Добавляем корзину на страницу
    // this.cartEl.parentElement.insertBefore(this.cartContainer, this.cartEl.nextSibling);
    this.cartEl.append(this.cartContainer);
  },

  addToCartEvent(itemsInShop, items) {
    itemsInShop.forEach(item => {
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
              this.cartContainer.style.display = "block";
              this.render();
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
          this.cartContainer.style.display = "block";
          this.render();
        }
      });
    })
  },

  countTotal() {
    this.total = 0;
    if (this.items.length === 0) {
      this.total = 0;
    } else {
      this.items.forEach(item => {
        let sum = item.qty * item.price;
        this.total += sum;
      });
    }
  },

  makeTotalElem() {
    const wrapper = document.createElement("div");
    wrapper.classList.add(this.settingsCart.cartTotalClass);

    const text = document.createElement("span");
    // text.width = "50%";
    text.textContent = "TOTAL";
    wrapper.append(text);

    const currency = document.createElement('span');
    const totalCurrency = document.createElement("span");
    totalCurrency.textContent = '$';
    const total = document.createElement("span");
    total.textContent = this.total.toFixed(2);
    currency.append(totalCurrency);
    currency.append(total);

    wrapper.append(currency);

    this.cartContainer.append(wrapper);
  },

  cartButtons(trigger) {
    //создаем кнопку checkout
    let buttonCheckout = document.createElement("a");
    buttonCheckout.classList.add(this.settingsCart.cartButtonCheckoutClassEnabled);
    if (trigger === "disabled") buttonCheckout.classList.add(this.settingsCart.cartButtonDisabled);
    buttonCheckout.textContent = "checkout";
    buttonCheckout.href = 'checkout.html';
    this.cartContainer.append(buttonCheckout);

    //создаем кнопку go to cart
    let buttonGoToCart = document.createElement("a");
    buttonGoToCart.classList.add(this.settingsCart.cartButtonGoToCartClassEnabled);
    if (trigger === "disabled") buttonGoToCart.classList.add(this.settingsCart.cartButtonDisabled);
    buttonGoToCart.textContent = "go to cart";
    buttonGoToCart.href = 'shoppingcart.html';
    this.cartContainer.append(buttonGoToCart);
  },


  removeFromCartEvent(removeBtn) {
    const removeProduct = () => {
      this.items.forEach((item, i) => {
        if (item.id === removeBtn.dataset.id) {
          this.items.splice(i, 1);
          //отрисовываем корзину чтобы показать ее без удаленного предмета
          this.render();
        }
      })
      removeBtn.closest('.cart__prod').remove();
    };

    removeBtn.addEventListener('click', removeProduct)
  },

  render() {
    //сначала очищаем содержимое HTML корзины
    this.cartContainer.innerHTML = '';

    //если в корзине есть вещи, то проходим по ним, генерируя HTML разметку
    if (this.items.length > 0) {
      //проходим по массиву товаров и рендерим для них HTML и добавляем его в корзину
      this.items.forEach(item => {
        //создаем разделитель
        const line = document.createElement("div");
        line.classList.add(this.settingsCart.cartLineClass);

        //создаем див куда вкладываем картинку названием рейтинг, кнопку удаления и цену с количеством
        const prod = document.createElement("div");
        prod.classList.add(this.settingsCart.cartProdClass);

        const itemImg = document.createElement("img");
        itemImg.src = item.imgPath;
        itemImg.classList.add(this.settingsCart.cartImgClass);
        prod.append(itemImg);

        //добавляем элемент с названием товара
        const name = document.createElement("p");
        name.classList.add(this.settingsCart.cartNameClass);
        name.textContent = item.name;
        prod.append(name);

        //создаем див, куда будем добавлять звезды
        const stars = document.createElement("div");
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
        const priceDiv = document.createElement("div");
        priceDiv.classList.add(this.settingsCart.cartTextWrapperClass);

        //добавляем спан с количеством
        const qty = document.createElement("p");
        qty.textContent = item.qty;
        qty.classList.add(this.settingsCart.cartTextPinkClass);
        priceDiv.append(qty);

        //добавляем технический текст "&nbsp;x&nbsp;$"
        const techText = document.createElement("p");
        techText.classList.add(this.settingsCart.cartTextTechClass);
        techText.innerHTML += "&nbsp;&nbsp;x&nbsp;&nbsp;$";
        priceDiv.append(techText);
        prod.append(priceDiv);

        //добавляем цену
        const price = document.createElement("p");
        price.classList.add(this.settingsCart.cartTextTechClass);
        price.textContent = item.price;
        priceDiv.append(price);
        prod.append(priceDiv);

        //добавляем спан с кнопкой-крестиком удаления
        const removeBtn = document.createElement("p");
        removeBtn.innerHTML += `<i class="fas fa-times-circle"></i>`;
        removeBtn.classList.add(this.settingsCart.cartBtnCloseClass);
        removeBtn.dataset.id = item.id;
        this.removeFromCartEvent(removeBtn);

        prod.append(removeBtn);

        //добавляем получившийся элемент в корзину
        this.cartContainer.append(prod);
        //добавляем разделитель снизу
        this.cartContainer.append(line);
      });
      this.countTotal();
      this.makeTotalElem();
      this.cartButtons("enabled");
    } else { //если вещей нет, то показываем пустую корзину
      //создаем див товара, но вкладываем в него текст "Your cart is empty"
      const prod = document.createElement("div");
      prod.classList.add(this.settingsCart.cartProdClass);
      prod.classList.add(this.settingsCart.cartEmptyClass);
      prod.style.textAlign = "center";
      prod.style.verticalAlign = "center";
      prod.textContent = "Your cart is empty"
      this.cartContainer.append(prod);
      this.cartButtons("disabled");
    }
  },
}

window.addEventListener('load', () => cart.init());