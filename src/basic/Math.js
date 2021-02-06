let lerp = (initial, target, percentage) => {
    return initial + percentage * (target - initial)
}
export default {
    lerp
}