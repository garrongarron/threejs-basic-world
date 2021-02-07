import keyListener from './KeyListener.js'
import machine from './Machine.js'
import ForwardBackwardAndRotation from './ForwardBackwardAndRotation.js'
import { getDelta } from './Clock.js'

let character = null
let lastN = []

let mode = {
    forwardBackwardAndRotation: 1
}

let controller = {
    up: () => console.log('up'),
    down: () => console.log('down'),
    left: () => console.log('left'),
    right: () => console.log('right'),
    noKeyPressed: () => {},
    stealth: () => {},
    sprint: () => {},
    attack: () => {},
    jump: () => {},
}

let setController = (m) => {
    if(character == null) {
        console.error("No character defined");
        return;
    }
    if (m == mode.forwardBackwardAndRotation) {
        controller = new ForwardBackwardAndRotation(character)
    }
}

let setCharacter = (c) => {
    character = c
}

keyListener.start()

machine.addCallback(() => {
    let deltaTime = getDelta();

    //softener
    lastN.push(deltaTime)
    if (lastN.length > 10) {
        deltaTime = lastN.reduce((a, b) => a + b, 0) / 11;
        lastN.shift()
    }

    let noKeyPressed = true;
    if (keyListener.isPressed(87)) {
        controller.up(deltaTime)
        noKeyPressed = false
    }
    if (keyListener.isPressed(83)) {
        controller.down(deltaTime)
        noKeyPressed = false
    }
    if (keyListener.isPressed(65)) {
        controller.left(deltaTime)
        noKeyPressed = false
    }
    if (keyListener.isPressed(68)) {
        controller.right(deltaTime)
        noKeyPressed = false
    }
    if (keyListener.isPressed(16)) {
        controller.sprint(deltaTime)
        noKeyPressed = false
    }
    if (keyListener.isPressed(32)) {
        controller.stealth(deltaTime)
        noKeyPressed = false
    }
    if (keyListener.isPressed(69)) {
        controller.attack(deltaTime)
        noKeyPressed = false
    }
    if (keyListener.isPressed(81)) {
        controller.jump(deltaTime)
        noKeyPressed = false
    }
    if(noKeyPressed){
        controller.noKeyPressed(deltaTime)
    }
})

export default setCharacter
export { mode, setController }