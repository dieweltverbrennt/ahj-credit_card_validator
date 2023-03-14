export default class Widget {
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
