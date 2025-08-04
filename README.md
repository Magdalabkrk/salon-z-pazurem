# 🎨 Salon Kosmetyczny Z Pazurem - Elegancka Strona

## 📁 Struktura Projektu

```
salon-nowy/
├── index.html          # Główna strona
├── css/
│   └── style.css       # Style CSS (czarno-złoty motyw)
├── js/
│   └── main.js         # JavaScript (animacje, interakcje)
├── images/             # Folder na zdjęcia
└── README.md          # Ten plik
```

## 🎯 Główne Funkcje

### ✨ Design
- **Elegancki czarno-złoty motyw**
- **Nowoczesny, minimalistyczny design**
- **Płynne animacje i przejścia**
- **Pełna responsywność (mobile-first)**

### 🧭 Nawigacja
- **Przezroczysta nawigacja z efektem blur**
- **Aktywne podświetlanie sekcji**
- **Płynne przewijanie między sekcjami**
- **Hamburger menu na urządzeniach mobilnych**

### 📱 Sekcje Strony
1. **Hero** - Efektowna sekcja powitalna
2. **O mnie** - Informacje o kosmetyczce
3. **Usługi** - 6 głównych usług z cenami
4. **Galeria** - Prezentacja prac
5. **Kontakt** - Formularz i dane kontaktowe

## 🚀 Jak Uruchomić

1. **Skopiuj zdjęcia**
   ```
   Z folderu: ../images/
   Do folderu: salon-nowy/images/
   
   Potrzebne pliki:
   - o mnie.jpg (zdjęcie kosmetyczki)
   - work-1.jpg do work-6.jpg (galeria prac)
   ```

2. **Otwórz plik**
   ```
   Kliknij dwukrotnie: index.html
   Lub otwórz w przeglądarce
   ```

## 🎨 Personalizacja Kolorów

W pliku `css/style.css` znajdziesz sekcję `:root` z kolorami:

```css
:root {
    --primary-color: #000000;    /* Czarny */
    --secondary-color: #FFD700;  /* Złoty */
    --accent-color: #C9B037;     /* Złoty ciemniejszy */
    /* ... */
}
```

### 🎭 Alternatywne Palety Kolorów

**Elegancka Czerwień:**
```css
--primary-color: #1a1a1a;
--secondary-color: #DC143C;
--accent-color: #B91C3C;
```

**Luksusowa Zieleń:**
```css
--primary-color: #0f1419;
--secondary-color: #10B981;
--accent-color: #059669;
```

**Klasyczna Granat:**
```css
--primary-color: #1e293b;
--secondary-color: #3B82F6;
--accent-color: #2563EB;
```

## 📝 Edycja Treści

### Zmiana Nazwy Salonu
W `index.html` znajdź i zmień:
```html
<h2>Z Pazurem</h2>  <!-- Logo w nawigacji -->
<title>Salon Kosmetyczny Z Pazurem</title>  <!-- Tytuł strony -->
```

### Dane Kontaktowe
W sekcji kontakt zmień:
```html
<p>ul. Piękna 123<br>00-001 Warszawa</p>
<p>+48 513 244 109</p>
<p>kontakt@zpazurem.pl</p>
```

### Ceny Usług
W sekcji usług zmień:
```html
<div class="service-price">od 120 zł</div>
```

## 🖼️ Zdjęcia

### Wymagane Zdjęcia:
- **o mnie.jpg** - zdjęcie kosmetyczki (500x500px)
- **work-1.jpg** do **work-6.jpg** - galeria prac (400x300px)

### Dodatkowe Zdjęcia (opcjonalnie):
- **hero-bg.jpg** - tło sekcji hero
- **about-bg.jpg** - tło sekcji o mnie

## 📱 Testowanie Responsywności

Przetestuj stronę w różnych rozmiarach:
- **Desktop:** 1920px+
- **Tablet:** 768px - 1024px  
- **Mobile:** 320px - 767px

## 🔧 Dodatkowe Funkcje

### Formularz Kontaktowy
- Walidacja pól
- Komunikaty błędów/sukcesu
- Responsywny design

### Animacje
- Fade-in podczas przewijania
- Hover effects na kartach
- Smooth scrolling
- Loading animations

## 🐛 Rozwiązywanie Problemów

### Nie działają animacje?
Sprawdź czy JavaScript jest włączony w przeglądarce.

### Nie ładują się zdjęcia?
Sprawdź ścieżki do zdjęć w `images/` folderze.

### Menu mobilne nie działa?
Sprawdź konsolę przeglądarki (F12) pod kątem błędów JavaScript.

## 📞 Kontakt Techniczny

W razie problemów z kodem:
1. Sprawdź konsolę przeglądarki (F12)
2. Zweryfikuj ścieżki do plików
3. Upewnij się że wszystkie pliki są w odpowiednich folderach

## 🏆 Zalety Tej Wersji

✅ **Czyste HTML5** - poprawne semantycznie  
✅ **Nowoczesny CSS** - flexbox, grid, custom properties  
✅ **Płynne animacje** - profesjonalne efekty  
✅ **Pełna responsywność** - działa na wszystkich urządzeniach  
✅ **Szybkie ładowanie** - zoptymalizowany kod  
✅ **Łatwa edycja** - dobrze skomentowany kod  
✅ **Zgodność z przeglądarkami** - działa wszędzie  

## 🎉 Gotowe!

Twoja nowa strona jest gotowa do użycia! 
Elegancka, nowoczesna i w pełni funkcjonalna.
