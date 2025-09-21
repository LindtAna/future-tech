// Utility-Funktion zur Umwandlung von Pixeln in rem
import pxToRem from './utils/pxToRem.js'

// CSS-Selektor für das Wurzelelement des aufklappbaren Inhalts
const rootSelector = '[data-js-expandable-content]'

//Steuerung eines aufklappbaren Inhaltselements
class ExpandableContent {
  // Objekt mit CSS-Selektoren für relevante Elemente
  selectors = {
    root: rootSelector, 
    button: '[data-js-expandable-content-button]' // Selektor für den Button zum Aufklappen des Inhalts
  }

  // Objekt mit CSS-Klassen für Zustände
  stateClasses = {
    isExpanded: 'is-expanded', // Klasse für den aufgeklappten Zustand
  }

  // Parameter für die Animation
  animationParams = {
    duration: 500, 
    easing: 'ease', 
  }


  constructor(rootElement) {
    this.rootElement = rootElement 
    this.buttonElement = this.rootElement.querySelector(this.selectors.button) 
    this.bindEvents() 
  }

  // Klappt den Inhalt auf
  expand() {
    // Ermittelt die aktuelle und vollständige Höhe des Elements (inklusive des vor dem Button-Klick verborgenen Teils)
    const { offsetHeight, scrollHeight } = this.rootElement 
// aufgeklappter Zustand
    this.rootElement.classList.add(this.stateClasses.isExpanded)
// Animation, die ein flüssiges Aufklappen des Elements ermöglicht
    this.rootElement.animate([ 
      {
        maxHeight: `${pxToRem(offsetHeight)}rem`, // Ausgangswert der maximalen Höhe
      },
      {
        maxHeight: `${pxToRem(scrollHeight)}rem`, // Zielwert der maximalen Höhe
      },
    ], this.animationParams) 
  }

  // Event-Handler für den Klick auf den Button
  onButtonClick = () => {
    this.expand() 
  }

  

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onButtonClick) // Добавляет слушатель события клика
  }
}


// Initialisierung aller aufklappbaren Elemente auf der Seite
class ExpandableContentCollection {

  constructor() {
    this.init()
  }

  // Initialisiert alle Instanzen von ExpandableContent
  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new ExpandableContent(element) // Erstellt eine neue Instanz für jedes Wurzelelement
    })
  }
}

// Exportiert ExpandableContentCollection als Standardmodul
export default ExpandableContentCollection