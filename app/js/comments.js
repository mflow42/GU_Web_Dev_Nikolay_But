'use strict';

const settings = {
  idContainer: 'comments',
  classCommentApproved: 'approved',
  urlGetAllComments: 'json/review.list.json',
  urlDelComment: 'json/review.delete.json',
  urlApprovalComment: 'json/review.submit.json',
  urlAddComment: 'json/review.add.json',
};

const comments = {
  settings,
  commentEl: null,
  comments: [],

  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);
    this.commentEl = document.querySelector(`#${this.idContainer}`);
    console.log();

    this.commentEl.addEventListener('click', this.btnClickHandler(event));
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/comment.list.json', true);

    xhr.onload = function() {
      if (this.status === 200) {
        JSON.parse(this.responseText).forEach(element => {
          console.log(element);

          this.comments.push(element);
          this.render();
        });
      }
    }

    xht.send();
  },

  render() {
    if (this.comments.length > 0) {
      for (const obj of this.comments) {
        const comment = new Comment(obj.commentId, obj.message);
        comment.render(this.commentEl);
      }
    }
  },
};

window.onload = () => comments.init();