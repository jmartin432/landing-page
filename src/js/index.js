// let isMobile = false
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise();

const svgPathHandler = (function() {
    const points = []

    function noise(x, y) {
        return simplex.noise2D(x, y);
    }

    let create = function (numPoints) {
        const angleStep = (Math.PI * 2) / numPoints;
        let radius = .90;

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
        return points
    };

    let update = function() {
        const numPoints = points.length / 3;
        const angleStep = (Math.PI * 2) / numPoints;
        let radius = .95;
        let noiseStep = .005
        for (let i = 0; i < numPoints; i++) {
            let theta = i * angleStep;

            const reflectedControlPoint = points[3 * i]
            const anchor = points[3 * i + 1]
            const controlPoint = points[3 * i + 2];

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

    let makePath = function() {
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

    return {
        points: points,
        create: create,
        update: update,
        makePath: makePath
    }
})

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

function animate(points1, points2, points3, points4, points5, points6) {
    points1.update()
    points2.update()
    points3.update()
    points4.update()
    points5.update()
    points6.update()
    document.getElementById('header-img-path').setAttribute('d', points1.makePath())
    document.getElementById('link-1-path').setAttribute('d', points2.makePath())
    document.getElementById('link-2-path').setAttribute('d', points3.makePath())
    document.getElementById('link-3-path').setAttribute('d', points4.makePath())
    document.getElementById('link-4-path').setAttribute('d', points5.makePath())
    document.getElementById('link-5-path').setAttribute('d', points6.makePath())
    requestAnimationFrame(function(timestamp) {animate(points1, points2, points3, points4, points5, points6)});
}

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
    let linkIcons = document.querySelectorAll('.link-icon')
    for (let i = 0; i < linkContainers.length; i++) {
        // linkContainers[i].style.margin = mobile ? "40px auto 40px auto" : "20px auto 20px auto"
        // linkContainers[i].style.padding = mobile ? "20px auto 20px auto" : "10px auto 10px auto"
        links[i].style.fontSize = fontSize.toString() + "px"
        linkIcons[i].width = fontSize.toString()
    }
}

function handleClick(event) {
    let id = event.currentTarget.id
    detectMobile.then((value) => {
        switch(id) {
            case 'instagram':
                if (value)
                    window.open("instagram://user?username=jugglingtallguy")
                else
                    window.open('https://www.instagram.com/jugglingtallguy/')
                break
            case 'venmo':
                if (value)
                    window.open('https://www.venmo.com/justinlmartin?txn=pay')
                else
                    window.open('https://www.venmo.com/u/justinlmartin')
                break
            case 'email':
                window.open('mailto:info@justinlmartin.com')
                break
            case 'coding-portfolio':
                window.open('https://coding-portfolio.justinlmartin.com')
                break
            case 'github':
                window.open('https://github.com/jmartin432')
                break
            default:
                return
        }
    })
}

function setColors() {
    let borderPaths = document.getElementsByClassName('border-path')
    let borderGlowPaths = document.getElementsByClassName('border-glow-path')
    let links = document.getElementsByClassName('link')
    for (let i = 0; i < borderPaths.length; i++) {
        let hue = Math.floor(Math.random() * 360)
        let hsl = 'hsl(' + hue.toString() + ',100%,59%)'
        borderPaths[i].setAttribute('stroke', 'hsl(' + hue.toString() + ',100%,50%)')
        borderGlowPaths[i].setAttribute('stroke', 'hsl(' + hue.toString() + ',50%,65%)')
        if (i > 0) {
            links[i-1].style.backgroundColor = 'hsl(' + hue.toString() + ',50%,75%)'
        }
    }
}

function setListeners() {
    let buttons = document.getElementsByClassName('link-container')
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener('click', handleClick)
    }
}

window.onload = (event) => {
    setColors()
    setListeners()
    detectMobile.then((value) => {
        setSizesAndMargins(value);
    })
    const headerImagePoints = svgPathHandler()
    const link1Points = svgPathHandler()
    const link2Points = svgPathHandler()
    const link3Points = svgPathHandler()
    const link4Points = svgPathHandler()
    const link5Points = svgPathHandler()
    headerImagePoints.create(8)
    link1Points.create(8)
    link2Points.create(8)
    link3Points.create(8)
    link4Points.create(8)
    link5Points.create(8)
    animate(headerImagePoints, link1Points, link2Points, link3Points, link4Points, link5Points)
}

window.onresize = (event) => {
    detectMobile.then((value) => {
        setSizesAndMargins(value);
    })
}