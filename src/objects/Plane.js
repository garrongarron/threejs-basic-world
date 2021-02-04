const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 10, 10),
    new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
    }));
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;

export default plane