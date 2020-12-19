/* global rangeSlider */

import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';
import utils from '../utils.js';

export default class HourPicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.hours.open);

    const thisWidget = this;
    thisWidget.dom.input = document.querySelector(select.widgets.hourPicker.input);
    thisWidget.dom.output = document.querySelector(select.widgets.hourPicker.output);
    //console.log('thisWidget.dom.output', thisWidget.dom.output);
    //console.log('thisWidget.dom.input', thisWidget.dom.input);

    thisWidget.value = thisWidget.dom.input.value;

    thisWidget.initPlugin();
  }

  initPlugin() {
    const thisWidget = this;
    rangeSlider.create(thisWidget.dom.input);

    thisWidget.dom.input.addEventListener('input', function(event) {
      event.preventDefault();
      thisWidget.value = thisWidget.dom.input.value;
    });
    //console.log('thisWidget.dom.input.value', thisWidget.dom.input.value);
    //console.log('thisWidget.value', thisWidget.value);
  }

  parseValue(value) {
    const valueHour = utils.numberToHour(value);
    return valueHour;
  }

  isValud() {
    return true;
  }

  renderValue() {
    const thisWidget = this;
    thisWidget.dom.output.innerHTML = thisWidget.value;
    return thisWidget.value;
  }
}
