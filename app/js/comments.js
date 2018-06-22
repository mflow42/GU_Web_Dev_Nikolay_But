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
    Object.assign(settingsComments, userSettings);
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
        savedThis.render();
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
        savedThis.render();
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
          savedThis.render();
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



  render() {
    //предварительно очистим внутренности - нужно для перерисовки
    this.commentEl.innerHTML = '';

    if (this.comments.length > 0) {
      for (const obj of this.comments) {
        const comment = new Comment(
          obj.id_comment,
          obj.text,
          obj.approved,
          `${this.settingsComments.idContainer}${this.settingsComments.classComment}`,
          `${this.settingsComments.classCommentApproved}`,
          `${this.settingsComments.idContainer}${this.settingsComments.classMessage}`,
          `${this.settingsComments.idContainer}${this.settingsComments.classBtnDelete}`,
          `${this.settingsComments.idContainer}${this.settingsComments.classBtnApprove}`);
        comment.render(this.commentEl);
      }
    }
    this.makeForm();
  },
};

window.onload = () => comments.init();