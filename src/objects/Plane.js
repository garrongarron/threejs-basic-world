import shaderLoader from '../basic/ShaderLoader.js'

//textures
var oceanTexture = new THREE.ImageUtils.loadTexture('images/dirt-512.jpg');
oceanTexture.wrapS = oceanTexture.wrapT = THREE.RepeatWrapping;

var sandyTexture = new THREE.ImageUtils.loadTexture('images/sand-512.jpg');
sandyTexture.wrapS = sandyTexture.wrapT = THREE.RepeatWrapping;

var grassTexture = new THREE.ImageUtils.loadTexture('images/grass-512.jpg');
grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;

var rockyTexture = new THREE.ImageUtils.loadTexture('images/rock-512.jpg');
rockyTexture.wrapS = rockyTexture.wrapT = THREE.RepeatWrapping;

var snowyTexture = new THREE.ImageUtils.loadTexture('images/snow-512.jpg');
snowyTexture.wrapS = snowyTexture.wrapT = THREE.RepeatWrapping;


//uniforms
let customUniforms = {
    delta: { value: 0 },
    u_octaves: { value: 2 },
    u_amplitud: { value: 0.5 },
    u_frequency: { value: 1.5 },
    u_height: { value: 100},
    oceanTexture: { type: "t", value: oceanTexture },
    sandyTexture: { type: "t", value: sandyTexture },
    grassTexture: { type: "t", value: grassTexture },
    rockyTexture: { type: "t", value: rockyTexture },
    snowyTexture: { type: "t", value: snowyTexture },
};


let loadPlane = (scene) => {
    shaderLoader('vsFile', 'fsFile', (shaders) => {
        var material = new THREE.ShaderMaterial({
            wireframe: false,//true
            uniforms: customUniforms,
            vertexShader: shaders[0],
            fragmentShader: shaders[1]
        });
        let geometry = new THREE.PlaneGeometry(500, 500, 100, 100);

        const plane = new THREE.Mesh(
            geometry,
            material
        );
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane)
    })
}



export default loadPlane