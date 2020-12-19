import { settings, classNames, select, templates } from '../settings.js';
import CartProduct from './CartProduct.js';
import utils from '../utils.js';

// Zadanie AJAX I API
class Cart {
  constructor(element) {
    const thisCart = this;

    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    console.log('thisCart.deliverFee', thisCart.deliverFee);

    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();

    console.log('new Cart', thisCart);
  }
  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.productList = document.querySelector(select.cart.productList);
    console.log('thisCart.dom.productList', thisCart.dom.productList);
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    console.log('toggle', thisCart.dom.toggleTrigger);
    // Dodany kod
    thisCart.renderTotalsKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFee'];
    // Zadanie 9.8
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    console.log('thisCart.dom.form', thisCart.dom.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.adress = thisCart.dom.wrapper.querySelector(select.cart.address);

    for (let key of thisCart.renderTotalsKeys) {
      thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(select.cart[key]);
    }
  }
  //METODA 9.2
  initActions() {
    const thisCart = this;
    thisCart.dom.productList.addEventListener('click', function() {
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function() {
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.toggleTrigger.addEventListener('click', function() {
      thisCart.dom.wrapper.classList.toggle(classNames.menuProduct.wrapperActive);
      console.log('avtiveclass', thisCart.dom.wrapper);
    });
    thisCart.dom.form.addEventListener('submit', function(event) {
      event.preventDefault();
      console.log('thisCart', thisCart);
      thisCart.sendOrder();
    });
  }
  remove(cartProduct) {
    const thisCart = this;
    console.log('thisCart', thisCart);
    const index = thisCart.products.indexOf(cartProduct);
    console.log('indexof', index);
    const removedElement = thisCart.products.splice(index, 1);
    console.log('removedItems', removedElement);
    console.log('removedItems', removedElement[0].dom.wrapper);
    removedElement[0].dom.wrapper.remove();
    thisCart.update();
  }
  //METODA 9.3
  add(menuProduct) {
    const thisCart = this;
    console.log('menuProduct', menuProduct);

    const generatedHTML = templates.cartProduct(menuProduct);
    console.log('generatedHTML', generatedHTML);

    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    console.log('generatedDOM', generatedDOM);
    ////////////////////////////////////////////////
    thisCart.dom.productList.appendChild(generatedDOM);
    //////////////////////////////////////////////////////
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    console.log('adding product', menuProduct);
    thisCart.update();
  }
  update() {
    const thisCart = this;

    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;

    for (let product of thisCart.products) {
      thisCart.subtotalPrice += product.price;
      thisCart.totalNumber += product.amount;
    }
    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;

    for (let key of thisCart.renderTotalsKeys) {
      for (let elem of thisCart.dom[key]) {
        elem.innerHTML = thisCart[key];
        console.log('thisCart[key]', thisCart[key]);
      }
    }
  }
  getData(product) {
    const id = product.id;
    const amount = product.amount;
    const price = product.price;
    const priceSingle = product.priceSingle;
    const params = product.params;
    return [id, amount, price, priceSingle, params];
  }
  //METODA 9.8
  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.order;
    console.log('url', url);

    const payload = {
      totalPrice: thisCart.totalPrice,
      phone: thisCart.dom.phone.value,
      address: thisCart.dom.adress.value,
      totalNumber: thisCart.totalNumber,
      subtotalPrice: thisCart.subtotalPrice,
      totalsPrice: thisCart.totalPrice,
      deliveryFee: thisCart.deliveryFee,
      products: {}
    };
    for (let product of thisCart.products) {
      console.log('product', product);
      const productsInfo = thisCart.getData(product);
      console.log('funkcja', productsInfo);
      console.log('payload.products', payload.products);
      Array.prototype.push.apply(payload.products, productsInfo);
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
}

export default Cart;
