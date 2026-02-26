// CART LOGIC

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  let cart = getCart();

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  saveCart(cart);
  updateCartCount();
}

function increaseQuantity(productId) {
  let cart = getCart();

  cart = cart.map(item => {
    if (item.id === productId) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });

  saveCart(cart);
  renderCart();
  updateCartCount();
}

function decreaseQuantity(productId) {
  let cart = getCart();

  cart = cart.map(item => {
    if (item.id === productId) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });

  cart = cart.filter(item => item.quantity > 0);

  saveCart(cart);
  renderCart();
  updateCartCount();
}

function removeFromCart(productId) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== productId);

  saveCart(cart);
  renderCart();
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartLink = document.querySelector(".cart a");

  if (cartLink) {
    cartLink.textContent = `Cart (${totalQuantity})`;
  }
}

updateCartCount();

// Add to cart button
const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    alert("Book added to cart!");
  });
});

// Update Counter number
document.addEventListener("DOMContentLoaded", function() {

  let count = 0;

  const buttons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.getElementById("cart-count");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      count++;
      cartCount.textContent = count;
    });
  });

});

// ========================================
// CATEGORY FILTER
// ========================================

function filterByCategory() {
  const container = document.getElementById("books-container");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (!category) {
    renderProducts(products);
    return;
  }

  const filteredProducts = products.filter(product =>
    product.category === category
  );

  renderProducts(filteredProducts);
}


// ========================================
// RENDER SHOP PAGE
// ========================================

function renderProducts(productList) {
  const container = document.getElementById("books-container");
  if (!container) return;

  container.innerHTML = "";

  productList.forEach(product => {
    container.innerHTML += `
      <div class="book-card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="author">${product.author}</p>
        <p class="price">$${product.price.toFixed(2)}</p>

        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>

        <a href="book.html?id=${product.id}">
          View Details
        </a>
      </div>
    `;
  });
}

if (typeof products !== "undefined") {
  filterByCategory();
}


// ========================================
// SORTING
// ========================================

const sortSelect = document.querySelector(".shop-controls select");

if (sortSelect) {
  sortSelect.addEventListener("change", function () {
    let sortedProducts = [...products];

    if (this.selectedIndex === 0) {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    else if (this.selectedIndex === 1) {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    else {
      sortedProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    renderProducts(sortedProducts);
  });
}


// ========================================
// RENDER CART PAGE
// ========================================

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  const cart = getCart();
  cartContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <h3>${product.title}</h3>

        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${product.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${product.id})">+</button>
        </div>

        <p>Price: $${itemTotal.toFixed(2)}</p>

        <button onclick="removeFromCart(${product.id})">
          Remove
        </button>
      </div>
    `;
  });

  const summary = document.querySelector(".cart-summary p");
  if (summary) {
    summary.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  }
}

renderCart();


// ========================================
// BOOK DETAILS PAGE (Dynamic Routing)
// ========================================

function renderBookDetails() {
  const container = document.getElementById("book-details");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = "<p>Book not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="book-details">
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p class="author">${product.author}</p>
      <p class="price">$${product.price.toFixed(2)}</p>

      <button onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    </div>
  `;
}

renderBookDetails();