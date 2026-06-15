// =============================================
// HariOM Hotel - Cart Management (LocalStorage)
// =============================================

const Cart = {
  // Get cart from localStorage
  get() {
    return JSON.parse(localStorage.getItem('hariom_cart') || '[]');
  },

  // Save cart to localStorage
  save(cart) {
    localStorage.setItem('hariom_cart', JSON.stringify(cart));
    this.updateBadge();
  },

  // Add item to cart
  add(item) {
    const cart = this.get();
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    this.save(cart);
    showToast(`${item.name} added to cart!`);
    this.animateBadge();
  },

  // Remove item from cart
  remove(id) {
    const cart = this.get().filter(i => i.id !== id);
    this.save(cart);
  },

  // Update quantity
  updateQty(id, qty) {
    const cart = this.get();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, qty);
      this.save(cart);
    }
  },

  // Clear cart
  clear() {
    localStorage.removeItem('hariom_cart');
    this.updateBadge();
  },

  // Get total item count
  totalItems() {
    return this.get().reduce((sum, i) => sum + i.qty, 0);
  },

  // Get subtotal
  subtotal() {
    return this.get().reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  // Update badge on all pages
  updateBadge() {
    const count = this.totalItems();
    document.querySelectorAll('#cart-badge, .cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  // Animate badge on add
  animateBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.classList.remove('bounce');
      void badge.offsetWidth; // reflow
      badge.classList.add('bounce');
    }
  }
};

// Toast notification
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.className = `toast show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// Init badge on page load
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
