
import { t } from './i18n.js';

const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');
const formStatus = document.getElementById('form-status');

/**
 * Practical email pattern (based on the browser's own email-validation regex),
 * but tightened to require a real top-level domain, e.g. "name@example.com"
 * instead of just "name@example" or "name@localhost".
 * @type {RegExp}
 */
const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Checks whether a string is a fully valid email address, including a proper
 * domain and top-level domain.
 * @param {string} value - Raw value to check.
 * @returns {boolean} True when the value is a valid email address.
 */
function isValidEmail(value) {
    return EMAIL_PATTERN.test(value.trim());
}

/**
 * Validates one contact form field and updates its accessible error message.
 * @param {HTMLInputElement|HTMLTextAreaElement} field - Field to validate.
 * @returns {boolean} True when the field is valid.
 */
export function validateField(field) {
    const error = document.getElementById(`${field.id}-error`);
    if (!error) return field.checkValidity();
    let message = '';
    if (field.id === 'name' && field.value.trim().length < 2) message = t('validationName');
    if (field.id === 'email' && !isValidEmail(field.value)) message = t('validationEmail');
    if (field.id === 'message' && field.value.trim().length < 10) message = t('validationMessage');

    field.setCustomValidity(message);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    return !message;
}

/**
 * Validates the privacy checkbox and renders the current localized error state.
 * @returns {boolean} True when consent is checked.
 */
export function validatePrivacy() {
    const checkbox = document.getElementById('privacy');
    const error = document.getElementById('privacy-error');
    if (!checkbox || !error) return false;
    const valid = checkbox.checked;
    checkbox.setAttribute('aria-invalid', String(!valid));
    error.textContent = valid ? '' : t('validationPrivacy');
    return valid;
}

/**
 * Updates the disabled state of the submit button based on all required controls.
 * @returns {void}
 */
export function updateSubmitButton() {
    if (!form || !submitButton) return;
    submitButton.disabled = !form.checkValidity() || !document.getElementById('privacy').checked;
}

/**
 * Validates the complete contact form and marks fields as touched.
 * @returns {boolean} True when every required field is valid.
 */
export function validateForm() {
    const fields = ['name', 'email', 'message'];
    fields.forEach((id) => document.getElementById(id)?.classList.add('is-touched'));
    const fieldsValid = fields.map((id) => validateField(document.getElementById(id))).every(Boolean);
    const privacyValid = validatePrivacy();
    updateSubmitButton();
    return fieldsValid && privacyValid;
}

/**
 * Sends the contact form JSON payload to the local PHP mail endpoint.
 * @param {SubmitEvent} event - Native form submit event.
 * @returns {Promise<void>}
 */
export async function handleFormSubmit(event) {
    event.preventDefault();
    if (!form || !validateForm()) return;

    const endpoint = form.getAttribute('action') || 'send_mail.php';
    const payload = {
        name: document.getElementById('name')?.value.trim() ?? '',
        email: document.getElementById('email')?.value.trim() ?? '',
        message: document.getElementById('message')?.value.trim() ?? ''
    };

    submitButton.disabled = true;
    formStatus.textContent = t('sending');

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({ success: false }));
        if (!response.ok || !result.success) throw new Error(result.error || 'Mail request failed');

        form.reset();
        ['name', 'email', 'message'].forEach((id) => document.getElementById(id)?.classList.remove('is-touched'));
        ['name', 'email', 'message', 'privacy'].forEach((id) => document.getElementById(id)?.setAttribute('aria-invalid', 'false'));
        document.querySelectorAll('.field-error').forEach((element) => {
            element.textContent = '';
        });
        formStatus.textContent = t('success');
    } catch (error) {
        formStatus.textContent = t('failure');
    } finally {
        updateSubmitButton();
    }
}

/**
 * Initializes contact form validation, blur feedback and JSON submission.
 * @returns {void}
 */
export function initContactForm() {
    if (!form) return;

    ['name', 'email', 'message'].forEach((id) => {
        document.getElementById(id)?.addEventListener('blur', (event) => {
            event.target.classList.add('is-touched');
            validateField(event.target);
            updateSubmitButton();
        });
        document.getElementById(id)?.addEventListener('input', () => updateSubmitButton());
    });

    document.getElementById('privacy')?.addEventListener('change', () => {
        validatePrivacy();
        updateSubmitButton();
    });
    form.addEventListener('submit', handleFormSubmit);
    updateSubmitButton();
}
