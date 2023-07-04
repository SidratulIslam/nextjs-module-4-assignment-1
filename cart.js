let cartItems = [];


export function addToCart(product, quantity) {
  const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: quantity,
    total: product.price * quantity,
  };
  cartItems.push(cartItem);
}

export function removeCartItem(cartItemId) {
  cartItems = cartItems.filter((item) => item.id !== cartItemId);
}

export function updateCartItemQuantity(cartItemId, quantity) {
  const cartItem = cartItems.find((item) => item.id === cartItemId);
  if (cartItem) {
    cartItem.quantity = quantity;
    cartItem.total = cartItem.price * quantity;
  }
}

export function applyDiscount(discountPercentage) {
  const discountFactor = 1 - discountPercentage / 100;
  cartItems.forEach((item) => {
    item.total *= discountFactor;
  });
}

// Rest of the code...


export function clearCart() {
  cartItems = [];
}

export function getCartItems() {
  return cartItems;
}

export function calculateCartTotal() {
  return cartItems.reduce((total, item) => total + item.total, 0);
}
