import Animator from './Animator.js'

let n = 26
class StateMachine
{
    constructor(character){
        this.anim = new Animator(character)
    }
    set(state){
        if(state =='up'){
            n = 36//49//
        } else if (state =='down'){
            n = 35//48
        } else if (state =='idle'){
            n = 26
        } else {
            n = 26
        }
        this.anim.action(n)
    }
}



export default StateMachine