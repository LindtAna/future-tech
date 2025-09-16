// Three.js-Bibliothek + OrbitControls über Skypack-CDN
import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

// Container und Canvas-Element
const container = document.querySelector('.hero__resources-preview');
if (!container) {
  console.error('Container ".hero__resources-preview" nicht gefunden!');
  throw new Error('Erforderliches DOM-Element fehlt.');
}
const canvas = container.querySelector('.webgl');
if (!canvas) {
  console.error('Canvas-Element mit Klasse ".webgl" nicht gefunden!');
  throw new Error('Erforderliches Canvas-Element fehlt.');
}

// Three.js-Szene initialisieren
const scene = new THREE.Scene();

// CSS-Variable auslesen. helpers -> _variables.scss
const yellowColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--colour-yellow')
  .trim() || '#FFD11A';

  const darkYellowColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--colour-dark-yellow')
  .trim() || '#5B480B'; 
console.log('Fetched colors:', yellowColor, darkYellowColor);

// Parameter für die Galaxie-Generierung
const parameters = {
  count: 100000,             // Anzahl der Partikel
  size: 0.01,                // Partikelgröße
  radius: 2.15,              // Maximaler Galaxienradius
  branches: 4,               // Anzahl der Spiral-Arme
  spin: 4,                   // Drehung der Spiralarme
  randomness: 5,             // Stärke der Abweichung
  randomnessPower: 5,        // Exponent für Randomisierung
  insideColor: yellowColor,  // Farbe im Zentrum
  outsideColor: darkYellowColor   // Farbe am Rand (Hex ohne Alpha ff!!)
};

// Globale Variablen für Geometrie, Material und Points-Objekt
let geometry = null;
let material = null;
let points = null;

/**
 Hilfsfunktion: Erzeugt eine zufällige Verschiebung mit angegebener Stärke und Exponent
 power{number}  - exponent für Zufall (höhere Werte => stärkere Tendenz zu kleinen Abständen)
 param scale{number} - max absolute Verschiebung
returns Zufallswert zwischen -scale und +scale
 */
function randomOffset(power, scale) {
  const value = Math.pow(Math.random(), power) * scale;
  // Zufällig Vorzeichen wählen
  return Math.random() < 0.2 ? value : -value;
}


//Generiert oder regeneriert die Galaxie aus Punkten
const generateGalaxy = () => {
  // Alte Geometrie und Material entsorgen, um Speicherlecks zu vermeiden
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  // Partikel
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    opacity: 1.0
  });

  // Leere BufferGeometry aufsetzen
  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors    = new Float32Array(parameters.count * 3);
  const colorInside  = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  // Punkte verteilen
  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    // Radius-Berechnung mit Randomness und exponentiellem Spin
    const radius    = Math.pow(Math.random() * parameters.randomness, Math.random() * parameters.radius);
    const spinAngle = radius * parameters.spin;
    const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    // Zufällige Versätze entlang jeder Achse
    positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomOffset(parameters.randomnessPower, parameters.randomness);
    positions[i3 + 1] = randomOffset(parameters.randomnessPower, parameters.randomness);
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomOffset(parameters.randomnessPower, parameters.randomness);

    // Farbinterpolation zwischen Innen- und Außenfarbe
    const mixedColor = colorInside.clone().lerp(colorOutside, Math.random() * (radius / parameters.radius));
    colors[i3    ] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  // Attribute zuweisen
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3));

  // Points-Objekt erstellen und zur Szene hinzufügen
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

// Erste Generierung der Galaxie
generateGalaxy();

// Viewport-Größe anhand des Containers setzen
const sizes = {
  width:  container.clientWidth,
  height: container.clientHeight
};

// Kamera anlegen
const camera = new THREE.PerspectiveCamera(
  75,                               // Field of View
  sizes.width / sizes.height,       // Seitenverhältnis
  0.1,                              // Nah-Clipping
  100                               // Fern-Clipping
);
camera.position.set(3, 3, 3);       // Startposition der Kamera
scene.add(camera);

// OrbitControls für Interaktion über das Canvas
const controls = new OrbitControls(camera, canvas);
// Weiche Kamerabewegungen
controls.enableDamping = true;

// WebGL-Renderer erstellen
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Maximale Pixeldichte


//Passt Kamera und Renderer an neue Fenstergröße an
const resizeHandler = () => {
  sizes.width  = container.clientWidth;
  sizes.height = container.clientHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
};
window.addEventListener('resize', resizeHandler);


// Initiale Anpassung
resizeHandler();


//Animations-Loop: Kamera rotieren, Controls updaten, Szene rendern

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();


  controls.update(); // Inertia-Effekt der Dämpfung


  // Automatische Kamerarotation um die Y-Achse
  const radius = 3;
  camera.position.x = Math.cos(elapsedTime * 0.05) * radius;
  camera.position.z = Math.sin(elapsedTime * 0.05) * radius;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
