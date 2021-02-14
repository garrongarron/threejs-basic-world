import scene from './Scene.js'
import camera from './basic/Camera.js'
import machine from './basic/Machine.js'
// import setControls from './basic/Controls.js'


let stats = new Stats();
document.body.appendChild(stats.dom)
let renderer = new THREE.WebGLRenderer(
    { 
        //document.body.appendChild(renderer.domElement);
        canvas: document.getElementById('c'), 
        antialias: true 
    }
);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;//THREE.BasicShadowMap;
renderer.setClearColor(0xcccccc);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}, false);
// setControls(camera, renderer)
machine.addCallback(() => {
    renderer.render(scene, camera);
    stats.update()
})
machine.run()
