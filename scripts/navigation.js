
import { t } from './i18n.js';

/**
 * Updates the translated accessible label of the mobile menu button.
 * @returns {void}
 */
export function updateMenuLabel() {
    const toggle = document.querySelector('.menu-toggle');
    if (!toggle) return;
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-label', isOpen ? t('menuClose') : t('menuOpen'));
}

/**
 * Opens the mobile navigation, locks scrolling and updates ARIA state.
 * @returns {void}
 */
export function openMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const toggle = document.querySelector('.menu-toggle');
    if (!menu || !toggle) return;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    updateMenuLabel();
    document.body.classList.add('menu-open');
}

/**
 * Closes the mobile navigation and restores page scrolling.
 * @returns {void}
 */
export function closeMobileMenu() {
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
 * Toggles the mobile navigation between open and closed states.
 * @returns {void}
 */
export function toggleMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    if (toggle?.getAttribute('aria-expanded') === 'true') closeMobileMenu();
    else openMobileMenu();
}
