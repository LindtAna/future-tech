# Future Tech

[Live Demo](https://lindtana.github.io/future-tech/)


Future Tech ist eine Multi-Page-Website, die modernste Webtechnologien und eine modulare Architektur kombiniert.  
Enthält mehrere interaktive UI-Komponenten, eine 3D-Galaxienanimation und ein responsives Design.

---

## Design

Die Benutzeroberfläche ist **responsiv** und **modular** aufgebaut.

### Design in Figma

Das UI-Design basiert auf dem folgenden Figma-Template:  
https://www.figma.com/design/YzTDRV7OaSoeCUBNYaoCZV/FutureTech?node-id=18-214&p=f&t=PRr8HQL3vH06I7Vs-0

---

## Funktionalität

- Responsives Burger-Menü für mobile Navigation  
- Custom-Select-Komponente mit Tastatur- und ARIA-Unterstützung  
- Custom-Videoplayer mit Play/Pause-Steuerung  
- Komponentengesteuerte Tabs mit Klick- und Keyboard-Navigation  
- 3D-Galaxienanimation basierend auf Three.js  
- ExpandableContent für ausklappbare Textabschnitte  
- Telefonnummer-Eingabemaske mit iMask.js  
- Dynamische CSS-Variable zur Berechnung der Scrollbar-Breite  

---

## Projektstruktur
```text
/
├─ favicon/
├─ fonts/
├─ icons/
├─ images/
├─ videos/
├─ scripts/
│  ├─ BaseComponent.js
│  ├─ ExpandableContent.js
│  ├─ Header.js
│  ├─ HeroAnimation.js
│  ├─ InputMask.js
│  ├─ MatchMedia.js
│  ├─ Select.js
│  ├─ Tabs.js
│  ├─ VideoPlayer.js
│  ├─ main.js
│  └─ utils/
│     ├─ defineScrollBarWidthCSSVar.js
│     └─ pxToRem.js
├─ styles/
│  ├─ _fonts.scss
│  ├─ _globals.scss
│  ├─ _normalize.scss
│  ├─ _utils.scss
│  ├─ _variables.scss
│  ├─ blocks/
│  │  ├─ _about.scss
│  │  ├─ _accordion.scss
│  │  ├─ _badge.scss
│  │  ├─ _blog-card.scss
│  │  ├─ _burger-button.scss
│  │  ├─ _button.scss
│  │  └─ … (andere Blocks)
│  └─ helpers/
│     ├─ _functions.scss
│     ├─ _index.scss
│     ├─ _media.scss
│     └─ _mixins.scss
├─ index.html
├─ blog.html
├─ contacts.html
├─ news.html
├─ podcasts.html
├─ resources.html
└─ README.md

```
Future Tech ist nach folgenden funktionalen Bereichen in Ordnern organisiert:

- **scripts**: JavaScript-Module für UI-Logik  
- **scripts/utils**: Hilfsfunktionen und Browser-Fallbacks  
- **styles**: SCSS/CSS-Quellcode für globales und komponentenbasiertes Styling  
- **HTML-Dateien**: Einzelne Seiten wie `index.html`, `blog.html` etc.

---

### Modulübersicht (scripts)

- `BaseComponent.js` — Definiert eine abstrakte Basisklasse mit einem Proxy-State-Mechanismus, der UI-Aktualisierungen bei Zustandsänderungen steuert  

- `Header.js` — Implementiert die Funktionalität zum Öffnen des Menüs bei Klick auf den Burger-Button (für mobile Geräte)

- `MatchMedia.js` — Verwaltet Medienabfragen für responsive Verhalten anhand der Bildschirmbreite

- `Select.js` — Implementiert eine Custom-Select-Dropdown mit Tastatur- und Mobile-Steuerung

- `VideoPlayer.js` — Implementiert die Funktionalität eines Custom-Videoplayers

- `Tabs.js` — Implementiert eine komponentenbasierte Tabs-Funktionalität, die aktive Buttons und Inhalte per Klick und Tastatur
 
- `HeroAnimation.js` — Erstellt eine interaktive, responsive 3D-Galaxienanimation mit Three.js  

- `ExpandableContent.js` — Implementiert die Logik zur Steuerung der Sichtbarkeit von Inhalten, wobei ein Klick auf einen Button den Zustand des Komponents wechselt und ein flüssiges Aufklappen sowie die vollständige Anzeige des Inhalts ermöglicht 

- `InputMask.js` — Implementiert eine Eingabemaske für Telefonnummernfelder, die unerwünschte Zeichen einschränkt und nur vordefinierte Eingaben zulässt. Die iMask.js-Bibliothek wird verwendet  

---

### Utilities (scripts/utils)

- `pxToRem.js` — Konvertiert Pixelwerte in rem-Einheiten  

- `defineScrollBarWidthCSSVar.js` — Berechnet die Breite der Scrollleiste und speichert sie als CSS-Variable  

---

### Styles & SCSS

Komponentenbasierte SCSS-Architektur für maximale Modularität und Wiederverwendbarkeit.

- **styles/blocks/** — Enthält modulare SCSS-Dateien für UI-Blöcke und Komponenten wie Karten, Akkordeons, Buttons und Badges

- **styles/helpers/** — Mixins und Funktionen für responsive Gestaltung, Breakpoints und Utility-Funktionen  (`_functions.scss`, `_media.scss`, `_mixins.scss`)

- **styles/variables.scss** — Definiert CSS-Variablen für Farben, Schriftarten, Border-Radius und Transitionsdauer.

- **styles/utils.scss** — Utility-Klassen für Container-Gestaltung, Responsiveness und Accessibility.

- **styles/globals.scss** — Globaler CSS-Reset, Typografie-Grundregeln und Basis-Styling.

- **styles/normalize.scss** — Moderne Stil-Normalisierung für konsistente Browser-Darstellung.

Das responsive Konzept nutzt `pxToRem()` zur Umrechnung von Pixeln in rem.