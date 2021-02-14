const setControls = (camera, renderer) => {
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 2, 0);
    controls.update();
}

export default setControls
