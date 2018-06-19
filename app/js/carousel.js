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
const settings = {
  carouselSelector: null,
  carouselInnerClass: null,
  currentImageClass: null,
  arrowPrevSpanClass: null,
  arrowNextSpanClass: null,
  arrowIconClass1: null,
  arrowPrevIconClass2: null,
  arrowNextIconClass2: null,
  imagesJSON: null,
};


const gallery = {
  settings,
  images: [],
  currentImgSrc: 'img/carousel/carousel-img1.jpg',
  currentImgIndex: 0,
  carousel: null,
  carouselInner: null,
  currentImg: null,

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */
  buildHtml() {
    this.carousel = document.querySelector(this.settings.carouselSelector);
    this.carouselInner = document.createElement('div');
    this.carouselInner.classList.add(this.settings.carouselInnerClass)
    this.carousel.append(this.carouselInner);
    this.currentImg = this.loadImage();
  },

  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);
    let xhrImgs = new XMLHttpRequest();
    xhrImgs.open('GET', this.settings.imagesJSON, false);
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

  /**
   * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере,
   * если текущая открытая картинка последняя.
   * @returns {Element} Следующую картинку от текущей открытой.
   */
  getNextImage() {
    // Если картинки кончились ставим индекс на 0
    console.log(this.images);

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
    img.classList.add(this.settings.currentImageClass);
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
    const galleryArrowElementPrev = document.createElement('span');
    galleryArrowElementPrev.classList.add(this.settings.arrowPrevSpanClass);
    const galleryArrowElementPrevIcon = document.createElement('i');
    galleryArrowElementPrev.append(galleryArrowElementPrevIcon);
    galleryArrowElementPrevIcon.classList.add(this.settings.arrowIconClass1);
    galleryArrowElementPrevIcon.classList.add(this.settings.arrowPrevIconClass2);
    galleryArrowElementPrev.addEventListener('click', () => {
      this.getPrevImage(this.currentImgIndex, this.images);
    });
    this.carouselInner.append(galleryArrowElementPrev);
  },
  createArrowRight() {
    // Создаем правую картинку-стрелку слайдера, ставим им класс, src и добавляем в контейнер-обертку, навешиваем событие на клик.
    const galleryArrowElementNext = document.createElement('span');
    galleryArrowElementNext.classList.add(this.settings.arrowNextSpanClass);
    const galleryArrowElementNextIcon = document.createElement('i');
    galleryArrowElementNext.append(galleryArrowElementNextIcon);
    galleryArrowElementNextIcon.classList.add(this.settings.arrowIconClass1);
    galleryArrowElementNextIcon.classList.add(this.settings.arrowNextIconClass2);
    galleryArrowElementNext.addEventListener('click', () => {
      this.getNextImage(this.currentImgIndex, this.images);
    });
    this.carouselInner.append(galleryArrowElementNext);
  },
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({
  carouselSelector: '.carousel',
  carouselInnerClass: 'carousel__inner',
  currentImageClass: 'carousel__img',
  arrowPrevSpanClass: 'carousel__inner_left-arrow',
  arrowNextSpanClass: 'carousel__inner_right-arrow',
  arrowIconClass1: 'fas',
  arrowPrevIconClass2: 'fa-angle-left',
  arrowNextIconClass2: 'fa-angle-right',
  imagesJSON: 'json/carousel.json',
});