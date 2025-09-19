// Importiert die Funktion pxToRem aus dem Utility-Modul zur Umwandlung von Pixeln in rem
import pxToRem from './utils/pxToRem.js'

// Medienabfragen für verschiedene Geräte
const MatchMedia = {
  // Erstellt ein Objekt, das prüft, ob die Bildschirmbreite der Bedingung <= 767.98px entspricht (umgewandelt in rem mit pxToRem)
  mobile: window.matchMedia(`(width <= ${pxToRem(767.98)}rem)`),
}

// Exportiert das MatchMedia-Objekt als Standardmodul zur Verwendung in anderen Skripts
export default MatchMedia