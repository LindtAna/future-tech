// Definiert den CSS-Selektor für das Wurzelelement des Videoplayers
const rootSelector = '[data-js-video-player]'


class VideoPlayer {
    // Objekt mit CSS-Selektoren für Elemente des Videoplayers
    selectors = {
        root: rootSelector, 
        video: '[data-js-video-player-video]', // Selektor für das Videoelement
        panel: '[data-js-video-panel]', // Selektor für das Bedienfeld
        playButton: '[data-js-video-play-button]', // Selektor für den Wiedergabe-Button
    }

   // Objekt mit CSS-Klassen zur Steuerung von Zuständen
    stateClasses = {
        isActive: 'is-active', // Klasse für den aktiven Zustand des Bedienfelds (sichtbares Bedienfeld)
    }

   
    constructor(rootElement) {
        this.rootElement = rootElement 
        this.videoElement = this.rootElement.querySelector(this.selectors.video) // Findet das Video
        this.panelElement = this.rootElement.querySelector(this.selectors.panel) // Findet das Bedienfeld
        this.playButtonElement = this.rootElement.querySelector(this.selectors.playButton) // Findet den Wiedergabe-Button
        this.bindEvents() 
    }

    
    onPlayButtonClick = () => {
        this.videoElement.play() 
        this.videoElement.controls = true // Aktiviert die standardmäßigen Videosteuerungen
        this.panelElement.classList.remove(this.stateClasses.isActive) // Blendet das Bedienfeld aus
    }

    // Pause des Videos
    onVideoPause = () => {
        this.videoElement.controls = false // Deaktiviert die standardmäßigen Videosteuerungen
        this.panelElement.classList.add(this.stateClasses.isActive) // Zeigt das Bedienfeld an
    }
    
    bindEvents() {
    this.playButtonElement.addEventListener('click', this.onPlayButtonClick) 
    this.videoElement.addEventListener('pause', this.onVideoPause) // Fügt einen Event-Listener für das Pause-Ereignis des Videos hinzu
    }
}

// Initialisierung aller Videoplayer auf der Seite
class VideoPlayerCollection {

    constructor() {
        this.init()
    }

   // Initialisiert alle Instanzen von VideoPlayer
    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new VideoPlayer(element) // Erstellt eine neue Instanz von VideoPlayer für jedes Element
        })
    }
}

// Exportiert VideoPlayerCollection als Standardmodul
export default VideoPlayerCollection