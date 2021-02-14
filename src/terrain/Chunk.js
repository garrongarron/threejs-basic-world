import shaders from '../shaders/Shaders.js'


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



let getChunk = (x, z, scene, unit) => {
    let customUniforms = {
        u_x: { value: 0 },
        u_y: { value: 0 },
        u_octaves: { value: 8 },
        u_amplitud: { value: 0.5 },
        u_frequency: { value: 0.5 },
        u_height: { value: 50 },
        u_zoom: { value: 50 },
        oceanTexture: { type: "t", value: oceanTexture },
        sandyTexture: { type: "t", value: sandyTexture },
        grassTexture: { type: "t", value: grassTexture },
        rockyTexture: { type: "t", value: rockyTexture },
        snowyTexture: { type: "t", value: snowyTexture },
    };
    customUniforms.u_x.value = z
    customUniforms.u_y.value = x
    var material = new THREE.ShaderMaterial({
        wireframe: false,//true
        uniforms: customUniforms,
        vertexShader: shaders._VS,
        fragmentShader: shaders._FS
    });
    let geometry = new THREE.PlaneGeometry(unit, unit, 75, 75);
    let plane = new THREE.Mesh(
        geometry,
        material
    );
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    plane.position.x = x
    plane.position.z = z
    plane.position.y -= customUniforms.u_height.value/3

    scene.add(plane);
    return {
        mesh:plane,
        material:material,
        geometry:geometry
    }
}

export default getChunk