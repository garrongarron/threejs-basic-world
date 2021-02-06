import StateMachine from './StateMachine.js'

let speed = 3 //per second
    speed = 10 //running 
let position
let angle = 90 * Math.PI / 180 //per second
let rotation

class ForwardBackwardAndRotation {

    constructor(character) {
        position = character.position
        rotation = character.rotation
        this.stateMachine = new StateMachine(character)
    }

    up(deltaTime) {
        position.set(
            position.x + Math.sin(rotation.y) * speed * deltaTime,
            position.y,
            position.z + Math.cos(rotation.y) * speed * deltaTime,
        )
        this.stateMachine.set('up')
    }

    down(deltaTime) {
        position.set(
            position.x - Math.sin(rotation.y) * speed * deltaTime,
            position.y,
            position.z - Math.cos(rotation.y) * speed * deltaTime,
        )
        this.stateMachine.set('down')
    }

    left(deltaTime) {
        rotation.y += angle * deltaTime
    }

    right(deltaTime) {
        rotation.y -= angle * deltaTime
    }

    noKeyPressed(deltaTime) {
        this.stateMachine.set('idle')
    }
}

export default ForwardBackwardAndRotation