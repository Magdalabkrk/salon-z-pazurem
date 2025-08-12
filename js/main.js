// ===============================================
// ELEGANCKI SALON KOSMETYCZNY - JAVASCRIPT
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja wszystkich funkcji
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initMobileMenu();
    initVisitorCounter();
});

// ===============================================
// NAWIGACJA
// ===============================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efekt przewijania nawigacji
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Aktualizacja aktywnego linku
        updateActiveNavLink();
    });
    
    // Podświetlanie aktywnej sekcji
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
}

// ===============================================
// MENU MOBILNE
// ===============================================

function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Zamknij menu po kliknięciu w link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Zamknij menu po kliknięciu poza nim
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ===============================================
// PŁYNNE PRZEWIJANIE
// ===============================================

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===============================================
// ANIMACJE PODCZAS PRZEWIJANIA
// ===============================================

function initScrollAnimations() {
    // Intersection Observer dla animacji
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
    
    // Elementy do animacji
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .gallery-item,
        .contact-item,
        .about-text,
        .about-image
    `);
    
    animatedElements.forEach((element, index) => {
        // Ustaw początkowy stan
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.3s ease ${index * 0.05}s`;
        
        // Obserwuj element
        observer.observe(element);
    });
}

// ===============================================
// FORMULARZ KONTAKTOWY
// ===============================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Zbierz dane z formularza
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Walidacja
            if (validateForm(data)) {
                showMessage('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.', 'success');
                form.reset();
            }
        });
    }
}

function validateForm(data) {
    const errors = [];
    
    // Sprawdź wymagane pola
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Imię i nazwisko jest wymagane (min. 2 znaki)');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Podaj prawidłowy adres email');
    }
    
    if (!data.service) {
        errors.push('Wybierz usługę');
    }
    
    // Pokaż błędy lub sukces
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    // Usuń poprzednie komunikaty
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Stwórz nowy komunikat
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message--${type}`;
    messageDiv.innerHTML = message;
    
    // Style dla komunikatu
    messageDiv.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 8px;
        font-weight: 500;
        animation: fadeInUp 0.3s ease;
        ${type === 'success' ? 
            'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' :
            'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Wstaw komunikat
    const form = document.getElementById('contact-form');
    form.appendChild(messageDiv);
    
    // Usuń komunikat po 5 sekundach
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
}

// ===============================================
// GALERIA - LIGHTBOX (opcjonalnie)
// ===============================================

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4').textContent;
            
            // Tutaj można dodać lightbox/modal
            console.log('Otwórz lightbox dla:', title);
        });
    });
}

// ===============================================
// DODATKOWE FUNKCJE UŻYTKOWE
// ===============================================

// Debounce dla optymalizacji
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Sprawdź czy element jest widoczny
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===============================================
// EFEKTY DODATKOWE
// ===============================================

// Parallax dla hero sekcji (opcjonalnie)
function initParallax() {
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 10));
}

// Licznik animowany (dla statystyk)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 sekundy
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ===============================================
// GALERIA CERTYFIKATÓW
// ===============================================

function openCertificate(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateImage');
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    
    // Blokada przewijania strony
    document.body.style.overflow = 'hidden';
}

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    
    // Przywrócenie przewijania strony
    document.body.style.overflow = 'auto';
}

// Zamykanie modala klawiszem ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertificate();
    }
});

// ===============================================
// KONSOLA - INFORMACJE DEWELOPERSKIE
// ===============================================

console.log(`
🎨 Salon Kosmetyczny Z Pazurem
✨ Elegancki design by AI Assistant
📱 Responsywny i nowoczesny
🚀 Zoptymalizowany pod wydajność
📜 Galeria certyfikatów aktywna
// ===============================================
// LICZNIK ODWIEDZIN
// ===============================================

function initVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    if (!counterElement) return;

    try {
        // Pobierz aktualną liczbę odwiedzin z localStorage
        let visitCount = localStorage.getItem('salon-visit-count');
        
        if (visitCount === null) {
            // Pierwsza wizyta - ustaw losową liczbę startową (realistyczną)
            visitCount = Math.floor(Math.random() * 500) + 1250; // 1250-1750
            localStorage.setItem('salon-visit-count', visitCount);
        } else {
            // Sprawdź czy to nowa sesja (nie odwiedzał dziś)
            const lastVisit = localStorage.getItem('salon-last-visit');
            const today = new Date().toDateString();
            
            if (lastVisit !== today) {
                // Nowy dzień - zwiększ licznik o 1-3 (symuluje inne odwiedziny)
                visitCount = parseInt(visitCount) + Math.floor(Math.random() * 3) + 1;
                localStorage.setItem('salon-visit-count', visitCount);
                localStorage.setItem('salon-last-visit', today);
            }
        }

        // Animowane wyświetlenie liczby
        animateCounter(counterElement, parseInt(visitCount));
        
    } catch (error) {
        // Fallback - wyświetl statyczną liczbę jeśli localStorage nie działa
        counterElement.textContent = '1,347';
    }
}

function animateCounter(element, targetNumber) {
    const duration = 2000; // 2 sekundy
    const startNumber = 0;
    const increment = targetNumber / (duration / 16); // 60 FPS
    let currentNumber = startNumber;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        // Formatuj liczbę z separatorem tysięcy
        element.textContent = Math.floor(currentNumber).toLocaleString('pl-PL');
    }, 16);
}

`);

// Eksport funkcji (jeśli używane jako moduł)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollAnimations,
        initContactForm,
        initSmoothScrolling,
        initMobileMenu,
        openCertificate,
        closeCertificate,
        initVisitorCounter
    };
}
