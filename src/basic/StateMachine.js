import Animator from './Animator.js'

let n = 26
let timeScale
let loop
class StateMachine {
    constructor(character) {
        this.anim = new Animator(character)
    }
    set(state) {
        timeScale = 1
        loop = false
        if (state == 'runAhead') {
            n = 36
        } else if (state == 'runBack') {
            n = 35
        } else if (state == 'walkAhead') {
            n = 49
        } else if (state == 'walkBack') {
            n = 48
        } else if (state == 'stealthAhead') {
            n = 50
        } else if (state == 'stealthBack') {
            n = 51
        } else if (state == 'stealth') {
            n = 17
        } else if (state == 'attack') {
            n = 41
            timeScale = 2
            loop = true
        } else if (state == 'block') {
            n = 10
            timeScale = 2
        } else if (state == 'jump') {
            n = 52
        } else if (state == 'idle') {
            n = 26
        } else {
            n = 26
        }
        this.anim.action(n, timeScale, loop)
    }
}



export default StateMachine