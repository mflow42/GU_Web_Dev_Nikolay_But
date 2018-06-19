"use strict";

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.carouselSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.currentImageSelector Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 * @property {string} settings.openedImageArrowPrevIcon Путь до левой картинки-стрелки слайдера.
 * @property {string} settings.openedImageArrowPrevClass Класс левой картинки-стрелки слайдера.
 * @property {string} settings.openedImageArrowNextIcon Путь до правой картинки-стрелки слайдера.
 * @property {string} settings.openedImageArrowNextClass Класс правой картинки-стрелки слайдера.
 */
const settingsCarousel = {
  carouselSelector: '.carousel',
  carouselInnerClass: 'carousel__inner',
  currentImageClass: 'carousel__img',
  arrowPrevSpanClass: 'carousel__inner_left-arrow',
  arrowNextSpanClass: 'carousel__inner_right-arrow',
  arrowIconClass1: 'fas',
  arrowPrevIconClass2: 'fa-angle-left',
  arrowNextIconClass2: 'fa-angle-right',
  imagesJSON: 'json/carousel.json',
};

const carousel = {
  settingsCarousel,
  images: [],
  currentImgSrc: 'img/carousel/carousel-img1.jpg',
  currentImgIndex: 0,
  carouselEl: null,
  carouselInner: null,
  currentImg: null,

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */


  init(userSettings = {}) {
    console.log('asd');

    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(settingsCarousel, userSettings);

    let xhrImgs = new XMLHttpRequest();
    xhrImgs.open('GET', this.settingsCarousel.imagesJSON, false);
    let savedThis = this;
    xhrImgs.onload = function () {
      if (this.status === 200) {
        let response = JSON.parse(xhrImgs.responseText);
        for (let key in response) {
          savedThis.images.push(response[key]);
        }
      }
    };
    xhrImgs.send();

    this.buildHtml();
    this.createArrowLeft();
    this.createArrowRight();
  },

  buildHtml() {
    this.carouselEl = document.querySelector(this.settingsCarousel.carouselSelector);
    this.carouselInner = document.createElement('div');
    this.carouselInner.classList.add(this.settingsCarousel.carouselInnerClass)
    this.carouselEl.append(this.carouselInner);
    this.currentImg = this.loadImage();
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
window.onload = () => carousel.init();