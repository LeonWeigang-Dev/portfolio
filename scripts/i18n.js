
import { translations } from './data.js';
let currentLanguage = document.querySelector('.language-button.is-active')?.dataset.language
    || document.documentElement.lang
    || 'en';

/**
 * Returns a translated string from the current language.
 * @param {string} key - Translation key.
 * @returns {string} Translated text or an empty string when unavailable.
 */
export function t(key) {
    return translations[currentLanguage]?.[key] ?? '';
}

/**
 * Returns a translated string for a specific language without changing active state.
 * @param {'en'|'de'} language - Language to read.
 * @param {string} key - Translation key.
 * @returns {string} Translated text or an empty string when unavailable.
 */
export function tWithLanguage(language, key) {
    return translations[language]?.[key] ?? '';
}

/**
 * Applies the selected language to text, HTML fragments, labels, placeholders and alt text.
 * @param {'en'|'de'} language - Language code to activate.
 * @returns {void}
 */
export function setLanguage(language) {
    if (!translations[language]) return;
    currentLanguage = language;
    document.documentElement.lang = language;
    const pageTitleKey = document.body?.dataset.pageTitleKey;
    document.title = pageTitleKey ? tWithLanguage(language, pageTitleKey) : tWithLanguage(language, 'title');

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = translations[language][element.dataset.i18n] ?? element.textContent;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((element) => {
        element.innerHTML = translations[language][element.dataset.i18nHtml] ?? element.innerHTML;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
        element.setAttribute('aria-label', translations[language][element.dataset.i18nAria] ?? element.getAttribute('aria-label') ?? '');
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
        element.setAttribute('placeholder', translations[language][element.dataset.i18nPlaceholder] ?? element.getAttribute('placeholder') ?? '');
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
        element.setAttribute('alt', translations[language][element.dataset.i18nAlt] ?? element.getAttribute('alt') ?? '');
    });
    document.querySelectorAll('.language-button').forEach((button) => {
        const isActive = button.dataset.language === language;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });

    document.querySelectorAll('[data-i18n-learning]').forEach((element) => {
        const key = element.dataset.i18nLearning;
        element.textContent = tWithLanguage(language, key);
    });

}

/**
 * Returns the currently selected language.
 * @returns {'en'|'de'} Active language code.
 */
export function getCurrentLanguage() {
    return currentLanguage;
}
