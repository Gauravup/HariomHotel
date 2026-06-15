// =============================================
// HariOM Hotel - Menu Page JS
// =============================================

let currentCategory = 'all';
let searchQuery = '';
let previewItem = null;
let previewQty = 1;

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();

  // Category filter
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      renderMenu();
    });
  });

  // Search
  document.getElementById('menu-search')?.addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderMenu();
  });

  // Preview modal close
  document.getElementById('preview-close')?.addEventListener('click', closePreview);
  document.getElementById('preview-modal')?.addEventListener('click', e => {
    if (e.target.id === 'preview-modal') closePreview();
  });

  // Preview qty controls
  document.getElementById('preview-minus')?.addEventListener('click', () => {
    if (previewQty > 1) { previewQty--; document.getElementById('preview-qty').textContent = previewQty; }
  });
  document.getElementById('preview-plus')?.addEventListener('click', () => {
    previewQty++;
    document.getElementById('preview-qty').textContent = previewQty;
  });

  // Preview add to cart
  document.getElementById('preview-add-cart')?.addEventListener('click', () => {
    if (!previewItem) return;
    for (let i = 0; i < previewQty; i++) Cart.add(previewItem);
    closePreview();
  });
});

function getAllDishes() {
  return Object.values(menuData).flat();
}

function renderMenu() {
  const grid = document.getElementById('menu-grid');
  const noResults = document.getElementById('no-results');
  let dishes = currentCategory === 'all' ? getAllDishes() : (menuData[currentCategory] || []);

  if (searchQuery) {
    dishes = dishes.filter(d =>
      d.name.toLowerCase().includes(searchQuery) ||
      d.desc.toLowerCase().includes(searchQuery)
    );
  }

  grid.innerHTML = '';
  if (dishes.length === 0) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  dishes.forEach((dish, i) => {
    const el = document.createElement('div');
    el.className = 'menu-item';
    el.style.animationDelay = `${i * 0.05}s`;
    el.innerHTML = `
      <div class="menu-item-img">
        <img src="${dish.image}" alt="${dish.name}" loading="lazy" />
        ${dish.badge ? `<span class="menu-item-badge">${dish.badge}</span>` : ''}
        <div class="quick-view-btn" data-id="${dish.id}">
          <i class="fas fa-eye"></i> Quick View
        </div>
      </div>
      <div class="menu-item-body">
        <div class="menu-item-rating">${buildStars(dish.rating)}<span>(${dish.reviews})</span></div>
        <h3 class="menu-item-name">${dish.name}</h3>
        <p class="menu-item-desc">${dish.desc}</p>
        <div class="menu-item-footer">
          <span class="menu-item-price">&#8377;${dish.price}</span>
          <div class="menu-item-actions">
            <div class="qty-selector">
              <button class="qty-dec" data-id="${dish.id}"><i class="fas fa-minus"></i></button>
              <span class="qty-val" id="qty-${dish.id}">1</span>
              <button class="qty-inc" data-id="${dish.id}"><i class="fas fa-plus"></i></button>
            </div>
            <button class="add-to-cart-btn"
              data-id="${dish.id}" data-name="${dish.name}"
              data-price="${dish.price}" data-image="${dish.image}">
              <i class="fas fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>`;
    grid.appendChild(el);
  });

  // Bind qty selectors
  grid.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const el = document.getElementById(`qty-${id}`);
      const val = Math.max(1, parseInt(el.textContent) - 1);
      el.textContent = val;
    });
  });
  grid.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const el = document.getElementById(`qty-${id}`);
      el.textContent = parseInt(el.textContent) + 1;
    });
  });

  // Bind add to cart
  grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = parseInt(this.dataset.id);
      const qty = parseInt(document.getElementById(`qty-${id}`)?.textContent || 1);
      const item = { id, name: this.dataset.name, price: parseInt(this.dataset.price), image: this.dataset.image };
      for (let i = 0; i < qty; i++) Cart.add(item);
      this.innerHTML = '<i class="fas fa-check"></i>';
      this.style.background = 'linear-gradient(135deg,#4caf50,#388e3c)';
      setTimeout(() => { this.innerHTML = '<i class="fas fa-cart-plus"></i>'; this.style.background = ''; }, 1500);
    });
  });

  // Bind quick view
  grid.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', () => openPreview(parseInt(btn.dataset.id)));
  });
}

function openPreview(id) {
  const dish = getAllDishes().find(d => d.id === id);
  if (!dish) return;
  previewItem = dish;
  previewQty = 1;
  document.getElementById('preview-img').src = dish.image;
  document.getElementById('preview-img').alt = dish.name;
  document.getElementById('preview-name').textContent = dish.name;
  document.getElementById('preview-desc').textContent = dish.desc;
  document.getElementById('preview-price').textContent = '₹' + dish.price;
  document.getElementById('preview-qty').textContent = 1;
  document.getElementById('preview-badge').textContent = dish.badge || '';
  document.getElementById('preview-badge').style.display = dish.badge ? 'inline-block' : 'none';
  document.getElementById('preview-rating').innerHTML = buildStars(dish.rating);
  document.getElementById('preview-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  document.getElementById('preview-modal')?.classList.remove('active');
  document.body.style.overflow = '';
  previewItem = null;
}

function buildStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<i class="fas fa-star"></i>';
    else if (i - rating < 1) html += '<i class="fas fa-star-half-alt"></i>';
    else html += '<i class="far fa-star"></i>';
  }
  return html;
}
