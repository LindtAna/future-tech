
class Header {
    // Objekt mit CSS-Selektoren für Header-Elemente
    selectors = {
        root: '[data-js-header]', 
        overlay: '[data-js-header-overlay]', 
        burgerButton: '[data-js-header-burger-button]' // Selektor für den Burger-Menü-Button
    }

   // Objekt mit CSS-Klassen zur Steuerung von Zuständen
    stateClasses = {
        isActive: 'is-active', // Öffnen des Menüs
        isLock: 'is-lock' // Blockiert das Scrollen, wenn das Menü geöffnet ist
    }

    
    constructor() {
        this.rootElement = document.querySelector(this.selectors.root) 
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay) 
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton) 
        this.bindEvents() 
    }

    // Event-Handler für Klick auf den Burger-Menü-Button (Öffnen des Menüs und Sperren des Scrollens auf der Seite)
    onBurgerButtonClick = () => {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive) 
        this.overlayElement.classList.toggle(this.stateClasses.isActive) 
        document.documentElement.classList.toggle(this.stateClasses.isLock) 
    }

    // Bindet das Klick-Ereignis an den Burger-Menü-Button
    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick) 
    }
}

// Exportiert die Klasse Header als Standardmodul
export default Header