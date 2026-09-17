
import { testimonials } from './data.js';
import { getCurrentLanguage, t } from './i18n.js';

let currentTestimonial = 0;

/**
 * Renders the active testimonial content, image and navigation state.
 * @returns {void}
 */
export function updateTestimonialUI() {
    const active = testimonials[currentTestimonial]?.[getCurrentLanguage()];
    const text = document.querySelector('[data-testimonial-text]');
    const author = document.querySelector('[data-testimonial-author]');
    const image = document.querySelector('[data-testimonial-image]');
    if (!active || !text || !author) return;

    text.textContent = active.text;
    author.textContent = active.author;
    if (image && active.image) image.src = active.image;

    document.querySelectorAll('.testimonial-controls .dot').forEach((dot, index) => {
        const isActive = index === currentTestimonial;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        dot.setAttribute('aria-label', t('testimonialNumber').replace('{number}', String(index + 1)));
    });
}

/**
 * Changes the active testimonial by a relative step and wraps around the list.
 * @param {number} step - Number of positions to move.
 * @returns {void}
 */
export function changeTestimonial(step) {
    currentTestimonial = (currentTestimonial + step + testimonials.length) % testimonials.length;
    updateTestimonialUI();
}

/**
 * Selects a testimonial by zero-based index.
 * @param {number} index - Testimonial index.
 * @returns {void}
 */
export function selectTestimonial(index) {
    if (index < 0 || index >= testimonials.length) return;
    currentTestimonial = index;
    updateTestimonialUI();
}
