const translations = {
  en: { title: 'Leon Weigang | Frontend Developer', menuOpen: 'Open menu', menuClose: 'Close menu' },
  de: { title: 'Leon Weigang | Frontend Entwickler', menuOpen: 'Menü öffnen', menuClose: 'Menü schließen' }
};

let currentLanguage = 'en';
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');
const formStatus = document.getElementById('form-status');

/**
 * Sets the active language state and updates accessible labels used by the page controls.
 * @param {'en'|'de'} language - Language code to activate.
 * @returns {void}
 */
function setLanguage(language) {
  if (!translations[language]) return;
  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = translations[language].title;
  document.querySelectorAll('.language-button').forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  updateMenuLabel();
  closeMobileMenu();
}

/**
 * Updates the mobile menu button's translated accessible label.
 * @returns {void}
 */
function updateMenuLabel() {
  const toggle = document.querySelector('.menu-toggle');
  if (!toggle) return;
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-label', isOpen ? translations[currentLanguage].menuClose : translations[currentLanguage].menuOpen);
}

/**
 * Opens the mobile navigation, locks page scrolling and updates ARIA state.
 * @returns {void}
 */
function openMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  toggle.setAttribute('aria-expanded', 'true');
  updateMenuLabel();
  document.body.classList.add('menu-open');
}

/**
 * Closes the mobile navigation and restores normal page scrolling.
 * @returns {void}
 */
function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  if (!menu || !toggle) return;
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
  updateMenuLabel();
  document.body.classList.remove('menu-open');
}

/**
 * Toggles the mobile navigation between its open and closed states.
 * @returns {void}
 */
function toggleMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  if (toggle?.getAttribute('aria-expanded') === 'true') closeMobileMenu();
  else openMobileMenu();
}

/**
 * Validates a single contact form field and renders its accessible error message.
 * @param {HTMLInputElement|HTMLTextAreaElement} field - Form field to validate.
 * @returns {boolean} True when the field passes its constraints.
 */
function validateField(field) {
  const error = document.getElementById(`${field.id}-error`);
  if (!error) return field.checkValidity();
  let message = '';
  if (field.id === 'name' && field.value.trim().length < 2) message = 'Please enter at least 2 characters.';
  if (field.id === 'email' && !field.validity.valid) message = 'Please enter a valid email address.';
  if (field.id === 'message' && field.value.trim().length < 10) message = 'Please enter at least 10 characters.';
  field.setAttribute('aria-invalid', String(Boolean(message)));
  error.textContent = message;
  return !message;
}

/**
 * Validates the privacy checkbox and exposes its current error state.
 * @returns {boolean} True when the checkbox is checked.
 */
function validatePrivacy() {
  const checkbox = document.getElementById('privacy');
  const error = document.getElementById('privacy-error');
  const valid = checkbox.checked;
  checkbox.setAttribute('aria-invalid', String(!valid));
  error.textContent = valid ? '' : 'Please confirm the Privacy Policy.';
  return valid;
}

/**
 * Recalculates the submit button state from all required form controls.
 * @returns {void}
 */
function updateSubmitButton() {
  if (!form || !submitButton) return;
  submitButton.disabled = !form.checkValidity() || !document.getElementById('privacy').checked;
}

/**
 * Validates the complete contact form without sending it.
 * @returns {boolean} True when every required field is valid.
 */
function validateForm() {
  const fields = ['name', 'email', 'message'];
  const fieldsValid = fields.map((id) => validateField(document.getElementById(id))).every(Boolean);
  const privacyValid = validatePrivacy();
  updateSubmitButton();
  return fieldsValid && privacyValid;
}

/**
 * Handles contact form submission and reports an accessible success or failure state.
 * @param {SubmitEvent} event - Native form submission event.
 * @returns {Promise<void>}
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  if (!validateForm()) return;
  const endpoint = form.getAttribute('action');
  if (!endpoint || endpoint.includes('REPLACE_WITH_YOUR_FORM_ID')) {
    formStatus.textContent = 'Please configure your form endpoint first.';
    return;
  }
  submitButton.disabled = true;
  formStatus.textContent = 'Sending ...';
  try {
    const response = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
  } catch (error) {
    formStatus.textContent = 'The form could not be submitted. Please try again later.';
  } finally {
    updateSubmitButton();
  }
}

/**
 * Creates viewport-aware reveal animations for elements marked with the reveal utility classes.
 * @returns {void}
 */
function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
  items.forEach((item) => observer.observe(item));
}

/**
 * Adds all UI listeners and initializes the interactive states of the portfolio page.
 * @returns {void}
 */
function initPage() {
  document.querySelectorAll('.language-button').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  document.querySelector('.menu-toggle')?.addEventListener('click', toggleMobileMenu);
  document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', closeMobileMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMobileMenu(); });
  ['name', 'email', 'message'].forEach((id) => {
    document.getElementById(id)?.addEventListener('blur', (event) => { validateField(event.target); updateSubmitButton(); });
    document.getElementById(id)?.addEventListener('input', updateSubmitButton);
  });
  document.getElementById('privacy')?.addEventListener('change', () => { validatePrivacy(); updateSubmitButton(); });
  form?.addEventListener('submit', handleFormSubmit);
  initRevealAnimations();
}

initPage();
