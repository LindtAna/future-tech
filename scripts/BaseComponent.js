// Basisklasse, die als abstrakte Klasse dient
// BaseComponent wird durch die Klassen Tabs und Select erweitert(extends)
class BaseComponent {
  // verhindert, dass die abstrakte Klasse direkt instanziiert wird
  constructor() {
    if (this.constructor === BaseComponent) {
      throw new Error('Cannot instantiate abstract class BaseComponent!')
    }
  }

  // Methode zur Erstellung eines Proxy-Objekts für den State, um Änderungen zu überwachen
  getProxyState(initialState) {
    return new Proxy(initialState, {
      // Gibt den Wert des angefragten Properties zurück
      get: (target, prop) => {
        return target[prop]
      },

      // Setzt den neuen Wert, speichert den alten und aktualisiert die UI nur bei Änderung
      set: (target, prop, newValue) => {
        const oldValue = target[prop]
        target[prop] = newValue;
        // Prüft, ob der neue Wert sich vom alten unterscheidet, bevor die UI aktualisiert wird
        if (newValue !== oldValue) {
          this.updateUI();
        }
        return true;
      },
    })
  }

  // Abstrakte Methode zur UI-Aktualisierung, die in abgeleiteten Klassen implementiert werden muss
  // UI-Neuzeichnung als Reaktion auf Zustandsänderungen
  updateUI() {
    throw new Error('Need to implement the updateUI method!')
  }
}
// Exportiert die Klasse als Standardmodul
export default BaseComponent