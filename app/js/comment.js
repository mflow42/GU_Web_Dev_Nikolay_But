'use strict';

class Comment {
  constructor(commentId, message, classContainer, classMessage, classDelBtn, classApproveBtn) {
    this.commentId = commentId;
    this.message = message;
    this.classContainer = classContainer;
    this.classMessage = classMessage;
    this.classDelBtn = classDelBtn;
    this.classApproveBtn = classApproveBtn;
  }

  render(commentEl) {
    const containerComment = document.createElement('div');
    containerComment.classList.add(this.classContainer);
    containerComment.dataset.id = this.commentId;
    containerComment.dataset.approved = false;

    const messageComment = document.createElement('p');
    messageComment.classList.add(this.classMessage);
    messageComment.textContent = this.message;

    const approveBtnComment = document.createElement('button');
    approveBtnComment.classList.add(this.classApproveBtn);
    approveBtnComment.dataset.id = this.commentId;
    approveBtnComment.dataset.type = 'approve';
    approveBtnComment.textContent = 'approve';

    const delBtnComment = document.createElement('button');
    delBtnComment.classList.add(this.classDelBtn);
    delBtnComment.dataset.id = this.commentId;
    delBtnComment.dataset.type = 'delete';
    delBtnComment.textContent = 'delete';

    commentEl.append(containerComment);
    containerComment.append(messageComment);
    containerComment.append(approveBtnComment);
    containerComment.append(delBtnComment);
  }
};