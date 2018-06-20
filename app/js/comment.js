'use strict';

class Comment {
  constructor(id_comment, text, classContainer, classMessage, classDelBtn, classApprovelBtn) {
    this.id_comment = id_comment;
    this.text = text;
    this.classContainer = classContainer;
    this.classMessage = classMessage;
    this.classDelBtn = classDelBtn;
    this.classApprovelBtn = classApprovelBtn;
  }

  render(commentEl) {
    const containerComment = document.createElement('div');
    containerComment.classList.add(this.classContainer);
    containerComment.dataset.id = this.id_comment;
    containerComment.dataset.approved = false;

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

    commentEl.append(containerComment);
    containerComment.append(messageComment);
    containerComment.append(approveBtnComment);
    containerComment.append(delBtnComment);
  }
};