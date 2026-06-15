// =============================================
// HariOM Hotel - Home Page JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Hero Swiper ----
  new Swiper('#hero-swiper', {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: { el: '.hero .swiper-pagination', clickable: true },
    navigation: { nextEl: '.hero .swiper-button-next', prevEl: '.hero .swiper-button-prev' }
  });

  // ---- Featured Dishes Swiper ----
  const wrapper = document.getElementById('featured-dishes-wrapper');
  if (wrapper && typeof featuredDishes !== 'undefined') {
    featuredDishes.forEach(dish => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = buildDishCard(dish);
      wrapper.appendChild(slide);
    });

    new Swiper('.dishes-swiper', {
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: { el: '.dishes-swiper .swiper-pagination', clickable: true },
      breakpoints: {
        640:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

    // Bind add-to-cart buttons
    bindCartButtons();
  }

  // ---- Testimonials Swiper ----
  new Swiper('.testimonials-swiper', {
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: { el: '.testimonials-swiper .swiper-pagination', clickable: true },
    breakpoints: {
      768:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // ---- Stats Counter (if on about page) ----
  animateCounters();
});

// Build dish card HTML
function buildDishCard(dish) {
  const stars = buildStars(dish.rating);
  return `
    <div class="dish-card">
      <div class="dish-img">
        <img src="${dish.image}" alt="${dish.name}" loading="lazy" />
        ${dish.badge ? `<span class="dish-badge">${dish.badge}</span>` : ''}
      </div>
      <div class="dish-body">
        <div class="dish-rating">${stars}<span>(${dish.reviews})</span></div>
        <h3 class="dish-name">${dish.name}</h3>
        <p class="dish-desc">${dish.desc}</p>
        <div class="dish-footer">
          <span class="dish-price">&#8377;${dish.price}</span>
          <button class="add-to-cart-btn"
            data-id="${dish.id}"
            data-name="${dish.name}"
            data-price="${dish.price}"
            data-image="${dish.image}">
            <i class="fas fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </div>`;
}

// Build star rating HTML
function buildStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<i class="fas fa-star"></i>';
    else if (i - rating < 1) html += '<i class="fas fa-star-half-alt"></i>';
    else html += '<i class="far fa-star"></i>';
  }
  return html;
}

// Bind add-to-cart buttons
function bindCartButtons() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = {
        id: parseInt(this.dataset.id),
        name: this.dataset.name,
        price: parseInt(this.dataset.price),
        image: this.dataset.image
      };
      Cart.add(item);
      // Button feedback
      this.innerHTML = '<i class="fas fa-check"></i> Added';
      this.style.background = 'linear-gradient(135deg,#4caf50,#388e3c)';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-cart-plus"></i> Add';
        this.style.background = '';
      }, 1500);
    });
  });
}

// Animate counters
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 80);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
          if (current >= target) clearInterval(timer);
        }, 20);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}
