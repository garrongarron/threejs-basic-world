let lerp = (initial, target, percentage) => {
    return initial + percentage * (target - initial)
}

let clamp = (min, max, val) =>{
    return Math.min(Math.max(val, min), max)
}
export default {
    lerp,
    clamp
}