import { select } from '../settings.js';
import AmountWidget from './AmountWidget.js';

// Moduł 9.4
class CartProduct {
  constructor(menuProduct, element) {
    const thisCartProduct = this;

    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.amount = menuProduct.amount;

    thisCartProduct.params = JSON.parse(JSON.stringify(menuProduct.params));

    thisCartProduct.getElements(element);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();

    console.log('thisCartProduct', thisCartProduct);

    console.log('productData', menuProduct);
  }
  getElements(element) {
    const thisCartProduct = this;

    thisCartProduct.dom = {};
    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.price);
    console.log('thisCartProduct.dom.price', thisCartProduct.dom.price);
    thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.remove);
  }
  initAmountWidget() {
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(document.querySelector(select.cart.productList));
    console.log('thisCartProduct.amountWidget:', thisCartProduct.amountWidget);
    thisCartProduct.amountWidget.dom.input.addEventListener('updated', function(event) {
      event.preventDefault();
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      console.log('amount', thisCartProduct.amount);
      console.log('value', thisCartProduct.amountWidget.value);
      thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amount;
      console.log('thisCartproduct.price2', thisCartProduct.price);
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    });
  }
  remove() {
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct
      }
    });
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }
  initActions() {
    const thisCartProduct = this;
    thisCartProduct.dom.edit.addEventListener('click', function(event) {
      event.preventDefault();
    });
    thisCartProduct.dom.remove.addEventListener('click', function(event) {
      event.preventDefault();
      thisCartProduct.remove();
      console.log('Metoda Remove dziala');
    });
  }
}

export default CartProduct;
