// js/render.js

import { formatPrice } from "./utils.js";
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } from "./cart.js";
import { books } from "./data.js";

export function renderBooks(container) {
  container.innerHTML = books.map(book => `
    <div class="book">
      <img src="${book.image}" />
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>${formatPrice(book.price)}</p>
      <button onclick="handleAdd(${book.id})">Add to Cart</button>
      <a href="book.html?id=${book.id}">View Details</a>
    </div>
  `).join("");
}

export function renderCart(container, cart) {
  container.innerHTML = cart.map(item => {
    const book = books.find(b => b.id === item.id);

    return `
      <div class="cart-item">
        <h3>${book.title}</h3>
        <p>${formatPrice(book.price)}</p>
        <div>
          <button onclick="handleDecrease(${book.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="handleIncrease(${book.id})">+</button>
        </div>
        <button onclick="handleRemove(${book.id})">Remove</button>
      </div>
    `;
  }).join("");
}

window.handleAdd = addToCart;
window.handleIncrease = increaseQuantity;
window.handleDecrease = decreaseQuantity;
window.handleRemove = removeFromCart;