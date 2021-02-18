import run from '../terrain/ChunkManager.js'

let loadPlane = (scene) => {
    run(scene);
    // const geometry = new THREE.PlaneGeometry(2000, 2000, 10);
    // const material = new THREE.MeshBasicMaterial({ color: 0x1A48D6, side: THREE.DoubleSide });
    // const plane = new THREE.Mesh(geometry, material);
    // plane.rotation.x = -Math.PI / 2;
    // plane.position.y = -4;
    // scene.add(plane);
}

export default loadPlane