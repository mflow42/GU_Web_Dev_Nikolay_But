'use strict';

class Comment {
  constructor(commentId, message, classContainer, classMessage, classDelBtn, classApprovelBtn) {
    this.message = message;
    this.commentId = commentId;
    this.classContainer = classContainer;
    this.classMessage = classMessage;
    this.classDelBtn = classDelBtn;
    this.classApprovelBtn = classApprovelBtn;
  }

  render(container) {
    const containerComment = document.createElement('div');
    containerComment.classList.add(this.classContainer);
    containerComment.dataset.id = this.commentId;
    containerComment.dataset.approved = false;

    const messageComment = document.createElement('p');
    messageComment.classList.add(this.classMessage);
    messageComment.textContent = this.message;


    const delBtnComment = document.createElement('button');
    delBtnComment.classList.add(this.classDelBtn);
    delBtnComment.dataset.id = this.commentId;
    delBtnComment.dataset.type = 'delete';
    delBtnComment.textContent = 'Удалить';

    const approveBtnComment = document.createElement('button');
    delBtnComment.classList.add(this.classApprovelBtn);
    delBtnComment.dataset.id = this.commentId;
    delBtnComment.dataset.type = 'approve';
    delBtnComment.textContent = 'Одобрить';

    containerComment.append(messageComment)
      .append(delBtnComment)
      .append(approveBtnComment)
      .appendTo(container);
  }
};