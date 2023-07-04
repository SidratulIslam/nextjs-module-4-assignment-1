import products from './product.js';
import { addToCart, clearCart, getCartItems, calculateCartTotal, applyDiscount, removeCartItem } from './cart.js';

const productContainer = document.getElementById('product-list');
const cartContainer = document.getElementById('cart-items');
const clearCartButton = document.getElementById('clear-cart');
const discountApplyButton = document.getElementById('discount-apply-button');

function renderProductList() {
  productContainer.innerHTML = '';
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('card', 'mb-2');
    productCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">Price: $${product.price}</p>
        <input type="number" id="quantity-${product.id}" class="form-control" value="1" min="1">
        <button class="btn btn-primary add-to-cart mt-2" data-product-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productContainer.appendChild(productCard);
  });
}

function renderCartItems() {
  cartContainer.innerHTML = '';
  const cartItems = getCartItems();
  cartItems.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Quantity: <input type="number" class="quantity-input" data-cart-item-id="${item.id}" value="${item.quantity}" min="1"></p>
      <p>Price: $${item.price}</p>
      <p>Total: $${item.total.toFixed(2)}</p>
      <button class="btn btn-danger remove-item mt-2" data-cart-item-id="${item.id}">Remove</button>
      <hr>
    `;
    cartContainer.appendChild(cartItem);
  });

  const cartTotal = calculateCartTotal();
  const totalElement = document.createElement('h4');
  totalElement.innerHTML = `Total: $${cartTotal}`;
  cartContainer.appendChild(totalElement);
}

function handleAddToCartClick(event) {
  const productId = event.target.dataset.productId;
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const quantity = parseInt(quantityInput.value, 10);
  const product = products.find((product) => product.id === parseInt(productId, 10));
  addToCart(product, quantity);
  renderCartItems();
}

function handleClearCartClick() {
  clearCart();
  renderCartItems();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProductList();
});

productContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    handleAddToCartClick(event);
  }
});

clearCartButton.addEventListener('click', handleClearCartClick);

// Rest of the code...

function handleRemoveItemClick(event) {
    const cartItemId = parseInt(event.target.dataset.cartItemId, 10);
    removeCartItem(cartItemId);
    renderCartItems();
  }
  
  function handleQuantityChange(event) {
    const cartItemId = parseInt(event.target.dataset.cartItemId, 10);
    const quantity = parseInt(event.target.value, 10);
    updateCartItemQuantity(cartItemId, quantity);
    renderCartItems();
  }
  
  function handleDiscountApply() {
    const discountInput = document.getElementById('discount-input');
    const discountPercentage = parseInt(discountInput.value, 10);
    applyDiscount(discountPercentage);
    renderCartItems();
  }
  
  cartContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
      handleRemoveItemClick(event);
    }
  });
  
  cartContainer.addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
      handleQuantityChange(event);
    }
  });
  
  discountApplyButton.addEventListener('click', handleDiscountApply);
  