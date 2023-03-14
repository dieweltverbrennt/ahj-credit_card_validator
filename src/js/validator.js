import data from './data';

export default class Validator {
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

      for (const prop in data) {
        if (data[prop].class === sys) {
          if (typeof (data[prop].length) === 'number') {
            if (str.length === data[prop].length) {
              this.lengthTest = true;
            } else {
              this.lengthTest = false;
            }
          } else if (Array.isArray(data[prop].length)) {
            if (data[prop].length.includes(str.length)) {
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
    const res = (10 - (sum % 10)) % 10;
    this.check = res === Number(check);
    return this.check;
  }
}
