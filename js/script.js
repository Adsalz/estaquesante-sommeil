// Menu mobile burger
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');

    // Animation du burger
    burger.classList.toggle('toggle');
});

// Fermer le menu mobile lors du clic sur un lien
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments avec animation
document.querySelectorAll('.treatment-card, .faq-item, .content-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Validation du formulaire de contact
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validation basique
        const nom = document.getElementById('nom').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!nom || !telephone || !email) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }

        // Validation téléphone français
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(telephone)) {
            alert('Veuillez entrer un numéro de téléphone valide.');
            return;
        }

        // Si tout est valide (ici vous devriez envoyer les données à un serveur)
        alert('Merci pour votre message. Nous vous recontacterons rapidement.');
        contactForm.reset();
    });
}

// Ajout d'un effet sticky sur le header lors du scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    }

    lastScroll = currentScroll;
});

// Click to call tracking (pour analytics)
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Ici vous pouvez ajouter du tracking Google Analytics
        console.log('Click to call: ' + this.href);
        // Exemple: gtag('event', 'click_to_call', {'event_category': 'engagement'});
    });
});

// Bouton CTA tracking
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('CTA clicked: ' + this.textContent);
        // Exemple: gtag('event', 'cta_click', {'event_category': 'engagement', 'event_label': this.textContent});
    });
});
