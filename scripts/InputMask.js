// Die iMask-Bibliothek ist in contacts.html für Eingabemaskierung integriert
// Dokumentation der iMask-Bibliothek: https://imask.js.org/

// CSS-Selektor für das Wurzelelement des Eingabefelds mit Maske
const rootSelector = '[data-js-input-mask]'

// Steuerung der Eingabemaske in einem bestimmten Feld
class InputMask {
    
    constructor(rootElement) {
        this.rootElement = rootElement 
        this.init() 
    }

    // Initialisiert die Eingabemaske für das Element
    init() {
        // Prüft, ob die iMask-Bibliothek eingebunden ist (und korrekt eingebunden wurde)
        const isLibReady = typeof window.IMask !== 'undefined'

        // Wenn die iMask-Bibliothek eingebunden ist, wendet die Maske auf das Element an
        if (isLibReady) {
            window.IMask(this.rootElement, {
                mask: this.rootElement.dataset.jsInputMask 
            })
        } else {
            console.error('Die iMask-Bibliothek ist nicht eingebunden!')
        }
    }
}

// Initialisierung aller Felder mit Masken auf der Seite
class InputMaskCollection {
  
    constructor() {
        this.init()
    }

    // Initialisiert alle Instanzen von InputMask
    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new InputMask(element) // Erstellt eine neue Instanz von InputMask für jedes Element
        })
    }
}

// Exportiert InputMaskCollection als Standardmodul
export default InputMaskCollection