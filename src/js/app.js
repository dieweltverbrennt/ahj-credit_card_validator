import Validator from './validator';
import Dom from './dom';
import PaySystem from './paySystem';
import Widget from './widget';

const dom = new Dom();
const paySystem = new PaySystem();
const validator = new Validator();
const widget = new Widget(dom, validator, paySystem);

widget.drawWidget();
