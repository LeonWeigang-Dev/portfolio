# Leon Weigang – Portfolio Website

## 📖 About the Project

This repository contains the personal portfolio website of **Leon Weigang**, built as a responsive HTML, CSS and JavaScript project for job applications and project presentation.

The page follows the supplied portfolio design and includes a responsive single-page layout with dedicated legal pages.

---

## ✨ Key Features

### 🏠 Portfolio Landing Page

- Full-height hero section with responsive navigation
- About Me section with profile image and information blocks
- Skills section with technology icons and learning interaction
- Portfolio section with project previews and hover information
- Testimonial carousel with previous/next controls and direct selection
- Contact section with form validation and server-side submission

### 🌐 Language Switching

- German and English content
- Translated navigation, headings, form texts, validation messages and accessibility labels
- Language switching is handled without reloading the page

### 📱 Responsive Design

- Responsive layout from **320px** mobile widths up to large desktop screens
- Content container is capped at **1440px** on wide screens
- Mobile navigation with burger menu
- Responsive project cards, testimonials, contact form and footer
- Additional focus on preventing horizontal overflow on narrow devices

### ♿ Accessibility

- Semantic HTML structure
- Skip link for keyboard users
- Visible focus states
- ARIA labels and expanded states for interactive navigation
- Accessible form error messages
- Keyboard-accessible interactive elements
- `prefers-reduced-motion` support for animations

### ✉️ Contact Form

- Required-field validation with feedback after leaving a field
- Client-side validation before submission
- `fetch()` request to `send_mail.php`
- JSON response handling for success and error states

### 🎞️ Animations & Interactions

- Scroll reveal animations with `IntersectionObserver`
- Portfolio hover/focus overlays
- Testimonial switching
- Mobile menu transitions
- Hover and focus feedback for interactive elements

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

### Backend

- PHP
- Native `mail()` for contact-form delivery

### Development & Documentation

- JSDoc comments for JavaScript functions
- Git & GitHub
- Live Server / local PHP server for development

---

## 📁 Project Structure

```text
portfolio/
├── assets/
│   ├── aboutme_section/       # Portrait and About Me icons
│   ├── backgrounds/           # Background glows and decorative shapes
│   ├── contact_section/       # Contact-section assets
│   ├── footer_section/        # Footer icons
│   ├── hero_section/          # Hero glows and social icons
│   ├── portfolio_section/     # Project preview images
│   ├── skills_section/        # Skill icons and Skills artwork
│   └── testimonial_section/   # Testimonial portraits
├── index.html                 # Main portfolio page
├── legal-notice.html          # Legal notice page
├── privacy-policy.html        # Privacy policy page
├── script.js                  # JavaScript interactions and translations
├── style.css                  # Main stylesheet and responsive rules
├── send_mail.php              # PHP endpoint for the contact form
├── favicon.svg                # Website favicon
├── README.md                  # Project documentation
└── Join_README.md             # Reference documentation for the Join project
```

---

## 🚀 Installation & Setup

### 1. Download or clone the project

```bash
git clone <YOUR-REPOSITORY-URL>
cd <YOUR-REPOSITORY-FOLDER>
```

### 2. Run the frontend

For the static frontend, use a local web server such as VS Code Live Server.

### 3. Run the PHP endpoint

For the contact form, the project must run on a PHP-enabled server. A local PHP setup can be started with:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000/`.

---

## ✏️ Customization

Before publishing, update:

- GitHub and LinkedIn profile links
- E-mail address and contact information
- Project GitHub / live-test URLs
- Project descriptions and technology lists
- Portraits and other personal assets
- Legal notice and privacy policy content
- PHP mail configuration and hosting details

The supplied project images and icons are already referenced from the `assets/` directory.

---

## 📬 Contact Form Setup

`send_mail.php` receives the form data and sends the message to the configured recipient address.

Make sure that:

- PHP is enabled on the hosting server
- The configured sender/recipient address is valid
- The hosting provider allows PHP `mail()`
- The `From`, `Reply-To` and return-path settings are compatible with the host

A successful request returns a JSON success response; validation or delivery errors return an appropriate JSON error response.

---

## ⚠️ Before Publishing

The legal pages currently contain project/template content and must be reviewed and completed with the real legally required information before the website is published.

---

## 📌 Project Notes

The visual design is based on the supplied Figma/reference screenshots. Responsive behavior and interactive effects are implemented with plain HTML, CSS and JavaScript without a frontend framework.
