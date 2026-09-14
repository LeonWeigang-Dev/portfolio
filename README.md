# Leon Weigang Portfolio

Pure HTML, CSS and JavaScript implementation based on the supplied portfolio checklist and design screenshots.

## Files

- `index.html` - main portfolio page
- `style.css` - responsive styling, layout and accessibility states
- `script.js` - language switcher, mobile menu and contact form validation/submission
- `legal-notice.html` - legal notice template
- `privacy-policy.html` - privacy policy template
- `assets/placeholders/favicon-placeholder.svg` - temporary favicon

## Replace before publishing

1. Portrait and project images in the marked placeholder areas.
2. GitHub / LinkedIn / email URLs.
3. Project live links and repository links.
4. Contact form endpoint in `index.html`.
5. Real legal notice and privacy policy text.
6. Any placeholder project content and testimonial.
7. The favicon when your final branding is ready.

## Design constraints implemented

- Content width capped at 1440px.
- Minimum supported viewport width: 320px.
- Hero uses `min-height: 100vh`.
- Responsive desktop/tablet/mobile layouts.
- Base text size is 16px; mobile does not scale below 16px.
- Visible focus states, skip link, semantic landmarks, ARIA attributes and reduced-motion support.
- Contact validation is triggered on blur and the submit button stays disabled until all required fields are valid and privacy consent is checked.
- Validation messages reserve space to avoid layout shifts.
- All JavaScript functions have English JSDoc documentation.
