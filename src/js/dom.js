export default class Dom {
  constructor() {
    this.paySystemList = ['mir', 'visa', 'master-card', 'jcb', 'diners', 'american-express', 'discover'];
    this.dom = null;
    this.cardList = null;
    this.form = null;
  }

  drawDom() {
    const dom = document.createElement('div');
    dom.classList.add('widget-container');

    const cardList = this.drawCardList();
    dom.appendChild(cardList);

    const form = this.drawForm();
    dom.appendChild(form);
    this.dom = dom;
    return dom;
  }

  drawCardList() {
    const cardList = document.createElement('ul');
    cardList.classList.add('card-list');
    for (let i = 0; i < this.paySystemList.length; i += 1) {
      const cardListItem = document.createElement('li');
      cardListItem.classList.add('card-list-item');
      cardListItem.classList.add(`${this.paySystemList[i]}`);
      cardList.appendChild(cardListItem);
    }

    this.cardList = cardList;

    return this.cardList;
  }

  drawForm() {
    const form = document.createElement('form');
    form.classList.add('form');

    const input = document.createElement('input');
    const button = document.createElement('button');
    button.textContent = 'Click to validate';

    form.appendChild(input);
    form.appendChild(button);

    this.form = form;
    return this.form;
  }

  selectPaySys(system) {
    const cardListArray = Array.from(this.cardList.querySelectorAll('.card-list-item'));
    if (system === undefined) {
      cardListArray.forEach((item) => item.classList.remove('inactive'));
    } else {
      cardListArray.forEach((item) => {
        if (!item.classList.contains(`${system}`)) {
          item.classList.add('inactive');
        }
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  showMsg(str, color) {
    const msg = document.createElement('span');
    msg.classList.add('msg');
    msg.innerHTML = str;
    msg.style.color = color;
    return msg;
  }
}
