'use strict';

const settings = {
  idContainer: 'container',
  idCommentBlock: 'comment_wrapper',
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

  init() {
    this.commentEl = document.querySelector(`#${this.settings.idCommentBlock}`);
    document.querySelector(`#${idContainer}`).addEventListener('click', this.btnClickHandler(event));
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/comments.json', true);

    xhr.onload = function () {
      if (this.status === 200) {
        JSON.parse(this.responseText).array.forEach(element => {
          this.comments.push(element);
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