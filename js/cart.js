// js/cart.js

const CART_KEY = "bookora_cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(bookId) {
  const cart = getCart();
  const existing = cart.find(item => item.id === bookId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: bookId, quantity: 1 });
  }

  saveCart(cart);
}

export function increaseQuantity(bookId) {
  const cart = getCart().map(item =>
    item.id === bookId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  saveCart(cart);
}

export function decreaseQuantity(bookId) {
  let cart = getCart().map(item =>
    item.id === bookId
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );

  cart = cart.filter(item => item.quantity > 0);

  saveCart(cart);
}

export function removeFromCart(bookId) {
  const cart = getCart().filter(item => item.id !== bookId);
  saveCart(cart);
}

export function calculateTotal(books) {
  const cart = getCart();

  return cart.reduce((total, item) => {
    const book = books.find(b => b.id === item.id);
    return total + book.price * item.quantity;
  }, 0);
}