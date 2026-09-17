
/**
 * Initializes scroll reveal animations for all elements using the reveal utility classes.
 * @returns {void}
 */
export function initRevealAnimations() {
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
