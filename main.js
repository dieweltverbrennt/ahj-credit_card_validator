/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/data.js
const data = {
  2: {
    class: 'mir',
    name: 'МИР',
    length: 16
  },
  30: {
    class: 'diners',
    name: 'Diners Club',
    length: 14
  },
  36: {
    class: 'diners',
    name: 'Diners Club',
    length: 14
  },
  34: {
    class: 'american-express',
    name: 'American Express',
    length: 15
  },
  37: {
    class: 'american-express',
    name: 'American Express',
    length: 15
  },
  35: {
    class: 'jcb',
    name: 'JCB',
    length: [15, 16]
  },
  4: {
    class: 'visa',
    name: 'Visa',
    length: [13, 16]
  },
  5: {
    class: 'master-card',
    name: 'MasterCard',
    length: 16
  },
  6: {
    class: 'discover',
    name: 'Discover',
    length: 16
  }
};
/* harmony default export */ const js_data = (data);
;// CONCATENATED MODULE: ./src/js/validator.js

class Validator {
  constructor() {
    this.regex = /^[0-9]{13,16}$/;
    this.regexTest = null;
    this.lengthTest = null;
  }
  validateLength(str, sys) {
    if (sys === undefined) {
      this.regexTest = false;
      this.lengthTest = false;
    } else {
      this.regexTest = this.regex.test(str);
      for (const prop in js_data) {
        if (js_data[prop].class === sys) {
          if (typeof js_data[prop].length === 'number') {
            if (str.length === js_data[prop].length) {
              this.lengthTest = true;
            } else {
              this.lengthTest = false;
            }
          } else if (Array.isArray(js_data[prop].length)) {
            if (js_data[prop].length.includes(str.length)) {
              this.lengthTest = true;
            } else {
              this.lengthTest = false;
            }
          }
        }
      }
    }
    return this.regexTest && this.lengthTest;
  }
  luhnAlgo(str) {
    const arr = Array.from(str);
    let sum = 0;
    const check = arr[arr.length - 1];
    arr.splice(arr.length - 1, 1);
    arr.reverse();
    for (let i = 0; i < arr.length; i += 1) {
      const num = Number(arr[i]);
      if (i % 2 === 0) {
        if (num > 4) {
          sum += num * 2 - 9;
        } else {
          sum += num * 2;
        }
      } else {
        sum += num;
      }
    }
    const res = (10 - sum % 10) % 10;
    this.check = res === Number(check);
    return this.check;
  }
}
;// CONCATENATED MODULE: ./src/js/dom.js
class Dom {
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
      cardListArray.forEach(item => item.classList.remove('inactive'));
    } else {
      cardListArray.forEach(item => {
        if (!item.classList.contains(`${system}`)) {
          item.classList.add('inactive');
        }
      });
    }
  }
  showMsg(str, color) {
    const msg = document.createElement('span');
    msg.classList.add('msg');
    msg.innerHTML = str;
    msg.style.color = color;
    this.msg = msg;
    return this.msg;
  }
}
;// CONCATENATED MODULE: ./src/js/paySystem.js

class PaySystem {
  constructor() {
    this.PaySystem = null;
  }
  identificatePaySys(num) {
    const symbols = Array.from(num);
    let start = symbols[0];
    if (start === '3' && symbols.length > 1) {
      start = `${start}${symbols[1]}`;
    }
    const paySys = js_data[start];
    if (paySys !== undefined) {
      this.PaySystem = paySys.class;
    } else {
      this.PaySystem = undefined;
    }
    return this.PaySystem;
  }
}
;// CONCATENATED MODULE: ./src/js/widget.js
class Widget {
  constructor(dom, validator, paySystem) {
    this.dom = dom;
    this.validator = validator;
    this.paySystem = paySystem;
  }
  drawWidget() {
    const body = document.querySelector('body');
    const dom = this.dom.drawDom();
    body.appendChild(dom);
    this.container = document.querySelector('.widget-container');
    this.input = document.querySelector('input');
    this.button = document.querySelector('button');
    this.input.addEventListener('input', this.onInput.bind(this));
    this.button.addEventListener('click', this.onClick.bind(this));
  }
  onInput() {
    const value = this.input.value.trim();
    const current = this.paySystem.identificatePaySys(value);
    this.currentSys = current;
    this.dom.selectPaySys(this.currentSys);
    if (document.querySelector('.msg')) {
      document.querySelector('.msg').remove();
    }
  }
  onClick(e) {
    e.preventDefault();
    if (document.querySelector('.msg')) {
      document.querySelector('.msg').remove();
    }
    const value = this.input.value.trim();
    if (!this.validator.validateLength(value, this.currentSys)) {
      this.container.appendChild(this.dom.showMsg('Please insert a credit card number', 'red'));
    } else {
      const res = this.validator.luhnAlgo(value);
      if (res) {
        this.container.appendChild(this.dom.showMsg('Luhn Algorithm Check <span>&#9989;</span>', 'green'));
      } else {
        this.container.appendChild(this.dom.showMsg('Luhn Algorithm Check <span>&#10060;</span>', 'red'));
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js




const dom = new Dom();
const paySystem = new PaySystem();
const validator = new Validator();
const widget = new Widget(dom, validator, paySystem);
widget.drawWidget();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;