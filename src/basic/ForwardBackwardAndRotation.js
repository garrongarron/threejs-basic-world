import StateMachine from './StateMachine.js'
import machine from './Machine.js'
let speed = 3 //per second
speed = 10 //running 
let position
let angle = 90 * Math.PI / 180 //per second
let rotation
let stateDefautl = {
    up: false,
    down: false,
    left: false,
    right: false,
    up: false,
    sprint: false,
    stealth: false,
    attack: false,
    jump: false
}
let state = Object.assign({}, stateDefautl)
let stateMachine


class ForwardBackwardAndRotation {

    constructor(character) {
        position = character.position
        rotation = character.rotation
        stateMachine = new StateMachine(character)

        this.machine = machine.addCallback(() => {
            speed = 3
            if (state.sprint) speed = 10
            if (state.stealth) speed = 2

            if (!state.sprint && !state.stealth) {
                if (state.up) stateMachine.set('walkAhead')
                else if (state.down) stateMachine.set('walkBack')
                else if (state.attack) stateMachine.set('attack')
                else if (state.jump) stateMachine.set('block')
                else stateMachine.set('idle')
            } else if (state.sprint) {
                if (state.up) {
                    if (state.jump) stateMachine.set('jump')
                    else stateMachine.set('runAhead')
                } else if (state.down) stateMachine.set('runBack')
            } else if (state.stealth) {
                if (state.up) stateMachine.set('stealthAhead')
                else if (state.down) stateMachine.set('stealthBack')
                else stateMachine.set('stealth')
            }
            state = Object.assign(state, stateDefautl)
        })
    }

    up(deltaTime) {
        position.set(
            position.x + Math.sin(rotation.y) * speed * deltaTime,
            position.y,
            position.z + Math.cos(rotation.y) * speed * deltaTime,
        )
        state.up = true

    }

    down(deltaTime) {
        position.set(
            position.x - Math.sin(rotation.y) * speed * deltaTime,
            position.y,
            position.z - Math.cos(rotation.y) * speed * deltaTime,
        )
        state.down = true
    }

    left(deltaTime) {
        rotation.y += angle * deltaTime
        state.left = true
    }

    right(deltaTime) {
        rotation.y -= angle * deltaTime
        state.right = true
    }

    sprint(deltaTime) {
        state.sprint = true
    }

    stealth(deltaTime) {
        state.stealth = true
    }

    attack(deltaTime) {
        state.attack = true
    }

    jump(deltaTime) {
        state.jump = true
    }

    noKeyPressed(deltaTime) {
        // stateMachine.set('idle')
    }
}

export default ForwardBackwardAndRotation