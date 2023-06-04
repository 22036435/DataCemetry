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


const datas = document.getElementById("datas")
datas.style.visibility='hidden'
const data1 = document.getElementById("data1")
data1.style.visibility='hidden'
const data2 = document.getElementById("data2")
data2.style.visibility='hidden'
const data3 = document.getElementById("data3")
data3.style.visibility='hidden'
const data4 = document.getElementById("data4")
data4.style.visibility='hidden'
const data5 = document.getElementById("data5")
data5.style.visibility='hidden'
const data6 = document.getElementById("data6")
data6.style.visibility='hidden'
const data7 = document.getElementById("data7")
data7.style.visibility='hidden'
const data8 = document.getElementById("data8")
data8.style.visibility='hidden'
const data9 = document.getElementById("data9")
data9.style.visibility='hidden'
const data10 = document.getElementById("data10")
data10.style.visibility='hidden'
const data11 = document.getElementById("data11")
data11.style.visibility='hidden'
const data12 = document.getElementById("data12")
data12.style.visibility='hidden'
const data13 = document.getElementById("data13")
data13.style.visibility='hidden'
const data14 = document.getElementById("data14")
data14.style.visibility='hidden'
const data15 = document.getElementById("data15")
data15.style.visibility='hidden'
const data16 = document.getElementById("data16")
data16.style.visibility='hidden'
const data17 = document.getElementById("data17")
data17.style.visibility='hidden'
const data18 = document.getElementById("data18")
data18.style.visibility='hidden'
const data19 = document.getElementById("data19")
data19.style.visibility='hidden'
const data20 = document.getElementById("data20")
data20.style.visibility='hidden'

const s1 = document.getElementById("s1")
s1.addEventListener("mouseenter", (event) => {
    console.log('mouseentered')
    const data1 = document.getElementById("data1")
    datas.style.visibility='visible'
    data1.style.visibility='visible'
})
s1.addEventListener("mouseout", (event) => {
    console.log('mouseout')
    const data1 = document.getElementById("data1")
    datas.style.visibility='hidden'
    data1.style.visibility='hidden'
})

const s2 = document.getElementById("s2")
s2.addEventListener("mouseenter", (event) => {
    console.log('mouseentered2')
    const data2 = document.getElementById("data2")
    datas.style.visibility='visible'
    data2.style.visibility='visible'
})
s2.addEventListener("mouseout", (event) => {
    console.log('mouseout2')
    const data2 = document.getElementById("data2")
    datas.style.visibility='hidden'
    data2.style.visibility='hidden'
})

const s3 = document.getElementById("s3")
s3.addEventListener("mouseenter", (event) => {
    console.log('mouseentered3')
    const data3 = document.getElementById("data3")
    datas.style.visibility='visible'
    data3.style.visibility='visible'
})
s3.addEventListener("mouseout", (event) => {
    console.log('mouseout3')
    const data3 = document.getElementById("data3")
    datas.style.visibility='hidden'
    data3.style.visibility='hidden'
})

const s4 = document.getElementById("s4")
s4.addEventListener("mouseenter", (event) => {
    console.log('mouseentered4')
    const data4 = document.getElementById("data4")
    datas.style.visibility='visible'
    data4.style.visibility='visible'
})
s4.addEventListener("mouseout", (event) => {
    console.log('mouseout4')
    const data4 = document.getElementById("data4")
    datas.style.visibility='hidden'
    data4.style.visibility='hidden'
})

const s5 = document.getElementById("s5")
s5.addEventListener("mouseenter", (event) => {
    console.log('mouseentered5')
    const data5 = document.getElementById("data5")
    datas.style.visibility='visible'
    data5.style.visibility='visible'
})
s5.addEventListener("mouseout", (event) => {
    console.log('mouseout5')
    const data5 = document.getElementById("data5")
    datas.style.visibility='hidden'
    data5.style.visibility='hidden'
})

const s6 = document.getElementById("s6")
s6.addEventListener("mouseenter", (event) => {
    console.log('mouseentered6')
    const data6 = document.getElementById("data6")
    datas.style.visibility='visible'
    data6.style.visibility='visible'
})
s6.addEventListener("mouseout", (event) => {
    console.log('mouseout6')
    const data6 = document.getElementById("data6")
    datas.style.visibility='hidden'
    data6.style.visibility='hidden'
})

const s7 = document.getElementById("s7")
s7.addEventListener("mouseenter", (event) => {
    console.log('mouseentered7')
    const data7 = document.getElementById("data7")
    datas.style.visibility='visible'
    data7.style.visibility='visible'
})
s7.addEventListener("mouseout", (event) => {
    console.log('mouseout7')
    const data7 = document.getElementById("data7")
    datas.style.visibility='hidden'
    data7.style.visibility='hidden'
})

const s8 = document.getElementById("s8")
s8.addEventListener("mouseenter", (event) => {
    console.log('mouseentered8')
    const data8 = document.getElementById("data8")
    datas.style.visibility='visible'
    data8.style.visibility='visible'
})
s8.addEventListener("mouseout", (event) => {
    console.log('mouseout8')
    const data8 = document.getElementById("data8")
    datas.style.visibility='hidden'
    data8.style.visibility='hidden'
})

const s9 = document.getElementById("s9")
s9.addEventListener("mouseenter", (event) => {
    console.log('mouseentered9')
    const data9 = document.getElementById("data9")
    datas.style.visibility='visible'
    data9.style.visibility='visible'
})
s9.addEventListener("mouseout", (event) => {
    console.log('mouseout9')
    const data9 = document.getElementById("data9")
    datas.style.visibility='hidden'
    data9.style.visibility='hidden'
})

const s10 = document.getElementById("s10")
s10.addEventListener("mouseenter", (event) => {
    console.log('mouseentered10')
    const data10 = document.getElementById("data10")
    datas.style.visibility='visible'
    data10.style.visibility='visible'
})
s10.addEventListener("mouseout", (event) => {
    console.log('mouseout10')
    const data10 = document.getElementById("data10")
    datas.style.visibility='hidden'
    data10.style.visibility='hidden'
})

const s11 = document.getElementById("s11")
s11.addEventListener("mouseenter", (event) => {
    console.log('mouseentered11')
    const data11 = document.getElementById("data11")
    datas.style.visibility='visible'
    data11.style.visibility='visible'
})
s11.addEventListener("mouseout", (event) => {
    console.log('mouseout11')
    const data11 = document.getElementById("data11")
    datas.style.visibility='hidden'
    data11.style.visibility='hidden'
})

const s12 = document.getElementById("s12")
s12.addEventListener("mouseenter", (event) => {
    console.log('mouseentered12')
    const data12 = document.getElementById("data12")
    datas.style.visibility='visible'
    data12.style.visibility='visible'
})
s12.addEventListener("mouseout", (event) => {
    console.log('mouseout12')
    const data12 = document.getElementById("data12")
    datas.style.visibility='hidden'
    data12.style.visibility='hidden'
})

const s13 = document.getElementById("s13")
s13.addEventListener("mouseenter", (event) => {
    console.log('mouseentered13')
    const data13 = document.getElementById("data13")
    datas.style.visibility='visible'
    data13.style.visibility='visible'
})
s13.addEventListener("mouseout", (event) => {
    console.log('mouseout13')
    const data13 = document.getElementById("data13")
    datas.style.visibility='hidden'
    data13.style.visibility='hidden'
})

const s14 = document.getElementById("s14")
s14.addEventListener("mouseenter", (event) => {
    console.log('mouseentered14')
    const data14 = document.getElementById("data14")
    datas.style.visibility='visible'
    data14.style.visibility='visible'
})
s14.addEventListener("mouseout", (event) => {
    console.log('mouseout14')
    const data14 = document.getElementById("data14")
    datas.style.visibility='hidden'
    data14.style.visibility='hidden'
})

const s15 = document.getElementById("s15")
s15.addEventListener("mouseenter", (event) => {
    console.log('mouseentered15')
    const data15 = document.getElementById("data15")
    datas.style.visibility='visible'
    data15.style.visibility='visible'
})
s15.addEventListener("mouseout", (event) => {
    console.log('mouseout15')
    const data15 = document.getElementById("data15")
    datas.style.visibility='hidden'
    data15.style.visibility='hidden'
})

const s16 = document.getElementById("s16")
s16.addEventListener("mouseenter", (event) => {
    console.log('mouseentered16')
    const data16 = document.getElementById("data16")
    datas.style.visibility='visible'
    data16.style.visibility='visible'
})
s16.addEventListener("mouseout", (event) => {
    console.log('mouseout16')
    const data16 = document.getElementById("data16")
    datas.style.visibility='hidden'
    data16.style.visibility='hidden'
})

const s17 = document.getElementById("s17")
s17.addEventListener("mouseenter", (event) => {
    console.log('mouseentered17')
    const data17 = document.getElementById("data17")
    datas.style.visibility='visible'
    data17.style.visibility='visible'
})
s17.addEventListener("mouseout", (event) => {
    console.log('mouseout17')
    const data17 = document.getElementById("data17")
    datas.style.visibility='hidden'
    data17.style.visibility='hidden'
})

const s18 = document.getElementById("s18")
s18.addEventListener("mouseenter", (event) => {
    console.log('mouseentered18')
    const data18 = document.getElementById("data18")
    datas.style.visibility='visible'
    data18.style.visibility='visible'
})
s18.addEventListener("mouseout", (event) => {
    console.log('mouseout18')
    const data18 = document.getElementById("data18")
    datas.style.visibility='hidden'
    data18.style.visibility='hidden'
})

const s19 = document.getElementById("s19")
s19.addEventListener("mouseenter", (event) => {
    console.log('mouseentered19')
    const data19 = document.getElementById("data19")
    datas.style.visibility='visible'
    data19.style.visibility='visible'
})
s19.addEventListener("mouseout", (event) => {
    console.log('mouseout19')
    const data19 = document.getElementById("data19")
    datas.style.visibility='hidden'
    data19.style.visibility='hidden'
})

const s20 = document.getElementById("s20")
s20.addEventListener("mouseenter", (event) => {
    console.log('mouseentered20')
    const data20 = document.getElementById("data20")
    datas.style.visibility='visible'
    data20.style.visibility='visible'
})
s20.addEventListener("mouseout", (event) => {
    console.log('mouseout20')
    const data20 = document.getElementById("data20")
    datas.style.visibility='hidden'
    data20.style.visibility='hidden'
})

let hoveredStone;

function clearHoveredStone() {
  if(hoveredStone) {
    hoveredStone.material = new THREE.MeshBasicMaterial({color: "black"})
    hoveredStone = undefined;
  } 
}


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    raycaster.setFromCamera(mouse, camera)
    
    if(stones){

        stones.updateMatrixWorld(true);

        const intersects = raycaster.intersectObject(stones)

        clearHoveredStone();
        if(intersects.length) {
            hoveredStone = intersects[0].object;
            hoveredStone.material = new THREE.MeshBasicMaterial({color: 0xffe4a8,
                transparent: true,
                opacity: 0.3,})
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