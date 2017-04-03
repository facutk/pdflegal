const incCounter = () => ({
    type: 'INCREMENT'
})

const decCounter = () => ({
    type: 'DECREMENT'
})

module.exports = {
    incCounter,
    decCounter
}