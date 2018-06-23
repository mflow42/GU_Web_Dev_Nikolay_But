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