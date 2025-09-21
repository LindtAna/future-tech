// Importiert die abstrakte Basisklasse BaseComponent und das MatchMedia-Modul
import BaseComponent from './BaseComponent.js'
import MatchMedia from './MatchMedia.js'

// Definiert den CSS-Selektor für das Wurzelelement des Select
const rootSelector = '[data-js-select]'

// Definiert die Klasse Select, die die Logik für ein benutzerdefiniertes Select-Element handhabt und die Klasse BaseComponent erweitert
class Select extends BaseComponent {
  // Objekt mit CSS-Selektoren für bestimmte Elemente des Komponents
  selectors = {
    root: rootSelector, 
    originalControl: '[data-js-select-original-control]', // Selektor für das originale Steuerelement
    button: '[data-js-select-button]', // Selektor für den Button des Dropdown-Menüs
    dropdown: '[data-js-select-dropdown]', // Selektor für das Dropdown-Menü
    option: '[data-js-select-option]', // Selektor für die Optionen (Ländercode)
  }

  // Objekt mit CSS-Klassen für die Zustände des Dropdown-Menüs
  stateClasses = {
    isExpanded: 'is-expanded', // Klasse für den erweiterten Zustand
    isSelected: 'is-selected', // Klasse für die ausgewählte Option des Menüs
    isCurrent: 'is-current', 
    isOnTheLeftSide: 'is-on-the-left-side', 
    isOnTheRightSide: 'is-on-the-right-side', 
  }

  // Objekt mit Attributen für dynamische Zustandsänderungen
  stateAttributes = {
   ariaExpanded: 'aria-expanded', // Attribut für das erweiterte Dropdown-Menü
    ariaSelected: 'aria-selected', // Attribut für die ausgewählte Option des Dropdown-Menüs
    ariaActiveDescendant: 'aria-activedescendant', 
  }

 // Initialer Zustand des Komponents
  initialState = {
  isExpanded: false, // Erweiterter Zustand is-expanded
    currentOptionIndex: null, // Index der aktuellen Option mit is-current
    selectedOptionElement: null, // Ausgewähltes DOM-Element der Select-Option
  }

  // Konstruktor, der das Wurzelelement des Select entgegennimmt
  constructor(rootElement) {
    super() // Aufruf des Konstruktors der Klasse BaseComponent
    this.rootElement = rootElement
   this.originalControlElement = this.rootElement.querySelector(this.selectors.originalControl) // Findet das originale Steuerelement data-js-select-original-control
    this.buttonElement = this.rootElement.querySelector(this.selectors.button) // Findet den Button
    this.dropdownElement = this.rootElement.querySelector(this.selectors.dropdown) // Findet das Dropdown-Menü
    this.optionElements = this.dropdownElement.querySelectorAll(this.selectors.option) // Findet alle Auswahloptionen (Liste von Elementen)
    // Speichert das proxied Zustandsobjekt mit Initialwerten
    this.state = this.getProxyState({
      ...this.initialState,
    currentOptionIndex: this.originalControlElement.selectedIndex, // Link zum originalen DOM-Element Select, gibt den Index der ausgewählten Option zurück
      selectedOptionElement: this.optionElements[this.originalControlElement.selectedIndex], // Link zum DOM-Element der ausgewählten Option
      })
   this.fixDropdownPosition() // Korrigiert die Position des Dropdown-Menüs
    this.updateTabIndexes() // Aktualisiert die tabindex-Attribute
    this.bindEvents() // Bindet Ereignisse
  }

  // Methode zur Aktualisierung der UI bei Zustandsänderungen
  updateUI() {
    const {
      isExpanded,
      currentOptionIndex,
      selectedOptionElement,
    } = this.state

    // entfernt Leerzeichen aus der Zeichenkette der ausgewählten Option
    const newSelectedOptionValue = selectedOptionElement.textContent.trim()

    // Funktion zur Aktualisierung des originalen Select, um es mit dem Custom-Select zu synchronisieren
    const updateOriginalControl = () => {
      this.originalControlElement.value = newSelectedOptionValue // Setzt den Wert der neuen ausgewählten Option
    }

    // Funktion zur Aktualisierung des Buttons
    const updateButton = () => {
    this.buttonElement.textContent = newSelectedOptionValue // Setzt den Wert der neuen ausgewählten Option
      this.buttonElement.classList.toggle(this.stateClasses.isExpanded, isExpanded) // Schaltet auf "erweitert" für das Select
      this.buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isExpanded) // Aktualisiert den Wert des Attributs aria-expanded
      this.buttonElement.setAttribute(
        this.stateAttributes.ariaActiveDescendant,
        this.optionElements[currentOptionIndex].id // Aktualisiert den Wert des Attributs aria-activedescendant
        )
    }

    // Aktualisierung des Dropdown-Menüs
    const updateDropdown = () => {
      this.dropdownElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
    }

    // Funktion zur Aktualisierung der Auswahloptionen
    const updateOptions = () => {
      this.optionElements.forEach((optionElement, index) => {
        const isCurrent = currentOptionIndex === index // Prüft den aktuellen Index
        const isSelected = selectedOptionElement === optionElement // Setzt die ausgewählte Option

        optionElement.classList.toggle(this.stateClasses.isCurrent, isCurrent) // Schaltet die Klasse der aktuellen Option
        optionElement.classList.toggle(this.stateClasses.isSelected, isSelected) // Aktualisiert die Klasse der ausgewählten Option
        optionElement.setAttribute(this.stateAttributes.ariaSelected, isSelected) // Aktualisiert den Wert des Attributs aria-selected
        })
    }

    updateOriginalControl()
    updateButton()
    updateDropdown()
    updateOptions()
  }
  // Invertiert den Erweiterungszustand des Select
  toggleExpandedState() {
    this.state.isExpanded = !this.state.isExpanded
  }
  // Erweitert das Dropdown-Menü
  expand() {
    this.state.isExpanded = true
  }
  // Schließt das Dropdown-Menü
  collapse() {
    this.state.isExpanded = false
  }

 
  fixDropdownPosition() {
    const viewportWidth = document.documentElement.clientWidth // Breite des Viewports
    const halfViewportX = viewportWidth / 2 // X-Koordinate des Viewport-Mittelpunktes
    const { width, x } = this.buttonElement.getBoundingClientRect() // Position des Buttons
    const buttonCenterX = x + width / 2 // Koordinaten des Button-Mittelpunktes auf der X-Achse
    const isButtonOnTheLeftViewportSide = buttonCenterX < halfViewportX // Boolescher Wert -> liegt der Button im linken Teil des Viewports
    // Fügt die Klasse für die Elementposition hinzu (rechts/links)
    this.dropdownElement.classList.toggle(
      this.stateClasses.isOnTheLeftSide,
      isButtonOnTheLeftViewportSide
    )

    this.dropdownElement.classList.toggle(
      this.stateClasses.isOnTheRightSide,
      !isButtonOnTheLeftViewportSide
    )
  }

  // Bestimmt den Gerätetyp und aktualisiert tabindex und DOM-Elemente je nach Bildschirmbreite
  updateTabIndexes(isMobileDevice = MatchMedia.mobile.matches) {
    this.originalControlElement.tabIndex = isMobileDevice ? 0 : -1
    this.buttonElement.tabIndex = isMobileDevice ? -1 : 0
  }

  // Prüft, ob das Dropdown-Menü geöffnet werden muss
  get isNeedToExpand() {
    const isButtonFocused = document.activeElement === this.buttonElement 
// Bedingung für das Öffnen des Dropdown-Menüs, 0 && -1
    return (!this.state.isExpanded && isButtonFocused) 
  }

  // Wählt die aktuell fokussierte Option des Dropdown-Menüs
  selectCurrentOption() {
    this.state.selectedOptionElement = this.optionElements[this.state.currentOptionIndex] 
  }

  // Handler für den Klick auf den Select-Button
  onButtonClick = () => {
    this.toggleExpandedState()
  }

  // Handler für Klicks außerhalb des Dropdown-Menüs (Schließt das Menü)
  onClick = (event) => {
    const { target } = event
    // Prüft, ob der Klick auf dem select__button-Element ist
    const isButtonClick = target === this.buttonElement
    // Prüft, ob der Klick außerhalb des aktuellen Dropdown-Elements ist
    const isOutsideDropdownClick =
      target.closest(this.selectors.dropdown) !== this.dropdownElement
    // Schließt die Optionsliste
    if (!isButtonClick && isOutsideDropdownClick) {
      this.collapse()
      return
    }

    // Klick auf das select__option-Element
    const isOptionClick = target.matches(this.selectors.option) 

    if (isOptionClick) {
      this.state.selectedOptionElement = target 
      // Speichert den Index der angeklickten Option
      this.state.currentOptionIndex = [...this.optionElements]
        .findIndex((optionElement) => optionElement === target) 
      this.collapse() 
    }
  }

  //Handler für die Abwärts-Taste, erweitert das Dropdown-Menü
  onArrowUpKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand() 
      return
    }
// Bewegung nach unten durch die Optionen des Dropdown-Menüs
    if (this.state.currentOptionIndex > 0) {
      this.state.currentOptionIndex-- 
    }
  }

  // Handler für die Aufwärts-Taste, erweitert das Dropdown-Menü
  onArrowDownKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand() 
      return
    }
// Bewegung nach oben durch die Optionen des Dropdown-Menüs
    if (this.state.currentOptionIndex < this.optionElements.length - 1) {
      this.state.currentOptionIndex++ 
    }
  }

  // Handler für die Leertaste, erweitert das Dropdown-Menü
  onSpaceKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand() 
      return
    }
// Bestätigt die ausgewählte Option des Dropdown-Menüs und schließt ihn
    this.selectCurrentOption()
    this.collapse() 
  }

  // Handler für die Enter-Taste, erweitert das Dropdown-Menü
  onEnterKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand() 
      return
    }
// Bestätigt die ausgewählte Option des Dropdown-Menüs und schließt ihn
    this.selectCurrentOption() 
    this.collapse() 
  }

  // Handler für Tastendrücke keydown
  onKeyDown = (event) => {
    const { code } = event 

    // Speichert entweder einen Link auf die spezifische Handler-Methode für den Tastendruck oder undefined
    const action = {
      ArrowUp: this.onArrowUpKeyDown,
      ArrowDown: this.onArrowDownKeyDown,
      Space: this.onSpaceKeyDown,
      Enter: this.onEnterKeyDown,
    }[code]
// Prüfung + Abbruch des Standard-Browser-Verhaltens
    if (action) {
      event.preventDefault() 
      action() 
    }
  }

  // Handler für Änderungen in MatchMedia, aktualisiert tabindex und DOM-Elemente je nach Bildschirmbreite
  onMobileMatchMediaChange = (event) => {
    this.updateTabIndexes(event.matches)
  }

  // Rücksynchronisation der Zustandsänderungen zwischen originalem und custom Select
  onOriginalControlChange = () => {
    this.state.selectedOptionElement = this.optionElements[this.originalControlElement.selectedIndex] // Aktualisiert das ausgewählte Element
  }

  
  bindEvents() {
   MatchMedia.mobile.addEventListener('change', this.onMobileMatchMediaChange) 
    this.buttonElement.addEventListener('click', this.onButtonClick) // Handler für Klick auf den Select-Button
    document.addEventListener('click', this.onClick) // Handler für Klicks außerhalb des Dropdown-Menüs (schließt das Menü)
    this.rootElement.addEventListener('keydown', this.onKeyDown) // Handler für Tastendruckereignisse keydown
    this.originalControlElement.addEventListener('change', this.onOriginalControlChange) // Änderung des Zustands des originalen Select
    }
}

// Initialisierung aller Select-Elemente auf der Seite
class SelectCollection {
 
  constructor() {
    this.init()
  }

  // Initialisiert alle Select-Instanzen
  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Select(element) // Erstellt eine neue Select-Instanz
    })
  }
}


// Exportiert SelectCollection als Standardmodul
export default SelectCollection

//Mehr Dokumentation, Beispiele und Informationen für die weitere Ausarbeitung
//https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/ 