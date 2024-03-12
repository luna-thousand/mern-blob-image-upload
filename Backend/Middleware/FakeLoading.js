const FakeTime = () => {
    const times = [500, 1500, 200],
    i = Math.floor(Math.random() * times.length)
    return times[i]
}

module.exports = (req, res, next) => setTimeout(() => next(), FakeTime())