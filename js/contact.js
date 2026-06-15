// =============================================
// HariOM Hotel - Contact Page JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Contact Form Validation ----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (validateForm()) {
        const btn = document.getElementById('submit-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = 'linear-gradient(135deg,#4caf50,#388e3c)';
          showToast('Message sent successfully! We\'ll reply within 24 hours.');
          form.reset();
          clearValidation();
          setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        }, 1500);
      }
    });

    // Real-time validation
    ['cf-name','cf-email','cf-subject','cf-message'].forEach(id => {
      document.getElementById(id)?.addEventListener('blur', () => validateField(id));
      document.getElementById(id)?.addEventListener('input', () => clearFieldError(id));
    });
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  // Open first FAQ by default
  document.querySelector('.faq-item')?.classList.add('open');
});

function validateForm() {
  let valid = true;
  if (!validateField('cf-name')) valid = false;
  if (!validateField('cf-email')) valid = false;
  if (!validateField('cf-subject')) valid = false;
  if (!validateField('cf-message')) valid = false;
  return valid;
}

function validateField(id) {
  const el = document.getElementById(id);
  if (!el) return true;
  const val = el.value.trim();
  let error = '';

  if (id === 'cf-name') {
    if (!val) error = 'Name is required.';
    else if (val.length < 2) error = 'Name must be at least 2 characters.';
  } else if (id === 'cf-email') {
    if (!val) error = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) error = 'Enter a valid email address.';
  } else if (id === 'cf-subject') {
    if (!val) error = 'Please select a subject.';
  } else if (id === 'cf-message') {
    if (!val) error = 'Message is required.';
    else if (val.length < 10) error = 'Message must be at least 10 characters.';
  }

  const errEl = document.getElementById('err-' + id.replace('cf-', ''));
  if (errEl) errEl.textContent = error;
  el.classList.toggle('error', !!error);
  el.classList.toggle('valid', !error && !!val);
  return !error;
}

function clearFieldError(id) {
  const el = document.getElementById(id);
  const errEl = document.getElementById('err-' + id.replace('cf-', ''));
  if (el) el.classList.remove('error');
  if (errEl) errEl.textContent = '';
}

function clearValidation() {
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.error, .valid').forEach(el => {
    el.classList.remove('error', 'valid');
  });
}
