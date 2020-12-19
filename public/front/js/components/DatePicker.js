/* global flatpickr */

import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';
import utils from '../utils.js';

export default class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;

    thisWidget.dom.input = document.querySelector(select.widgets.datePicker.input);
    console.log('thisWidget.dom.input', thisWidget.dom.input);

    thisWidget.initPlugin();
  }

  initPlugin() {
    const thisWidget = this;
    console.log('thisWidget.value', thisWidget.value);

    thisWidget.minDate = new Date(thisWidget.value);
    console.log('thisWidget.minDate', thisWidget.minDate);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);

    console.log('thisWidget.maxDate', thisWidget.maxDate);
    console.log('thisWidget.value', thisWidget.value);

    flatpickr(thisWidget.dom.input, {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      disable: [
        function(date) {
          // return true to disable
          return date.getDay() === 1 || date.getDay() === 0;
        }
      ],
      locale: {
        firstDayOfWeek: 1 // start week on Monday
      },
      onChange: function(selectedDates, dateStr, instance) {
        console.log('selectedDates', selectedDates);
        console.log('instance', instance);
        dateStr = thisWidget.value;
      }
    });
  }

  parseValue(value) {
    return value;
  }

  isValid() {
    return true;
  }

  renderValue() {}
}
