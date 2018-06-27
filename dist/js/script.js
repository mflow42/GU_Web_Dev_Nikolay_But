"use strict";

const settingsCarousel = {
  idCarousel: 'carousel',
  carouselInnerClass: 'carousel__inner',
  currentImageClass: 'carousel__img',
  arrowPrevSpanClass: 'carousel__inner_left-arrow',
  arrowNextSpanClass: 'carousel__inner_right-arrow',
  arrowIconClass1: 'fas',
  arrowPrevIconClass2: 'fa-angle-left',
  arrowNextIconClass2: 'fa-angle-right',
  imagesJSON: 'json/carousel.json',
};

let carousel = {
  settingsCarousel,
  carouselEl: null,
  carouselInner: null,
  currentImg: null,
  images: [],
  currentImgSrc: null,
  currentImgIndex: 0,

  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settingsCarousel, userSettings);
    this.carouselEl = document.querySelector(`#${this.settingsCarousel.idCarousel}`);

    let xhrImgs = new XMLHttpRequest();
    let savedThis = this;

    //true - асинхронный
    xhrImgs.open('GET', this.settingsCarousel.imagesJSON, true);
    xhrImgs.onload = function () {
      if (this.status === 200) {
        let response = JSON.parse(xhrImgs.responseText);
        for (let key in response) {
          savedThis.images.push(response[key]);
        }
        savedThis.render();
      }
    };
    xhrImgs.send();
  },

  render() {
    this.carouselInner = document.createElement('div');
    this.carouselInner.classList.add(`${this.settingsCarousel.carouselInnerClass}`);

    this.carouselEl.append(this.carouselInner);

    this.currentImg = this.loadImage();
    this.createArrowLeft();
    this.createArrowRight();
  },
  /**
   * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере,
   * если текущая открытая картинка последняя.
   * @returns {Element} Следующую картинку от текущей открытой.
   */
  getNextImage() {
    // Если картинки кончились ставим индекс на 0
    if (this.images[this.currentImgIndex + 1] === undefined) {
      this.currentImgIndex = 0;
      this.currentImg.src = this.images[this.currentImgIndex].src;
      // Иначе показываем следующую картинку
    } else {
      this.currentImgIndex++;
      this.currentImg.src = this.images[this.currentImgIndex].src;
    }
  },

  /**
   * Возвращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере,
   * если текущая открытая картинка первая.
   * @returns {Element} Предыдущую картинку от текущей открытой.
   */
  getPrevImage() {
    // Если картинки кончились ставим индекс на 0
    if (this.images[this.currentImgIndex - 1] === undefined) {
      this.currentImgIndex = this.images.length - 1;
      this.currentImg.src = this.images[this.currentImgIndex].src;
      // Иначе показываем следующую картинку
    } else {
      this.currentImgIndex--;
      this.currentImg.src = this.images[this.currentImgIndex].src;
    }
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  loadImage() {
    let img = document.createElement('img');
    img.classList.add(this.settingsCarousel.currentImageClass);
    img.src = this.images[0].src;
    this.carouselInner.append(img);
    return img;
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createArrowLeft() {
    // Создаем левую картинку-стрелку слайдера, ставим им класс, src и добавляем в контейнер-обертку, навешиваем событие на клик.
    const carouselArrowElementPrev = document.createElement('span');
    carouselArrowElementPrev.classList.add(this.settingsCarousel.arrowPrevSpanClass);
    const carouselArrowElementPrevIcon = document.createElement('i');
    carouselArrowElementPrev.append(carouselArrowElementPrevIcon);
    carouselArrowElementPrevIcon.classList.add(this.settingsCarousel.arrowIconClass1);
    carouselArrowElementPrevIcon.classList.add(this.settingsCarousel.arrowPrevIconClass2);
    carouselArrowElementPrev.addEventListener('click', () => {
      this.getPrevImage(this.currentImgIndex, this.images);
    });
    this.carouselInner.append(carouselArrowElementPrev);
  },
  createArrowRight() {
    // Создаем правую картинку-стрелку слайдера, ставим им класс, src и добавляем в контейнер-обертку, навешиваем событие на клик.
    const carouselArrowElementNext = document.createElement('span');
    carouselArrowElementNext.classList.add(this.settingsCarousel.arrowNextSpanClass);
    const carouselArrowElementNextIcon = document.createElement('i');
    carouselArrowElementNext.append(carouselArrowElementNextIcon);
    carouselArrowElementNextIcon.classList.add(this.settingsCarousel.arrowIconClass1);
    carouselArrowElementNextIcon.classList.add(this.settingsCarousel.arrowNextIconClass2);
    carouselArrowElementNext.addEventListener('click', () => {
      this.getNextImage(this.currentImgIndex, this.images);
    });
    this.carouselInner.append(carouselArrowElementNext);
  },
};

// Инициализируем нашу галерею при загрузке страницы.
window.addEventListener('load', () => carousel.init());
"use strict";
//TODO comments чтобы не убирался статус "одобрено"


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
'use strict';

class Comment {
  constructor(id_comment, text, approved, classContainer, classContainerApproved, classMessage, classDelBtn, classApprovelBtn) {
    this.id_comment = id_comment;
    this.text = text;
    this.approved = approved;
    this.classContainer = classContainer;
    this.classContainerApproved = classContainerApproved;
    this.classMessage = classMessage;
    this.classDelBtn = classDelBtn;
    this.classApprovelBtn = classApprovelBtn;
  }

  render(commentEl) {
    const containerComment = document.createElement('div');
    containerComment.classList.add(this.classContainer);
    containerComment.dataset.id = this.id_comment;
    containerComment.dataset.approved = this.approved;

    const messageComment = document.createElement('p');
    messageComment.classList.add(this.classMessage);
    messageComment.textContent = this.text;

    const approveBtnComment = document.createElement('button');
    approveBtnComment.classList.add(this.classApprovelBtn);
    approveBtnComment.dataset.id = this.id_comment;
    approveBtnComment.dataset.type = 'approve';
    approveBtnComment.textContent = 'approve';



    const delBtnComment = document.createElement('button');
    delBtnComment.classList.add(this.classDelBtn);
    delBtnComment.dataset.id = this.id_comment;
    delBtnComment.dataset.type = 'delete';
    delBtnComment.textContent = 'delete';

    //добавляем текст коммента в обертку
    containerComment.append(messageComment);

    //Если коммент одобрен то не будем вставлять кнопку одобрения и навесим класс одобрения
    if (containerComment.dataset.approved === 'true') {
      containerComment.classList.add(this.classContainerApproved);
    } else if (containerComment.dataset.approved === 'false') {
      containerComment.append(approveBtnComment);
    }

    //Добавим кнопку удаления
    containerComment.append(delBtnComment);

    //вставляем обертку на страницу
    commentEl.append(containerComment);
  }
};
'use strict';

const settingsComments = {
  idContainer: 'comments',
  classCommentApproved: 'approved',
  urlGetAllComments: 'json/comment.list.json',
  urlDelComment: 'json/comment.delete.json',
  urlApprovalComment: 'json/comment.submit.json',
  urlAddComment: 'json/comment.add.json',
  classForm: `comments__form`,
  classTextarea: `comments__textarea`,
  classErrorTextarea: 'error_textarea',
  classErrorText: 'error_text',
  commentRegexp: '.',
  classFormSubmitBtn: `__submit`,
  classComment: '__comment',
  classCommentApproved: `approved`,
  classMessage: '__message',
  classBtnDelete: '__btn_delete',
  classBtnApprove: '__btn_approve',
};

const comments = {
  settingsComments,
  commentEl: null,
  comments: [],
  textAreaEl: null,
  formEl: null,

  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settingsComments, userSettings);
    this.commentEl = document.querySelector(`#${settingsComments.idContainer}`);
    this.commentEl.addEventListener('click', this.btnClickHandler.bind(this));
    let xhr = new XMLHttpRequest();
    let savedThis = this;
    //true - асинхронный
    xhr.open('GET', this.settingsComments.urlGetAllComments, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let response = JSON.parse(this.responseText);
        response.comments.forEach(el => {
          savedThis.comments.push(el);
        });
        savedThis.render(savedThis.commentEl, savedThis.comments, savedThis.settingsComments);
      }
    }
    xhr.send();
  },

  btnClickHandler(event) {
    if (event.target.dataset.type === 'delete') {
      this.delete(event.target);
    } else if (event.target.dataset.type === 'approve') {
      this.approve(event.target);
    } else if (event.target.dataset.type === 'add') {
      event.preventDefault();
      this.add(event.target);
    }
  },

  approve(target) {
    let savedThis = this;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', savedThis.settingsComments.urlApprovalComment, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let comment = target.closest(`.${savedThis.settingsComments.idContainer}${savedThis.settingsComments.classComment}`);
        comment.classList.add(savedThis.settingsComments.classCommentApproved);
        comment.dataset.approved = true;
        target.remove();
      }
    }
    xhr.send();
  },

  delete(target) {
    let savedThis = this;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', savedThis.settingsComments.urlDelComment, true);
    xhr.onload = function () {
      if (this.status === 200) {
        const comment = target.closest('.comments__comment');
        let foundIndexComment = savedThis.comments.findIndex((item) => item.id_comment === parseInt(comment.dataset.id));
        savedThis.comments.splice(foundIndexComment, 1);
        savedThis.render(savedThis.commentEl, savedThis.comments, savedThis.settingsComments);
      }
    }
    xhr.send();
  },

  makeForm() {
    //создаем обертку для модуля комментариев
    const containerForm = document.createElement('form');
    containerForm.classList.add(this.settingsComments.classForm);
    containerForm.name = 'commentForm';
    containerForm.id = 'commentFormId';
    containerForm.method = 'GET';
    containerForm.action = '#';
    //запомним созданный элемент в переменной
    this.formEl = containerForm;

    //создаем функцию отправки нового комментария
    const add = (event) => {
      const showErrorMessage = (textArea) => {
        //проверяем создана и висит ли уже ошибка
        if (textArea.parentElement.querySelector(`.${this.settingsComments.classErrorText}`)) return;
        //добавляем стиль ошибки на textarea
        textArea.classList.add(this.settingsComments.classErrorTextarea);
        //создаем span
        const hint = document.createElement('span');
        //вкладываем в него текст
        hint.textContent = 'Text must contain at least 1 character';
        //добавляем класс
        hint.classList.add(this.settingsComments.classErrorText)
        //вставляем элемент на страницу
        textArea.parentElement.append(hint);
      };

      const isError = (textArea, userRegexp) => {
        //создаем регулярку из переданного в настройках
        const regexp = new RegExp(`${userRegexp}`, `gi`);
        //возвращаем результат проверки - если все ок, то false, если проверка не прошла - true
        return !regexp.test(textArea.value);
      };
      //отменяем отправку формы по умолчанию чтобы страница не перезагружалась
      event.preventDefault();
      //проверим на наличие ошибок textarea (пока просто должен быть хотя бы 1 символ)
      if (isError(this.textAreaEl, this.settingsComments.commentRegexp)) {
        return showErrorMessage(this.textAreaEl);
      }
      let savedThis = this;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', savedThis.settingsComments.urlAddComment, true);
      xhr.onload = function () {
        if (this.status === 200) {
          console.log(JSON.parse(this.response));
          //как заглушка просто добавляем в массив с комментами новый коммент
          savedThis.comments.push({
            //в айди запишем текущую дату, потом при большой нагрузке можно добавлять после нее имя пользователя для пущей
            //уникальности
            id_comment: Date.now(),
            text: savedThis.textAreaEl.value,
          });
          savedThis.render(savedThis.commentEl, savedThis.comments, savedThis.settingsComments);
        }
      };
      xhr.send();
    };

    //навешиваем обработчик события отправки формы
    containerForm.addEventListener('submit', add)

    //создаем заголовок h3
    const formTitle = document.createElement('h3');
    formTitle.classList.add(this.settingsComments.classFormTitle);
    formTitle.textContent = 'Add comment:';

    //создаем лейбл для textarea
    const inputTextAreaLabel = document.createElement('label');
    inputTextAreaLabel.for = 'commentFormName';
    inputTextAreaLabel.textContent = `input here and click 'submit' button`;

    //создаем textarea
    const inputTextArea = document.createElement('textarea');
    inputTextArea.name = 'commentFormName';
    inputTextArea.classList.add(this.settingsComments.classTextarea);
    this.textAreaEl = inputTextArea;

    const textareaHandleHeight = (inputTextArea, rowsDefault) => {
      // Установим дефолтную высоту textarea
      inputTextArea.rows = rowsDefault;
      //создадим метод, который
      const stretchHeight = function () {
        let counter = this.value.split("\n").length;
        if (counter <= rowsDefault) return;
        else if (counter > rowsDefault) this.rows = counter;
      };
      //повесим обработчик на отслеживание првышения высоты по умолчанию и если да то увеличиваем rows у textarea
      inputTextArea.addEventListener('input', stretchHeight);
    };

    //применяем метод которые увеличивает высоту и задает высоту по умолчанию
    textareaHandleHeight(inputTextArea, 5);

    //создаем кнопку отправки комментария
    const submitBtn = document.createElement('button');
    submitBtn.classList.add(`${this.settingsComments.idContainer}${this.settingsComments.classFormSubmitBtn}`);
    submitBtn.textContent = 'Submit comment';

    //вставляем все элементы в обертку
    containerForm.append(formTitle);
    containerForm.append(inputTextAreaLabel);
    containerForm.append(inputTextArea);
    containerForm.append(submitBtn);
    //добавляем обертку на страницу
    this.commentEl.append(containerForm);
  },



  render(commentEl, comments, settingsComments) {
    //предварительно очистим внутренности - нужно для перерисовки
    commentEl.innerHTML = '';

    if (comments.length > 0) {
      for (const obj of comments) {
        const comment = new Comment(
          obj.id_comment,
          obj.text,
          obj.approved,
          `${settingsComments.idContainer}${settingsComments.classComment}`,
          `${settingsComments.classCommentApproved}`,
          `${settingsComments.idContainer}${settingsComments.classMessage}`,
          `${settingsComments.idContainer}${settingsComments.classBtnDelete}`,
          `${settingsComments.idContainer}${settingsComments.classBtnApprove}`);
        comment.render(commentEl);
      }
    }
    this.makeForm();
  },
};

window.addEventListener('load', () => comments.init());
'use strict';
// "id": 1,
//       "imgPath": "img/cart-1.png",
//       "name": "REBOX ZANE1",
//       "rating": 4,
//       "price": 52,
class Product {
  constructor(id, imgPath, name, rating, price) {
    id;
    imgPath;
    name;
    rating;
    price;
  }

  render(cartEl) {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add(this.classContainer);
    containerProduct.dataset.id = this.id_comment;
    containerProduct.dataset.approved = this.approved;

    const messageComment = document.createElement('p');
    messageComment.classList.add(this.classMessage);
    messageComment.textContent = this.text;

    const approveBtnComment = document.createElement('button');
    approveBtnComment.classList.add(this.classApprovelBtn);
    approveBtnComment.dataset.id = this.id_comment;
    approveBtnComment.dataset.type = 'approve';
    approveBtnComment.textContent = 'approve';



    const delBtnComment = document.createElement('button');
    delBtnComment.classList.add(this.classDelBtn);
    delBtnComment.dataset.id = this.id_comment;
    delBtnComment.dataset.type = 'delete';
    delBtnComment.textContent = 'delete';

    //добавляем текст коммента в обертку
    containerProduct.append(messageComment);

    //Если коммент одобрен то не будем вставлять кнопку одобрения и навесим класс одобрения
    if (containerProduct.dataset.approved === 'true') {
      containerProduct.classList.add(this.classContainerApproved);
    } else if (containerProduct.dataset.approved === 'false') {
      containerProduct.append(approveBtnComment);
    }

    //Добавим кнопку удаления
    containerProduct.append(delBtnComment);

    //вставляем обертку на страницу
    cartEl.append(containerProduct);
  }
};