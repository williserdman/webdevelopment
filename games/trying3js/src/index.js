
import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import EventHandler from "./EventHandler.js";
import GameEngine from "./GameEngine.js";

const FOV = 75;
const NEAR_BOUND = 0.1;
const FAR_BOUND = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    FOV, //field of view
    window.innerWidth / window.innerHeight, //aspect ratio
    NEAR_BOUND, //close clipping bound
    FAR_BOUND //far clipping bound
)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let canvas = renderer.domElement;
canvas.onclick = () => {
    canvas.requestPointerLock();
    canvas.requestFullscreen();
}

const baseGeometry = new THREE.BoxGeometry(100, 2, 100);
const wallGeometry = new THREE.BoxGeometry(100, 10, 2)
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const green = new THREE.MeshBasicMaterial({color: 0x00ff00});
const red = new THREE.MeshBasicMaterial({color: 0xff0000});
const blue = new THREE.MeshBasicMaterial({color: 0x0000ff});

const floor = new THREE.Mesh(baseGeometry, green);
const roof = new THREE.Mesh(baseGeometry, red);
const wall = new THREE.Mesh(wallGeometry, blue);
const wall2 = new THREE.Mesh(wallGeometry, blue);
const box = new THREE.Mesh(boxGeometry, blue);

roof.position.set(0, 10, 0)
wall.position.set(0, 5, 50);
wall2.position.set(0, 5, -50)

scene.add(wall2);
//scene.add(wall);
scene.add(roof);
scene.add(floor);
scene.add(box);

//camera.position.x = 5;
camera.position.y = 5;

let camBuffer, xBuffer, yBuffer;
const events = new EventHandler();
let clock = new THREE.Clock();
let timeDelta;
const game = new GameEngine();

camera.rotation.set(0, 0, 0, "YXZ")
function animate() {

    camBuffer = camera.rotation.y;
    camera.rotation.y -= (events.mousePosition.changeX / window.innerWidth) * 2*Math.PI;
    if (isNaN(camera.rotation.y)) camera.rotation.y = camBuffer;
    if (events.mousePosition.changeX === xBuffer) events.mousePosition.changeX = 0;
    xBuffer = events.mousePosition.changeX;

    camBuffer = camera.rotation.x;
    camera.rotation.x -= (events.mousePosition.changeY / window.innerHeight) * 2*Math.PI;
    if (isNaN(camera.rotation.x)) camera.rotation.x = camBuffer;
    if (events.mousePosition.changeY === yBuffer) events.mousePosition.changeY = 0;
    yBuffer = events.mousePosition.changeY;
    if (camera.rotation.x >= Math.PI / 2) camera.rotation.x = Math.PI / 2;
    if (camera.rotation.x <= -Math.PI / 2) camera.rotation.x = -Math.PI / 2;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}

animate();
