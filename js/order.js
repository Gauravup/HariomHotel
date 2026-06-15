// =============================================
// HariOM Hotel - Order Page JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();

  // Listen for cart changes (storage event from other tabs)
  window.addEventListener('storage', () => renderOrderSummary());

  // Coupon
  document.getElementById('apply-coupon')?.addEventListener('click', () => {
    const code = document.getElementById('coupon-input')?.value.trim().toUpperCase();
    const coupons = { 'HARIOM10': 10, 'WELCOME15': 15, 'FEAST20': 20 };
    if (coupons[code]) {
      showToast(`Coupon applied! ${coupons[code]}% discount added.`);
    } else {
      showToast('Invalid coupon code. Try HARIOM10', 'error');
    }
  });
});

// Override Cart.add to also update order summary
const _origAdd = Cart.add.bind(Cart);
Cart.add = function(item) {
  _origAdd(item);
  renderOrderSummary();
};

function renderOrderSummary() {
  const cart = Cart.get();
  const summaryItems = document.getElementById('summary-items');
  const summaryTotals = document.getElementById('summary-totals');
  const couponBox = document.getElementById('coupon-box');
  const checkoutBtn = document.getElementById('order-checkout-btn');
  const itemCount = document.getElementById('order-item-count');

  if (!summaryItems) return;

  const totalItems = Cart.totalItems();
  if (itemCount) itemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;

  if (cart.length === 0) {
    summaryItems.innerHTML = `<div class="empty-order"><i class="fas fa-shopping-bag"></i><p>Your order is empty</p><span>Add items from the menu</span></div>`;
    if (summaryTotals) summaryTotals.style.display = 'none';
    if (couponBox) couponBox.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
    return;
  }

  summaryItems.innerHTML = cart.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="summary-item-info">
        <strong>${item.name}</strong>
        <span>&#8377;${item.price * item.qty}</span>
      </div>
      <div class="summary-item-qty">
        <button onclick="changeQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
      </div>
      <button class="summary-item-remove" onclick="removeItem(${item.id})" title="Remove">
        <i class="fas fa-trash"></i>
      </button>
    </div>`).join('');

  const subtotal = Cart.subtotal();
  const tax = Math.round(subtotal * 0.05);
  const grand = subtotal + tax;

  if (summaryTotals) {
    summaryTotals.style.display = 'block';
    document.getElementById('order-subtotal').textContent = '₹' + subtotal;
    document.getElementById('order-tax').textContent = '₹' + tax;
    document.getElementById('order-grand').textContent = '₹' + grand;
  }
  if (couponBox) couponBox.style.display = 'flex';
  if (checkoutBtn) checkoutBtn.style.display = 'flex';
}

function changeQty(id, delta) {
  const cart = Cart.get();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty <= 0) {
    Cart.remove(id);
  } else {
    Cart.updateQty(id, newQty);
  }
  renderOrderSummary();
}

function removeItem(id) {
  Cart.remove(id);
  renderOrderSummary();
  showToast('Item removed from order.');
}
