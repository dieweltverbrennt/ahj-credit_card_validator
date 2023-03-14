import data from './data';

export default class PaySystem {
  constructor() {
    this.PaySystem = null;
  }

  identificatePaySys(num) {
    const symbols = Array.from(num);
    let start = symbols[0];
    if (start === '3' && symbols.length > 1) {
      start = `${start}${symbols[1]}`;
    }
    const paySys = data[start];
    if (paySys !== undefined) {
      this.PaySystem = paySys.class;
    } else {
      this.PaySystem = undefined;
    }
    return this.PaySystem;
  }
}
