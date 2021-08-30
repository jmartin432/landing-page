import * as helpers from './helpers'


let frame

function updateStopColor(stop) {
    let hsl = helpers.parseHslColorString(stop.getAttribute('stop-color'))
    hsl[0] = (hsl[0] + 1) % 360
    stop.setAttribute('stop-color', helpers.makeColor(hsl[0], hsl[1], hsl[2]))
}

export function start(borders) {

    const eyeGradientStops = document.getElementsByClassName('gradient-stop')

    function animate() {
        for (let i = 0; i < borders.length; i++) {
            borders[i].updatePoints().makePath().setPathElementData()
        }
        for (let i = 0; i < eyeGradientStops.length; i++) {
            updateStopColor(eyeGradientStops[i])
        }
    frame = requestAnimationFrame(animate)
    }

    animate()
}

export function end() {
    cancelAnimationFrame(frame)
}