import { settings, select } from '../settings.js';
import BaseWidget from './BaseWidget.js';

class AmountWidget extends BaseWidget {
  constructor(element) {
    super(element, settings.amountWidget.defaultValue);
    const thisWidget = this;
    thisWidget.getElements(element);
    thisWidget.value = settings.amountWidget.defaultValue;
    thisWidget.setValue(thisWidget.dom.input.value);
    thisWidget.initActions();

    ////console.log('AmountWidget:', thisWidget);
    ////console.log('consturctor arguments:', element);
  }

  renderValue() {
    const thisWidget = this;

    thisWidget.dom.input.value = thisWidget.value;
  }

  isValid(value) {
    return !isNaN(value) && value >= settings.amountWidget.defaultMin && value <= settings.amountWidget.defaultMax;
  }

  getElements() {
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  // Metoda InitActions
  initActions() {
    const thisWidget = this;
    //console.log('thisWidget', thisWidget);

    thisWidget.dom.input.addEventListener('change', function() {
      thisWidget.setValue(thisWidget.dom.input.value);
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function(event) {
      //initiateLog++;
      ////console.log('initiate log', initiateLog);
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
      //console.log('thisWidget linkIncrase:', thisWidget.value);
    });
    thisWidget.dom.linkIncrease.addEventListener('click', function(event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
      //console.log('thisWidget linkIncrase:', thisWidget.value);
    });
  }

  // Metoda Announce (Event)
  announce() {
    const thisWidget = this;

    const event = new CustomEvent('updated', {
      bubbles: true
    });
    console.log(event);
    thisWidget.dom.wrapper.dispatchEvent(event);
  }
}

export default AmountWidget;
