// =============================================
// HariOM Hotel - Cart Page JS
// =============================================

let appliedDiscount = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Clear cart
  document.getElementById('clear-cart')?.addEventListener('click', () => {
    if (confirm('Clear all items from cart?')) {
      Cart.clear();
      renderCart();
      showToast('Cart cleared.');
    }
  });

  // Apply coupon
  document.getElementById('apply-coupon')?.addEventListener('click', applyCoupon);
  document.getElementById('coupon-code')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') applyCoupon();
  });

  // Checkout
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (Cart.totalItems() === 0) { showToast('Your cart is empty!', 'error'); return; }
    const orderId = '#HO-' + Math.floor(10000 + Math.random() * 90000);
    document.getElementById('order-id-display').textContent = orderId;
    document.getElementById('checkout-modal').classList.add('active');
    Cart.clear();
    renderCart();
  });

  document.getElementById('checkout-modal')?.addEventListener('click', e => {
    if (e.target.id === 'checkout-modal') document.getElementById('checkout-modal').classList.remove('active');
  });
});

function renderCart() {
  const cart = Cart.get();
  const layout = document.getElementById('cart-layout');
  const emptyCart = document.getElementById('empty-cart');
  const itemsList = document.getElementById('cart-items-list');
  const itemCount = document.getElementById('cart-item-count');

  if (cart.length === 0) {
    if (layout) layout.style.display = 'none';
    if (emptyCart) emptyCart.style.display = 'block';
    return;
  }

  if (layout) layout.style.display = 'grid';
  if (emptyCart) emptyCart.style.display = 'none';
  if (itemCount) itemCount.textContent = `(${Cart.totalItems()})`;

  if (itemsList) {
    itemsList.innerHTML = cart.map(item => `
      <div class="cart-item" id="cart-item-${item.id}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="item-unit-price">&#8377;${item.price} per item</p>
        </div>
        <div class="cart-item-qty">
          <button onclick="changeCartQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
          <span id="qty-display-${item.id}">${item.qty}</span>
          <button onclick="changeCartQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
        </div>
        <div class="cart-item-total">
          <span class="item-total-price" id="total-${item.id}">&#8377;${item.price * item.qty}</span>
          <button class="remove-item-btn" onclick="removeCartItem(${item.id})" title="Remove item">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`).join('');
  }

  updateTotals();
}

function changeCartQty(id, delta) {
  const cart = Cart.get();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty <= 0) {
    removeCartItem(id);
    return;
  }
  Cart.updateQty(id, newQty);
  // Update display without full re-render
  const qtyEl = document.getElementById(`qty-display-${id}`);
  const totalEl = document.getElementById(`total-${id}`);
  if (qtyEl) qtyEl.textContent = newQty;
  if (totalEl) totalEl.textContent = '₹' + (item.price * newQty);
  document.getElementById('cart-item-count').textContent = `(${Cart.totalItems()})`;
  updateTotals();
}

function removeCartItem(id) {
  const el = document.getElementById(`cart-item-${id}`);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateX(30px)';
    el.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      Cart.remove(id);
      renderCart();
    }, 300);
  }
  showToast('Item removed from cart.');
}

function updateTotals() {
  const subtotal = Cart.subtotal();
  const discountAmt = Math.round(subtotal * appliedDiscount / 100);
  const taxable = subtotal - discountAmt;
  const tax = Math.round(taxable * 0.05);
  const grand = taxable + tax;

  document.getElementById('cart-subtotal').textContent = '₹' + subtotal;
  document.getElementById('cart-tax').textContent = '₹' + tax;
  document.getElementById('cart-grand').textContent = '₹' + grand;

  const discountRow = document.getElementById('discount-row');
  if (discountAmt > 0 && discountRow) {
    discountRow.style.display = 'flex';
    document.getElementById('cart-discount').textContent = '-₹' + discountAmt;
  }
}

function applyCoupon() {
  const code = document.getElementById('coupon-code')?.value.trim().toUpperCase();
  const coupons = { 'HARIOM10': 10, 'WELCOME15': 15, 'FEAST20': 20 };
  if (coupons[code]) {
    appliedDiscount = coupons[code];
    updateTotals();
    showToast(`Coupon "${code}" applied! ${coupons[code]}% discount.`);
  } else {
    showToast('Invalid coupon. Try HARIOM10, WELCOME15, or FEAST20', 'error');
  }
}
