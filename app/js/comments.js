'use strict';

const settingsComments = {
  idContainer: 'comments',
  classCommentApproved: 'approved',
  urlGetAllComments: 'json/comment.list.json',
  urlDelComment: 'json/comment.delete.json',
  urlApprovalComment: 'json/comment.submit.json',
  urlAddComment: 'json/comment.add.json',
};

const comments = {
  settingsComments,
  commentEl: null,
  comments: [],

  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(settingsComments, userSettings);
    this.commentEl = document.querySelector(`#${settingsComments.idContainer}`);
    this.commentEl.addEventListener('click', this.btnClickHandler.bind(this));
    let xhr = new XMLHttpRequest();
    let that = this;
    xhr.open('GET', this.settingsComments.urlGetAllComments, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let response = JSON.parse(this.responseText);
        response.comments.forEach(el => {
          that.comments.push(el);
        });
        that.render();
      }
    }
    xhr.send();
  },

  btnClickHandler(event) {
    if (event.target.dataset.type === 'delete') {
      this.remove(event.target);
    } else if (event.target.dataset.type === 'approve') {
      this.approve(event.target);
    } else if (event.target.dataset.type === 'add') {
      event.preventDefault();
      this.add(event.target);
    }
  },

  approve(target) {
    let that = this;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', that.settingsComments.urlApprovalComment, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let comment = target.closest('.comments__comment');
        comment.classList.add('approved');
        comment.dataset.approved = true;
        target.remove();
      }
    }
    xhr.send();
  },

  remove(target) {
    let that = this;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', that.settingsComments.urlApprovalComment, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let comment = target.closest('.comments__comment');
        comment.remove();
      }
    }
    xhr.send();
  },


  add(elem) {
    let userNameInput = $(elem).siblings(`#nameUser`);
    let userMessageInput = $(elem).siblings(`#commentUser`);
    let userName = userNameInput.val();
    let userMessage = userMessageInput.val();
    if (userName && userMessage) {
      let userId = Math.floor(Math.random() * 10 * userName.length);
      this.ajax({
        url: this.settings.urlAddComment,
        data: {
          id_user: userId,
          text: userMessage
        },
        success: data => {
          (function (data, elem, arrComments) {
            if (data.result && data.result === 1) {
              const newComment = new Comment(userId, userMessage);
              newComment.render(elem);
              arrComments.push({
                "id_comment": userId,
                "text": userMessage
              });
              userNameInput.val('');
              userMessageInput.val('');
            } else if (data.result === 0) {
              alert(`Сервер вернул ошибку: ${data.error_message}`);
            }
          }(data, this.$elCommentBlock, this.arrAllComments))
        }
      });
    }
  },

  render() {
    if (this.comments.length > 0) {
      for (const obj of this.comments) {
        const comment = new Comment(
          obj.id_comment,
          obj.text,
          `${this.settingsComments.idContainer}__comment`,
          `${this.settingsComments.idContainer}__message`,
          `${this.settingsComments.idContainer}__btn_delete`,
          `${this.settingsComments.idContainer}__btn_approve`);
        comment.render(this.commentEl);
      }
    }
  },
};

window.onload = () => comments.init();