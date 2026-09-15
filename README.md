# Leon Weigang Portfolio – HTML / CSS / JavaScript

This build keeps the existing portfolio visual design and adds the requested responsive and interaction refinements.

## Structure

- `index.html` – main portfolio page
- `style.css` – complete responsive styling
- `script.js` – language switching, mobile menu, form validation, testimonial switching and reveal animations
- `legal-notice.html` – styled legal notice template
- `privacy-policy.html` – styled privacy policy template
- `assets/` – supplied project images, icons and background artwork

## Implemented refinements

- Responsive tuning down to exactly `320px`
- Wide-screen container handling for `1440px+`
- Skills background artwork fades out towards the bottom while retaining its size and position
- Portfolio cards show the screenshot-inspired hover overlay with `Github` and `Live test` buttons, project description and technologies
- Hover/focus animations slide the top actions down and the lower information panel up
- All four supplied portfolio preview images are included
- Contact fields get a red validation border after they have been left while invalid
- Legal Notice and Privacy Policy use the same visual language as the main portfolio
- DE/EN language switching also works on the legal pages
- Testimonial carousel supports previous/next navigation and direct dot selection
- Testimonial portraits change with the active testimonial
- Existing reveal animations and `prefers-reduced-motion` support remain active

## Placeholder project data

The supplied screenshots only contained detailed hover content for El Pollo Loco and Join. Therefore those two cards use the shown descriptions and technology lists. The daBubble and Pokédex cards keep clearly marked placeholders until their exact descriptions and technologies are provided.

## Before publishing

Replace the placeholder Github/live URLs, social profile URLs, e-mail address, Formspree endpoint and the legal placeholder data with your real information.
