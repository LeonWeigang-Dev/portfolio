
import { setLanguage } from './i18n.js';
import { updateMenuLabel } from './navigation.js';
import { closeMobileMenu, toggleMobileMenu } from './navigation.js';
import { initContactForm } from './form.js';
import { changeTestimonial, selectTestimonial, updateTestimonialUI } from './testimonials.js';
import { initRevealAnimations } from './animations.js';

/**
 * Initializes all interactive portfolio features on the current page.
 * @returns {void}
 */
export function initPage() {
    document.querySelectorAll('.language-button').forEach((button) => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.language);
            updateMenuLabel();
            updateTestimonialUI();
        });
    });

    document.querySelector('.menu-toggle')?.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', closeMobileMenu));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMobileMenu();
    });

    const testimonialButtons = document.querySelectorAll('.testimonial-controls button');
    if (testimonialButtons.length >= 5) {
        testimonialButtons[0].addEventListener('click', () => changeTestimonial(-1));
        testimonialButtons[4].addEventListener('click', () => changeTestimonial(1));
    }
    document.querySelectorAll('.testimonial-controls .dot').forEach((dot) => {
        dot.addEventListener('click', () => selectTestimonial(Number(dot.dataset.testimonialIndex)));
    });

    initContactForm();
    setLanguage(document.querySelector('.language-button.is-active')?.dataset.language || document.documentElement.lang || 'en');
    updateMenuLabel();
    updateTestimonialUI();
    initRevealAnimations();
}

initPage();
