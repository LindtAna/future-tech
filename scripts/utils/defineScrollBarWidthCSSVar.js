// Definiert eine Funktion zur Berechnung und Festlegung der Breite der Scrollleiste als CSS-Variable
const defineScrollBarWidthCSSVar = () => {
    // Setzt die CSS-Variable auf die Differenz zwischen der inneren Fensterbreite und der Breite des HTML-Elements in Pixeln
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${window.innerWidth - document.documentElement.clientWidth}px`
    )
}

export default defineScrollBarWidthCSSVar