// abstrakte Basisklasse
import BaseComponent from './BaseComponent.js'

// Definiert den CSS-Selektor für den Wurzelelement der Tabs-Gruppe im DOM
const rootSelector = '[data-js-tabs]'

// Tabs wird erweitert von BaseComponent und hat die Logik für eine spezifische Tabs-Gruppe
class Tabs extends BaseComponent {
// Objekt mit CSS-Selektoren für die relevanten Elemente
  selectors = {
    root: rootSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  }

  // Objekt mit CSS-Klassen für Zustände
  stateClasses = {
    isActive: 'is-active', // Klasse für den aktiven Zustand
  }

// Objekt mit Attributen für Zustandsänderungen
  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex', // Tab-Reihenfolge
  }

  // übernimmt das Wurzelelement der Tabs-Gruppe 
  constructor(rootElement) {
    // Aufruf des Konstruktors der Basisklasse BaseComponent
    super() 
    this.rootElement = rootElement
    // Findet alle Button-Elemente innerhalb des Wurzelelements
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
    // Findet alle Content-Elemente innerhalb des Wurzelelements
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
    // Initialisiert den proxied State-Objekt mit dem aktiven Tab-Index
    this.state = this.getProxyState({
      activeTabIndex: [...this.buttonElements]
        .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive)),
    })

    // Setzt den Limit-Index für die Tabs (letzter gültiger Index)
    this.limitTabsIndex = this.buttonElements.length - 1
    this.bindEvents()
  }

  // Aktualisiert die UI: Aktiviert/deaktiviert Buttons und Inhalte basierend auf dem aktiven Tab
  // Wird automatisch durch den Proxy in BaseComponent bei Änderungen von activeTabIndex aufgerufen
  updateUI() {
    const { activeTabIndex } = this.state

// Iteriert über alle Button-Elemente und aktualisiert Klassen und Attribute
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === activeTabIndex
// Fügt oder entfernt die Klasse 'is-active' basierend auf dem Zustand
      buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
    })

    // Iteriert über alle Content-Elemente und aktualisiert Klassen
    this.contentElements.forEach((contentElement, index) => {
      const isActive = index === activeTabIndex

      contentElement.classList.toggle(this.stateClasses.isActive, isActive)
    })
  }

  // Aktiviert einen Tab durch Setzen des Indexes und Fokussieren des Buttons
  activateTab(newTabIndex) {
    this.state.activeTabIndex = newTabIndex
    this.buttonElements[newTabIndex].focus()
  }

  // Wechselt zum vorherigen Tab; bei Index 0 wird zum letzten Tab gewechselt
  // (wrap-around bei Erreichen des Anfangs)
  previousTab = () => {
    const newTabIndex = this.state.activeTabIndex === 0
      ? this.limitTabsIndex
      : this.state.activeTabIndex - 1

    this.activateTab(newTabIndex)
  }

  // Wechselt zum nächsten Tab (wrap-around bei Erreichen des Endes)
  nextTab = () => {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
      ? 0
      : this.state.activeTabIndex + 1

    this.activateTab(newTabIndex)
  }

  // Wechselt zum ersten Tab
  firstTab = () => {
    this.activateTab(0)
  }
// zum letzten Tab
  lastTab = () => {
    this.activateTab(this.limitTabsIndex)
  }

  // Setzt den neuen aktiven Tab-Index
  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex
  }


   // Handler für Tastatureingaben (keydown)
  onKeyDown = (event) => {
    // Destrukturiert Event-Properties
    const { code, metaKey } = event
// Ordnet Tastencodes den entsprechenden Aktionen zu
    const action = {
      ArrowLeft: this.previousTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    }[code]

     // Mac-spezifische Tastenkombinationen 
    const isMacHomeKey = metaKey && code === 'ArrowLeft'
    if (isMacHomeKey) {
      this.firstTab()
      return
    }

    const isMacEndKey = metaKey && code === 'ArrowRight'
    if (isMacEndKey) {
      this.lastTab()
      return
    }

    action?.()
  }


  // Bindet Ereignisse an Buttons (Klicks) und Wurzelelement (Tastatur)
  bindEvents() {
    // Iteriert über Buttons und bindet Click-Handler
    this.buttonElements.forEach((buttonElement, index) => {
      this.buttonElements.forEach.addEventListener('click', () => this.onButtonClick(index))
    })
    // Bindet keydown-Event an Wurzelelement
    this.rootElement.addEventListener('keydown', this.onKeyDown)
  }
}

// Initialisierung aller Tabs-Gruppen auf der Seite
class TabsCollection {
  constructor() {
    this.init()
  }

  // Initialisiert alle Tabs-Instanzen
  init() {
    // Initialisiert alle Tabs-Instanzen
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Tabs(element)
    }) 
  }
}
// Exportiert TabsCollection als Standardmodul
export default TabsCollection