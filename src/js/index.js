import * as setup from 'setup.js'
import {links} from './linkData'
import {Border} from "./Border";

const detectMobile = new Promise((resolve, reject) => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    let mobile = toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
    resolve (mobile)
})

const borderControl = (function() {
    const borderedElements = document.querySelectorAll('.border')
    const eyeGradientStops = document.getElementsByClassName('gradient-stop')
    const borders = []
    const radius = .93
    const numPoints = 8
    const angleStep = (Math.PI * 2) / numPoints;
    let noiseStep = .005
    const gradientStopColors = []

    const parseGradientStopColors = function() {
        for (let i = 0; i < eyeGradientStops.length; i++) {
            let hslString = eyeGradientStops[i].getAttribute('stop-color')
            let hsl = hslString.replace("hsl(", "")
                .replace("%", "")
                .replace("%", "")
                .replace(")", "")
                .split(",")
            let offsetString = eyeGradientStops[i].getAttribute('offset')
            let offset = offsetString.replace("%", "")
            gradientStopColors.push({
                h: hsl[0],
                s: hsl[1],
                l: hsl[2],
                offset: offset
            })
        }
        console.log(gradientStopColors)
    }

    const updateGradientStopColors = function() {
        gradientStopColors.forEach((color, index) => {
            color.h = (color.h + 1) % 360
            eyeGradientStops[index]
                .setAttribute("stop-color", 'hsl(' + color.h.toString() + ',50%,75%)')

        })
        // Not liking this :(
        // if (gradientStopColors.length > 1) {
        //     gradientStopColors[1].offset = (gradientStopColors[1].offset + 1) % 100;
        //     eyeGradientStops[1].setAttribute('offset', gradientStopColors[1].offset.toString() + '%')
        // }
    }


    // const updatePoints = function() {
    //     if (borders.length === 0) return
    //     for (let i = 0; i < borders.length; i++) {
    //         let points = borders[i];
    //         for (let j = 0; j < numPoints; j++) {
    //             let theta = j * angleStep;
    //
    //             const reflectedControlPoint = points[3 * j]
    //             const anchor = points[3 * j + 1]
    //             const controlPoint = points[3 * j + 2];
    //
    //             let noiseOffsetX = controlPoint.noiseOffsetX
    //             let noiseOffsetY = controlPoint.noiseOffsetY
    //             let rDelta = .1 * noise(noiseOffsetX, noiseOffsetY)
    //
    //             controlPoint.x = Math.cos(theta + (1 / 3) * angleStep) * (radius + rDelta);
    //             controlPoint.y = Math.sin(theta + (1 / 3) * angleStep) * (radius + rDelta);
    //
    //             controlPoint.noiseOffsetX += noiseStep;
    //             controlPoint.noiseOffsetY += noiseStep;
    //
    //             reflectedControlPoint.x = 2 * anchor.x - controlPoint.x
    //             reflectedControlPoint.y = 2 * anchor.y - controlPoint.y
    //         }
    //     }
    // }

    const setPathData = function() {
        borders.forEach((points, index) => {
            borderedElements[index].setAttribute('d', makePath(points))
        })
    }

    const animateBorders = function() {
        updatePoints()
        updateGradientStopColors()
        borders.forEach((points, index) => {
            borderedElements[index].setAttribute('d', makePath(points))
        })
        requestAnimationFrame(animateBorders)
    }

    return {
        createPoints: createPoints,
        setPathData: setPathData,
        updatePoints: updatePoints,
        animateBorders: animateBorders,
        parseGradientStopColors: parseGradientStopColors
    }
})

function setSizesAndMargins(mobile) {
    let windowWidth = window.innerWidth
    let fontSize = Math.floor(windowWidth * .048)
    let headerImageSize = Math.floor(windowWidth * .25)

    let header = document.getElementById('header')
    let headerSvg = document.getElementById('header-svg')
    header.style.fontSize = (fontSize + 10).toString() + "px"
    // headerSvg.setAttribute('width', headerImageSize.toString())
    // headerSvg.setAttribute('height', headerImageSize.toString())

    let linkContainers = document.querySelectorAll('.link-container')
    let links = document.querySelectorAll('.link-text')
    for (let i = 0; i < linkContainers.length; i++) {
        linkContainers[i].style.margin = mobile ? "65px auto" : "25px auto"
        links[i].style.fontSize = fontSize.toString() + "px"
    }
}

function setColors() {
    console.log('here')
    let borders = document.getElementsByClassName('border')
    let borderGlows = document.getElementsByClassName('border-glow')
    let links = document.getElementsByClassName('link')
    for (let i = 0; i < borders.length; i++) {
        let hue = Math.floor(Math.random() * 360)
        borders[i].setAttribute('stroke', 'hsl(' + hue.toString() + ',100%,50%)')
        borderGlows[i].setAttribute('stroke', 'hsl(' + hue.toString() + ',50%,65%)')
        if (i > 0) {
            links[i-1].style.backgroundColor = 'hsl(' + hue.toString() + ',50%,75%)'
        }
    }
    let eyeGradientStops = document.getElementsByClassName('gradient-stop')
    for (let i = 0; i < eyeGradientStops.length; i++) {
        let hue = Math.floor(Math.random() * 360)
        eyeGradientStops[i].setAttribute('stop-color', 'hsl(' + hue.toString() + ',50%,75%)')
    }
}

// function setListeners() {
//     let buttons = document.getElementsByClassName('link-container')
//     for (let i = 0; i < buttons.length; i++) {
//         let button = buttons[i];
//         button.addEventListener('click', handleClick)
//     }
// }


window.onload = (event) => {
    let borders = []
    for (let i = 0; i < links.length + 2; i++) {
        borders.push(new Border(8, .93, .005))
    }
    console.log(borders)
    setup.makeFooter()
    setup.makeSvgDefs(borders)
    setup.makeHeader()
   // // setColors()
   //  // setListeners()
    detectMobile.then((value) => {
        setup.makeLinks(value)
        setSizesAndMargins(value);
    })
}

window.onresize = (event) => {
    detectMobile.then((value) => {
        setSizesAndMargins(value);
    })
}