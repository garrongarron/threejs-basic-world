let canvas = document.querySelector('canvas');
canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock;

canvas.onclick = function () {
    canvas.requestPointerLock();
};
let delta = {
    x: 0,
    y: 0,
}
let acumulated = {
    x: 0,
    y: 0,
}


let updatePosition = (e) => {
    delta.x = e.movementX;
    delta.y = e.movementY;
    acumulated.x += e.movementX;
    acumulated.y += e.movementY;
}
let lockChangeAlert = () => {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        document.addEventListener("mousemove", updatePosition, false);
    } else {
        console.log('The pointer lock status is now unlocked');
        document.removeEventListener("mousemove", updatePosition, false);
    }
}
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

export default delta
export { acumulated }