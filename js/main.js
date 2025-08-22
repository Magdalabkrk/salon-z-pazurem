// ===============================================
// ELEGANCKI SALON KOSMETYCZNY - JAVASCRIPT
// ===============================================

document.addEventListener('DOMContentLoaded', function () {
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
    window.addEventListener('scroll', function () {
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
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Zamknij menu po kliknięciu w link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Zamknij menu po kliknięciu poza nim
    document.addEventListener('click', function (e) {
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
        link.addEventListener('click', function (e) {
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

    const observer = new IntersectionObserver(function (entries) {
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
    // Inicjalizacja EmailJS
    emailjs.init("iaI1bzUrqLe1I3z0K"); // Twój klucz publiczny EmailJS
    
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Pokaż ładowanie
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Wysyłanie...';
            submitBtn.disabled = true;

            // Wyślij email przez EmailJS
            emailjs.sendForm('service_6l8t1mk', 'template_m3pzef2', form)
                .then(function() {
                    statusDiv.innerHTML = '<p style="color: green;">✅ Wiadomość została wysłana! Skontaktujemy się wkrótce.</p>';
                    form.reset();
                    
                    // Przekieruj na stronę dzięki po 2 sekundach
                    setTimeout(function() {
                        window.location.href = 'dziekuje.html';
                    }, 2000);
                }, function(error) {
                    console.log('FAILED...', error);
                    statusDiv.innerHTML = '<p style="color: red;">❌ Wystąpił błąd. Spróbuj ponownie lub zadzwoń: 668 567 543</p>';
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
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
        item.addEventListener('click', function () {
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
    window.addEventListener('scroll', debounce(function () {
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
// GALERIA ZDJĘĆ
// ===============================================

// Dane galerii - listy zdjęć dla każdej kategorii
const galleryData = {
    'manicure': [
        '1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpg',
        '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
        '11.jpg', '12.jpg', '13.jpg'
    ],
    'stylizacja-paznokci': [
        '1.jpeg', '2.jpeg', '3.jpg', '4.jpg', '5.jpg',
        '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
        '11.jpg', '12.jpg', '13.jpg'
    ],
    'brwi-rzesy': [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
        '6.jpg', '7.jpg', '8.jpg', '9.jpg'
    ],
    'pedicure': [
        '1.jpeg', '2.jpeg'
    ],
    'dodatki-paznokcie': [
        '1.jpeg', '2.jpg', '3.jpg'
    ],
    'makijaze': [
        '1.jpg'
    ]
};

let currentGalleryCategory = '';
let currentGalleryIndex = 0;

function openGallery(category, title) {
    if (!galleryData[category]) {
        console.log('Brak zdjęć dla kategorii:', category);
        return;
    }

    currentGalleryCategory = category;
    currentGalleryIndex = 0;

    const modal = document.getElementById('galleryModal');
    const titleElement = document.getElementById('gallery-category-title');

    modal.style.display = 'block';
    titleElement.textContent = title;

    updateGalleryDisplay();

    // Blokada przewijania strony
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';

    // Przywrócenie przewijania strony
    document.body.style.overflow = 'auto';
}

function updateGalleryDisplay() {
    const galleryImg = document.getElementById('galleryImage');
    const currentSpan = document.getElementById('gallery-current');
    const totalSpan = document.getElementById('gallery-total');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');

    const images = galleryData[currentGalleryCategory];

    if (galleryImg && images && images[currentGalleryIndex]) {
        galleryImg.src = `images/${currentGalleryCategory}/${images[currentGalleryIndex]}`;
        galleryImg.alt = `${currentGalleryCategory} ${currentGalleryIndex + 1}`;
    }

    if (currentSpan) {
        currentSpan.textContent = currentGalleryIndex + 1;
    }

    if (totalSpan && images) {
        totalSpan.textContent = images.length;
    }

    // Aktualizuj stan przycisków
    if (prevBtn) {
        prevBtn.disabled = currentGalleryIndex === 0;
    }

    if (nextBtn && images) {
        nextBtn.disabled = currentGalleryIndex === images.length - 1;
    }
}

function prevGalleryImage() {
    if (currentGalleryIndex > 0) {
        currentGalleryIndex--;
        updateGalleryDisplay();
    }
}

function nextGalleryImage() {
    const images = galleryData[currentGalleryCategory];
    if (images && currentGalleryIndex < images.length - 1) {
        currentGalleryIndex++;
        updateGalleryDisplay();
    }
}

// Obsługa klawiszy dla galerii
document.addEventListener('keydown', function (event) {
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal.style.display === 'block') {
        switch (event.key) {
            case 'Escape':
                closeGallery();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevGalleryImage();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextGalleryImage();
                break;
        }
    }
});

// ===============================================
// GALERIA CERTYFIKATÓW
// ===============================================

let currentModalCertificate = 1;

function openCertificate(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateImage');

    // Znajdź numer certyfikatu na podstawie src
    const certNumber = imageSrc.match(/Certyfikat(\d+)\.jpg/);
    if (certNumber) {
        currentModalCertificate = parseInt(certNumber[1]);
    }

    modal.style.display = 'block';
    modalImg.src = imageSrc;

    // Aktualizuj licznik i przyciski modala
    updateModalDisplay();

    // Blokada przewijania strony
    document.body.style.overflow = 'hidden';
}

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';

    // Przywrócenie przewijania strony
    document.body.style.overflow = 'auto';
}

function updateModalDisplay() {
    const modalImg = document.getElementById('certificateImage');
    const modalCurrent = document.getElementById('modal-cert-current');
    const modalTotal = document.getElementById('modal-cert-total');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    // Aktualizuj obraz
    if (modalImg) {
        modalImg.src = `images/Certyfikat${currentModalCertificate}.jpg`;
        modalImg.alt = `Certyfikat ${currentModalCertificate}`;
    }

    // Aktualizuj licznik
    if (modalCurrent) {
        modalCurrent.textContent = currentModalCertificate;
    }
    if (modalTotal) {
        modalTotal.textContent = totalCertificates;
    }

    // Aktualizuj stan przycisków
    if (prevBtn) {
        prevBtn.disabled = currentModalCertificate === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentModalCertificate === totalCertificates;
    }
}

function prevModalCertificate() {
    if (currentModalCertificate > 1) {
        currentModalCertificate--;
        updateModalDisplay();
    }
}

function nextModalCertificate() {
    if (currentModalCertificate < totalCertificates) {
        currentModalCertificate++;
        updateModalDisplay();
    }
}

// Zamykanie modala klawiszem ESC i nawigacja strzałkami
document.addEventListener('keydown', function (event) {
    const modal = document.getElementById('certificateModal');
    if (modal.style.display === 'block') {
        switch (event.key) {
            case 'Escape':
                closeCertificate();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevModalCertificate();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextModalCertificate();
                break;
        }
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
`);

// ===============================================
// LICZNIK ODWIEDZIN
// ===============================================

function initVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');
    if (!counterElement) {
        console.log('Element visitor-count nie został znaleziony');
        return;
    }

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
        animateVisitorCounter(counterElement, parseInt(visitCount));

    } catch (error) {
        console.log('Błąd localStorage:', error);
        // Fallback - wyświetl statyczną liczbę jeśli localStorage nie działa
        counterElement.textContent = '1,347';
    }
}

function animateVisitorCounter(element, targetNumber) {
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

// ===============================================
// CAROUSEL CERTYFIKATÓW
// ===============================================

let currentCertificateStart = 1;
const totalCertificates = 10;

function getVisibleCertificates() {
    if (window.innerWidth <= 480) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else {
        return 3;
    }
}

function updateCertificateDisplay() {
    const visibleCertificates = getVisibleCertificates();

    // Aktualizuj źródła obrazów dla widocznych certyfikatów
    for (let i = 0; i < 3; i++) {
        const certImage = document.getElementById(`certificate - ${i + 1}`);
        const certIndex = currentCertificateStart + i;

        if (certImage) {
            if (i < visibleCertificates && certIndex <= totalCertificates) {
                certImage.src = `images / Certyfikat${certIndex}.jpg`;
                certImage.alt = `Certyfikat ${certIndex}`;
                certImage.parentElement.style.display = 'block';
            } else {
                certImage.parentElement.style.display = 'none';
            }
        }
    }

    // Aktualizuj licznik
    const certCurrent = document.getElementById('cert-current');
    const certTotal = document.getElementById('cert-total');

    if (certCurrent) {
        const endIndex = Math.min(currentCertificateStart + visibleCertificates - 1, totalCertificates);
        if (visibleCertificates === 1) {
            certCurrent.textContent = currentCertificateStart;
        } else {
            certCurrent.textContent = `${currentCertificateStart} - ${endIndex}`;
        }
    }

    if (certTotal) {
        certTotal.textContent = totalCertificates;
    }

    // Aktualizuj stan przycisków
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.disabled = currentCertificateStart === 1;
    }

    if (nextBtn) {
        nextBtn.disabled = currentCertificateStart + visibleCertificates - 1 >= totalCertificates;
    }
}

function prevCertificate() {
    if (currentCertificateStart > 1) {
        currentCertificateStart--;
        updateCertificateDisplay();
    }
}

function nextCertificate() {
    const visibleCertificates = getVisibleCertificates();
    if (currentCertificateStart + visibleCertificates - 1 < totalCertificates) {
        currentCertificateStart++;
        updateCertificateDisplay();
    }
}

// Dodaj event listener dla zmiany rozmiaru okna
window.addEventListener('resize', function () {
    updateCertificateDisplay();
});

// Inicjalizacja carousel po załadowaniu strony
document.addEventListener('DOMContentLoaded', function () {
    updateCertificateDisplay();
});

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
        initVisitorCounter,
        prevCertificate,
        nextCertificate,
        updateCertificateDisplay,
        prevModalCertificate,
        nextModalCertificate,
        updateModalDisplay,
        openGallery,
        closeGallery,
        prevGalleryImage,
        nextGalleryImage,
        updateGalleryDisplay
    };
}
