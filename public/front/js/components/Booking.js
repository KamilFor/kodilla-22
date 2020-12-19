import { select, templates, settings, classNames } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';
import utils from '../utils.js';

export default class Booking {
  constructor(element) {
    const thisBooking = this;
    console.log('thisBooking', thisBooking);
    thisBooking.render(element);
    thisBooking.initWidgets();
    thisBooking.getData();
  }

  getData() {
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [startDateParam, endDateParam],
      eventsCurrent: [settings.db.notRepeatParam, startDateParam, endDateParam],
      eventsRepeat: [settings.db.repeatParam, endDateParam]
    };

    console.log('getData params', params);

    const urls = {
      booking: settings.db.url + '/' + settings.db.booking + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event + '?' + params.eventsCurrent.join('&'),
      eventsRepeat: settings.db.url + '/' + settings.db.event + '?' + params.eventsRepeat.join('&')
    };

    console.log('urls', urls);

    Promise.all([fetch(urls.booking), fetch(urls.eventsCurrent), fetch(urls.eventsRepeat)])
      .then(function(allResponses) {
        const bookingsResponse = allResponses[0];
        const eventsCurrent = allResponses[1];
        const eventsRepeat = allResponses[2];
        return Promise.all([bookingsResponse.json(), eventsCurrent.json(), eventsRepeat.json()]);
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]) {
        // console.log(bookings);
        // console.log(eventsCurrent);
        // console.log(eventsRepeat);
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });

    //Metoda 11.2
    thisBooking.dom.data = document.querySelector(select.widgets.datePicker.input);

    thisBooking.dom.hour = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.output);

    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll('input[name="starter"]');

    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(select.cart.phone);

    thisBooking.dom.adress = thisBooking.dom.wrapper.querySelector(select.cart.address);
  }
  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;

    thisBooking.booked = {};

    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for (let item of eventsRepeat) {
      if (item.repeat == 'daily') {
        for (let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)) {
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }

    console.log('thisBooking.booked', thisBooking.booked);

    thisBooking.updatedDOM();
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;

    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
      //   console.log('loop', hourBlock);

      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }
      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  render(element) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;

    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);

    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);

    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    console.log('thisBooking.dom.hourPicker', thisBooking.dom.hourPicker);

    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);
    console.log('thisBooking.dom.tables', thisBooking.dom.tables);

    thisBooking.dom.datePi = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);

    thisBooking.dom.button = thisBooking.dom.wrapper.querySelector('.booking-form');
    console.log('thisBooking.dom.button', thisBooking.dom.button);

    //Metoda 11.2
    thisBooking.dom.inputdate = document.querySelector(select.widgets.datePicker.input);
    thisBooking.dom.inputhour = document.querySelector(select.widgets.hourPicker.input);

    console.log('thisBooking.dom.datePicker', thisBooking.dom.datePi);
    console.log('thisBooking.dom.datePicker2', select.widgets.datePicker.wrapper);
  }

  updatedDOM() {
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value;
    console.log('thisBooking.value', thisBooking.hourPicker.value);
    thisBooking.hour = thisBooking.hourPicker.value;

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] == 'undefined' ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ) {
      allAvailable = true;
    }

    for (let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (!allAvailable && thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId) > -1) {
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }

  sendOrder() {
    const thisBooking = this;
    console.log('thisBooking', thisBooking);
    const url = settings.db.url + '/' + settings.db.reservation;
    console.log('url', url);
    let starterArray = [];

    const payload = {
      data: thisBooking.dom.data.value,
      hour: thisBooking.dom.hour.innerHTML,
      table: thisBooking.tablevalue,
      people: thisBooking.peopleAmount.correctValue,
      duration: thisBooking.hoursAmount.correctValue,
      phone: thisBooking.dom.phone.value,
      adress: thisBooking.dom.adress.value,
      starters: {}
    };
    for (let starter of thisBooking.dom.starters) {
      if (starter.checked == true) {
        console.log(starter.value);
        starterArray.push(starter.value);
        console.log(starterArray);
        Array.prototype.push.apply(payload.starters, starterArray);
      } else console.log('nie');
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    fetch(url, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });
  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePi);
    console.log('thisBooking.datePicker', thisBooking.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.wrapper.addEventListener('updated', function() {
      thisBooking.updatedDOM();
    });
    //Metoda 11.2
    for (let table of thisBooking.dom.tables) {
      table.addEventListener('click', function(event) {
        event.preventDefault();
        if (table.classList.contains(classNames.booking.tableBooked)) {
          console.log('zajety');
        } else {
          console.log('table', table);
          console.log('mamy to');
          thisBooking.tablevalue = table.getAttribute('data-table');
          console.log('thisBooking.dom.tablevalue', thisBooking.tablevalue);
          table.classList.add('booked');
        }
      });
      ///Usuwanie klasy booked przy zmianie daty
      thisBooking.dom.inputhour.addEventListener('click', function(event) {
        event.preventDefault();
        table.classList.remove(classNames.booking.tableBooked);
        console.log('godzina');
      });
      ///Usuwanie klasy booked przy zmianie godziny
      thisBooking.dom.inputdate.addEventListener('click', function(event) {
        event.preventDefault();
        table.classList.remove(classNames.booking.tableBooked);
        console.log('data');
      });
    }
    thisBooking.dom.button.addEventListener('submit', function(event) {
      event.preventDefault();
      thisBooking.sendOrder();
    });
    // Metoda 11.2 Dodawanie do Api
  }
}
