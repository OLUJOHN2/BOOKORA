// // CART LOGIC

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

function updateCartCount() {
  const cart = getCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const cartLink = document.querySelector(".cart a");
  if (cartLink) {
    cartLink.textContent = `Cart (${totalQuantity})`;
  }
}

updateCartCount();


// RENDER SHOP PAGE

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
      </div>
    `;
  });
}

renderProducts(products);

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
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    renderProducts(sortedProducts);
  });
}


// RENDER CART PAGE

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  const cart = getCart();
  cartContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);

    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <h3>${product.title}</h3>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: $${itemTotal.toFixed(2)}</p>
      </div>
    `;
  });

  const summary = document.querySelector(".cart-summary p");
  if (summary) {
    summary.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  }
}

renderCart();


