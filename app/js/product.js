'use strict';
// "id": 1,
//       "imgPath": "img/cart-1.png",
//       "name": "REBOX ZANE1",
//       "rating": 4,
//       "price": 52,
class Product {
  constructor(id, imgPath, name, rating, price) {
    id;
    imgPath;
    name;
    rating;
    price;
  }

  render(cartEl) {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add(this.classContainer);
    containerProduct.dataset.id = this.id_comment;
    containerProduct.dataset.approved = this.approved;

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
    containerProduct.append(messageComment);

    //Если коммент одобрен то не будем вставлять кнопку одобрения и навесим класс одобрения
    if (containerProduct.dataset.approved === 'true') {
      containerProduct.classList.add(this.classContainerApproved);
    } else if (containerProduct.dataset.approved === 'false') {
      containerProduct.append(approveBtnComment);
    }

    //Добавим кнопку удаления
    containerProduct.append(delBtnComment);

    //вставляем обертку на страницу
    cartEl.append(containerProduct);
  }
};