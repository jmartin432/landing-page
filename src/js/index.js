// let isMobile = false
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise();

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
    const borders = []
    const radius = .93
    const numPoints = 8
    const angleStep = (Math.PI * 2) / numPoints;
    let noiseStep = .005

    function noise(x, y) {
        return simplex.noise2D(x, y);
    }

    const createPoints = function () {
        for (let i = 0; i < borderedElements.length; i++) {
            let points = []
            for (let i = 0; i < numPoints; i++) {
                let theta = i * angleStep;

                let anchor = {
                    type: 'anchor',
                    x: Math.cos(theta) * radius,
                    y: Math.sin(theta) * radius,
                }

                let noiseOffsetX = Math.random() * 1000
                let noiseOffsetY = Math.random() * 1000
                let rDelta = .1 * noise(noiseOffsetX, noiseOffsetY)

                let controlPoint = {
                    type: 'control',
                    x: Math.cos(theta + (1 / 3) * angleStep) * (radius + rDelta),
                    y: Math.sin(theta + (1 / 3) * angleStep) * (radius + rDelta),
                    noiseOffsetX: noiseOffsetX,
                    noiseOffsetY: noiseOffsetY,
                }

                let controlPointReflected = {
                    type: 'reflected-control',
                    x: 2 * anchor.x - controlPoint.x,
                    y: 2 * anchor.y - controlPoint.y,
                }

                points.push(controlPointReflected, anchor, controlPoint);
            }
            borders.push(points)
        }
    }

    const updatePoints = function() {
        if (borders.length === 0) return
        for (let i = 0; i < borders.length; i++) {
            let points = borders[i];
            for (let j = 0; j < numPoints; j++) {
                let theta = j * angleStep;

                const reflectedControlPoint = points[3 * j]
                const anchor = points[3 * j + 1]
                const controlPoint = points[3 * j + 2];

                let noiseOffsetX = controlPoint.noiseOffsetX
                let noiseOffsetY = controlPoint.noiseOffsetY
                let rDelta = .1 * noise(noiseOffsetX, noiseOffsetY)

                controlPoint.x = Math.cos(theta + (1 / 3) * angleStep) * (radius + rDelta);
                controlPoint.y = Math.sin(theta + (1 / 3) * angleStep) * (radius + rDelta);

                controlPoint.noiseOffsetX += noiseStep;
                controlPoint.noiseOffsetY += noiseStep;

                reflectedControlPoint.x = 2 * anchor.x - controlPoint.x
                reflectedControlPoint.y = 2 * anchor.y - controlPoint.y
            }
        }
    }

    const makePath = function(points) {
        let data = 'M ' + points[1].x + ' ' + points[1].y;
        for (let i = 2; i < points.length - 2; i += 3) {
            data = data + ' C ' + points[i].x + ' ' + points[i].y + ' ' +
                points[i + 1].x + ' ' + points[i + 1].y + ' ' +
                points[i + 2].x + ' ' + points[i + 2].y
        }
        // here we are adding the last control point  which is a reflection of the first control point and then
        // adding the last anchor point to close the loop
        data = data + ' C ' + points[points.length - 1].x + ' ' + points[points.length - 1].y + ' ' +
            points[0].x + ' ' + points[0].y + ' ' +
            points[1].x + ' ' + points[1].y
        return data
    }

    const setPathData = function() {
        borders.forEach((points, index) => {
            borderedElements[index].setAttribute('d', makePath(points))
        })
    }

    const animateBorders = function() {
        updatePoints()
        borders.forEach((points, index) => {
            borderedElements[index].setAttribute('d', makePath(points))
        })
        requestAnimationFrame(animateBorders)
    }

    return {
        createPoints: createPoints,
        setPathData: setPathData,
        updatePoints: updatePoints,
        animateBorders: animateBorders
    }
})

function setSizesAndMargins(mobile) {
    let windowWidth = window.innerWidth
    let fontSize = Math.floor(windowWidth * .048)
    let headerImageSize = Math.floor(windowWidth * .25)

    let header = document.getElementById('header')
    let headerSvg = document.getElementById('header-svg')
    header.style.fontSize = (fontSize + 10).toString() + "px"
    headerSvg.setAttribute('width', headerImageSize.toString())
    headerSvg.setAttribute('height', headerImageSize.toString())

    let linkContainers = document.querySelectorAll('.link-container')
    let links = document.querySelectorAll('.link-text')
    for (let i = 0; i < linkContainers.length; i++) {
        // linkContainers[i].style.margin = mobile ? "40px auto 40px auto" : "20px auto 20px auto"
        // linkContainers[i].style.padding = mobile ? "20px auto 20px auto" : "10px auto 10px auto"
        links[i].style.fontSize = fontSize.toString() + "px"
    }
}

function setColors() {
    let borderPaths = document.getElementsByClassName('border-path')
    let borderGlowPaths = document.getElementsByClassName('border-glow-path')
    let links = document.getElementsByClassName('link')
    for (let i = 0; i < borderPaths.length; i++) {
        let hue = Math.floor(Math.random() * 360)
        borderPaths[i].setAttribute('stroke', 'hsl(' + hue.toString() + ',100%,50%)')
        borderGlowPaths[i].setAttribute('stroke', 'hsl(' + hue.toString() + ',50%,65%)')
        if (i > 0) {
            links[i-1].style.backgroundColor = 'hsl(' + hue.toString() + ',50%,75%)'
        }
    }
}

// function setListeners() {
//     let buttons = document.getElementsByClassName('link-container')
//     for (let i = 0; i < buttons.length; i++) {
//         let button = buttons[i];
//         button.addEventListener('click', handleClick)
//     }
// }

    function setLinks(mobile) {
        if (mobile) {
             document.getElementById('instagram-a')
                .setAttribute('href', 'instagram://user?username=jugglingtallguy')
            document.getElementById('venmo-a')
                .setAttribute('href', 'https://www.venmo.com/justinlmartin?txn=pay')

        }
    }



window.onload = (event) => {
    setColors()
    // setListeners()
    detectMobile.then((value) => {
        setLinks(value)
        setSizesAndMargins(value);
    })
    const borderController = borderControl()
    borderController.createPoints()
    borderController.setPathData()
    borderController.animateBorders()
}

window.onresize = (event) => {
    detectMobile.then((value) => {
        setSizesAndMargins(value);
    })
}