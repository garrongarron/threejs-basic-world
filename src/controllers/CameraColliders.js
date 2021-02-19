import scene from '../Scene.js'
let radio = 10
class CameraColllider {
    check(position) {
        let ray = new THREE.Raycaster(
            new THREE.Vector3(
                position.x,
                position.y + 1,
                position.z),
            new THREE.Vector3(0, -1, 0),
            0,
            10
        );

        let tmp = ray.intersectObjects(scene.children, true).filter(obj => obj.object.name != "Box2-movil")[0]
        // console.log(tmp);
        let isGrounded = !!tmp && tmp.distance < 10
        return {
            isGrounded: isGrounded,
            radio: radio,
            tmp: tmp
        }
    }
}
let gravity = new CameraColllider()
export default gravity