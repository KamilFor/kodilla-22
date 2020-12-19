import { select, templates } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import utils from '../utils.js';

class Product {
  constructor(id, data) {
    const thisProduct = this;

    thisProduct.id = id;
    thisProduct.data = data;

    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();

    ////console.log('new Product: ', thisProduct);
  }
  renderInMenu() {
    const thisProduct = this;

    /* generate HTML based on template */
    const generatedHTML = templates.menuProduct(thisProduct.data);

    //////console.log('generatedHTML:', generatedHTML);

    /*create element using utils.createElementFromHTML */
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);

    /*find menu container */
    const menuContainer = document.querySelector(select.containerOf.menu);
    //console.log('menuContainer', menuContainer);

    /* add element to menu */
    menuContainer.appendChild(thisProduct.element);
  }
  // METODA ZADANIE 8.5
  getElements() {
    const thisProduct = this;

    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    // Zadanie 8.7
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }
  initOrderForm() {
    const thisProduct = this;
    //console.log('initOrderform: this product:', thisProduct);
    thisProduct.form.addEventListener('submit', function(event) {
      event.preventDefault();
      thisProduct.processOrder();
    });

    for (let input of thisProduct.formInputs) {
      input.addEventListener('change', function() {
        thisProduct.processOrder();
      });
    }
    //console.log('thisProductcardButton', thisProduct.cartButton);
    thisProduct.cartButton.addEventListener('click', function(event) {
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }
  processOrder() {
    const thisProduct = this;
    ////console.log('processOrder: this product:', thisProduct);

    /* read all data from the form (using utils.serializeFormToObject) and save it to const formData */
    const formData = utils.serializeFormToObject(thisProduct.form);
    ////console.log('thisProduct.form2', formData);
    ////console.log('thisProduct.form', thisProduct.form);
    thisProduct.params = {};

    /* set variable price to equal thisProduct.data.price */
    let price = thisProduct.data.price;
    ////console.log('price: ', price);

    /* START LOOP: for each paramId in thisProduct.data.params */
    for (let paramId in thisProduct.data.params) {
      ////console.log('paramId: ', paramId);
      /* save the element in thisProduct.data.params with key paramId as const param */
      const param = thisProduct.data.params[paramId];
      ////console.log('param: ', param);
      /* START LOOP: for each optionId in param.options */
      for (let optionId in param.options) {
        ////console.log('optionId: ', optionId);
        /* save the element in param.options with key optionId as const option */
        const option = param.options[optionId];
        ////console.log('option: ', option);

        const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;
        ////console.log('ToF: ', optionSelected);

        /* START IF: if option is selected and option is not default */
        if (optionSelected && !option.default) {
          ////console.log('optionSelected: ', optionSelected);
          ////console.log('option.default: ', option.default);

          /* add price of option to variable price */
          price += option.price;
          ////console.log('option.price: ', option.price);

          ////console.log('price: ', price);
          /* END IF: if option is selected and option is not default */
          /* START ELSE IF: if option is not selected and option is default */
        } else if (!optionSelected && option.default) {
          ////console.log('optionSelected2: ', optionSelected);
          ////console.log('option.default2: ', option.default);
          /* deduct price of option from price */
          price = price - option.price;
          /* END ELSE IF: if option is not selected and option is default */
          /* END LOOP: for each optionId in param.options */
          /* END LOOP: for each paramId in thisProduct.data.params */
        }
        //ZADANIE 8.6
        //All finded items
        const findedItems = document.querySelectorAll('.' + paramId + '-' + optionId);
        ////console.log('findedItems2:', thisProduct.imageWrapper);
        ////console.log('findedItems:', findedItems);
        /* START LOOP: if option is selected is true or false */
        if (optionSelected == true) {
          ////console.log('tak:');
          if (!thisProduct.params[paramId]) {
            thisProduct.params[paramId] = {
              label: param.label,
              options: {}
            };
          }
          thisProduct.params[paramId].options[optionId] = option.label;
          for (let findedItem of findedItems) {
            ////console.log('findedItem:', findedItem);
            findedItem.classList.add('active');
          }
        } else if (optionSelected == false) {
          ////console.log('nie:');
          for (let findedItem of findedItems) {
            ////console.log('findedItem:', findedItem);
            findedItem.classList.remove('active');
          }
        }
        /*if (optionSelected && !option.default) {
            for (let findedItem of findedItems) {
              ////console.log('findedItem:', findedItem);
            }
          }*/
      }
      //console.log('thisProduct.params', thisProduct.params);
    }

    //thisProduct.priceElem = '<span class="price">' + price + '</span>';

    // multiply price by amount
    thisProduct.priceSingle = price;
    thisProduct.price = thisProduct.priceSingle * thisProduct.amountWidget.value;
    //console.log('thisProduct.amountWidget.value', thisProduct.amountWidget.value);
    /* set the contents of thisProduct.priceElem to be the value of variable price */
    thisProduct.priceElem.innerHTML = thisProduct.price;
    ////console.log('dodawanie do koszyka', thisProduct.priceElem);
    ////console.log('dodawanie do koszyka2', price);
  }

  //METODA ZADANIE 8.4 w środku Metoda 8.6
  initAccordion() {
    const thisProduct = this;
    ////console.log('thisProduct', thisProduct);

    /* find the clickable trigger (the element that should react to clicking) */
    const triggers = thisProduct.element.querySelectorAll('header.product__header');
    //////console.log('triggers:', triggers);

    /* START: click event listener to trigger */
    for (let trigger of triggers) {
      //console.log('triggers2:', triggers);
      //console.log('trigger: ', trigger);
      trigger.addEventListener('click', function(event) {
        //////console.log('clicked');
        /* prevent default action for event */
        event.preventDefault();
        /* toggle active class on element of thisProduct */
        thisProduct.element.classList.add('active');
        /* find all active products */
        const activeProducts = document.querySelectorAll('article.active');
        ////console.log('activeProducts', activeProducts);
        /* START LOOP: for each active product */
        for (let activeProduct of activeProducts) {
          ////console.log('activeProduct: ', activeProduct);
          /* START: if the active product isn't the element of thisProduct */
          if (activeProduct == thisProduct.element) {
            ////console.log('thisElement: ', thisProduct.element);
            /* remove class active for the active product */
            const activeElements = document.querySelectorAll('article.active');
            for (let activeElement of activeElements) {
              activeElement.classList.remove('active');
              ////console.log('activeelement', activeElement);
            }
            thisProduct.element.classList.add('active');
          } //else if (thisProduct.element === activeProcuct)

          /* END: if the active product isn't the element of thisProduct */
          /* END LOOP: for each active product */
          /* END: click event listener to trigger */
        }
      });
    }
  }

  //METODA 8.7
  initAmountWidget() {
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    //console.log('thisProduct.amountWidgetElem:', thisProduct.amountWidgetElem);
    thisProduct.amountWidgetElem.addEventListener('updated', thisProduct.processOrder());
  }
  //METODA 9.3
  addToCart() {
    const thisProduct = this;

    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;
    //app.cart.add(thisProduct);

    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct
      }
    });

    thisProduct.element.dispatchEvent(event);
  }
}

export default Product;
