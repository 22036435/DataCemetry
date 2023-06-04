import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Material } from 'three'
import GSAP from 'gsap'
import { Light } from 'three'

// Texture loader
const textureLoader = new THREE.TextureLoader()


// Debug
const gui = new lil.GUI()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const lerp ={
    current: 0,
    target: 0,
    ease: 0.1
}

onMouseMove();

function onMouseMove(){
    window.addEventListener("mousemove", (e)=>{
        const rotation = ((e.clientX - window.innerWidth / 2)*50)/window.innerWidth;
        lerp.target = rotation;
        mouse.x = e.clientX / sizes.width * 2 - 1
        mouse.y = - (e.clientY / sizes.height) * 2 + 1
    })
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ color: 0x1F51FF })

let model = null
var children = []
var stones
var light
var plain
/**
 * Model
 */
 gltfLoader.load(
    '/resources/datacemetry.glb',
    (gltf) =>
    {
        model = gltf.scene
        stones= model.children[2]
        light=model.children[0]
        plain = model.children[1]
        model.position.y=-19
        scene.add(model)
    })

    const raycaster = new THREE.Raycaster()

    const mouse = new THREE.Vector2()

    window.addEventListener('mousemove',(event)=>{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()=>{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick',()=>{

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement){       
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        } 
    }else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        } else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = -0.1
camera.position.x= 10
camera.position.y=1
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
//controls.enabled= false
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.outputEncoding = THREE.sRGBEncoding

const parameters = {
    color: 0x1F51FF
}

gui.add(camera.position,'x', -3, 3, 0.01)
gui.add(camera.position,'y', -3, 3, 0.01)
gui.add(camera.position,'z', -3, 3, 0.01)
gui.addColor(parameters, 'color').onChange(()=>{
bakedMaterial.color.set(parameters.color)
})

/**
 * Animate
 */
const clock = new THREE.Clock()

let hoveredStone;

function clearHoveredStone() {
  if(hoveredStone) {
    hoveredStone.scale.set(1, 1, 1)
    hoveredStone = undefined;
  } 
}


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    raycaster.setFromCamera(mouse, camera)
    
    if(stones){

        const intersects = raycaster.intersectObjects(stones)

        clearHoveredStone();
        if(intersects.length) {
            hoveredStone = intersects[0].object;
            hoveredStone.scale.set(1.2, 1.2, 1.2); 
        }

    }
    
    // Update controls
    controls.update()
    
    lerp.current = GSAP.utils.interpolate(
        lerp.current,
        lerp.target,
        lerp.ease
    )
   
    if(model) model.position.z = lerp.current
   
   // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()