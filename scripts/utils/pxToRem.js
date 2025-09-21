// Definiert eine Funktion zur Umwandlung von Pixelwerten in rem-Einheiten
const pxToRem = (pixels) => {
    // Teilt den Pixelwert durch 16 (Basisgröße für rem) und gibt das Ergebnis zurück
    return pixels / 16
}

// Exportiert die Funktion pxToRem als Standardmodul
export default pxToRem