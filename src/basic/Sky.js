import shaders from './SkyShaders.js'

let setSky = (scene) => {

    const uniforms = {
        "topColor": { value: new THREE.Color(0x0077ff) },
        "bottomColor": { value: new THREE.Color(0xffffff) },
        "offset": { value: 33 },
        "exponent": { value: 0.6 }
    };

    const skyGeo = new THREE.SphereGeometry(400, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shaders._VS,
        fragmentShader: shaders._FS,
        side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
}

export default  setSky 