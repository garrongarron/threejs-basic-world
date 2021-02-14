const fov = 60;
const aspect = screen.width / screen.height; //1920 / 1080;
const near = 1.0;
const far = 1000.0;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(50, 20, 0);
camera.rotation.y = Math.PI/2

export default camera