# Leon Weigang Portfolio – HTML / CSS / JavaScript

This version was rebuilt from the supplied section screenshots and folder-structure screenshot.

## Structure

- `index.html` – main portfolio
- `style.css` – complete responsive styling
- `script.js` – menu, language state, form validation and scroll reveal animation
- `legal-notice.html` – legal notice template
- `privacy-policy.html` – privacy policy template
- `assets/` – asset folders matching the structure shown in the supplied screenshot

## Asset replacement

The uploaded ZIP contained the screenshots of the design and asset folder structure, but not the original asset binaries. Therefore this project contains lightweight placeholder assets using the same filenames.

Replace the placeholder files inside `assets/` with your original images/icons. The HTML already points to these paths, so no HTML changes are required for the normal asset replacement workflow.

Important paths include:

- `assets/aboutme_section/leon_foto.jpg`
- `assets/aboutme_section/located_icon.svg`
- `assets/aboutme_section/mindset_icon.svg`
- `assets/aboutme_section/problem_icon.svg`
- `assets/portfolio_section/elpolloloco_portfolio.png`
- `assets/portfolio_section/join_portfolio.png`
- `assets/portfolio_section/daBubble_portfolio.png`
- `assets/portfolio_section/pokedex_portfolio.png`
- `assets/skills_section/*.svg`
- `assets/backgrounds/*.svg`
- `assets/hero_section/*.svg`
- `assets/footer_section/*.svg`

## Animation

Sections and content use `IntersectionObserver` reveal animations. Hover effects are deliberately subtle for now and can be refined later.

The page also respects `prefers-reduced-motion`.

## Contact form

Replace the placeholder Formspree URL in `index.html` with your real endpoint. Then replace the social links and email address with your real profiles.
