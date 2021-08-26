// let isMobile = false
import SimplexNoise from 'simplex-noise';

const points = []

const simplex = new SimplexNoise();

// how fast we progress through "time"
let noiseStep = 0.005;

function noise(x, y) {
    // return a value at {x point in time} {y point in time}
    return simplex.noise2D(x, y);
}

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

function makePath() {
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
    // console.log(data)
    return data
}

function makePathPoints() {
    const numPoints = 8;
    const angleStep = (Math.PI * 2) / numPoints;
    let radius = .95;

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
        // console.log(rDelta, radius + rDelta)
        // console.log(Math.cos(theta + (1 / 3) * angleStep) * (radius + rDelta))
        // console.log(Math.sin(theta + (1 / 3) * angleStep) * (radius + rDelta))

        let controlPoint = {
            type: 'control',
            x: Math.cos(theta + (1 / 3) * angleStep) * (radius + rDelta),
            y: Math.sin(theta + (1 / 3) * angleStep) * (radius + rDelta),
            noiseOffsetX: noiseOffsetX,
            noiseOffsetY: noiseOffsetY,
        }
        console.log(controlPoint)
        console.log(points)

        let controlPointReflected = {
            type: 'reflected-control',
            x: 2 * anchor.x - controlPoint.x,
            y: 2 * anchor.y - controlPoint.y,
        }

        points.push(controlPointReflected, anchor, controlPoint);
    }
    // console.log(points)
    // alert()
    // return points;
}

function updatePathPoints(){
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
        // console.log(rDelta, radius + rDelta)

        controlPoint.x = Math.cos(theta + (1 / 3) * angleStep) * (radius + rDelta);
        controlPoint.y = Math.sin(theta + (1 / 3) * angleStep) * (radius + rDelta);

        controlPoint.noiseOffsetX += noiseStep;
        controlPoint.noiseOffsetY += noiseStep;

        reflectedControlPoint.x = 2 * anchor.x - controlPoint.x
        reflectedControlPoint.y = 2 * anchor.y - controlPoint.y
    }
    // console.log(points)
    // alert()
}

function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function animate() {
    const headerClipPath = document.getElementById('header-svg-clip-path')
    const headerSvgPath = document.getElementById('header-svg-path')
    updatePathPoints()
    const path = makePath()
    headerClipPath.setAttribute('d', path)
    headerSvgPath.setAttribute('d', path)
    requestAnimationFrame(animate);
}

function setButtonMargins(mobile) {
    let linkContainers = document.querySelectorAll('.link-container')
    if (mobile)
        for (let i = 0; i < linkContainers.length; i++){
            let container = linkContainers[i];
            container.style.margin = "40px auto 40px auto"
            container.style.padding = "20px auto 20px auto"
        }
    else
        for (let i = 0; i < linkContainers.length; i++){
            let container = linkContainers[i];
            container.style.margin = "20px auto 20px auto"
            container.style.padding = "10px auto 10px auto"
        }
}

function setIconTextSize() {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let links = document.querySelectorAll('.link-text')
    let linkIcons = document.querySelectorAll('.link-icon')
    let header = document.querySelectorAll('h1')
    let headerImage = document.getElementById('header-image')
    let headerSvg = document.getElementById('header-svg')
    let headerSvgPath = document.getElementById('header-svg-path')
    let fontSize = Math.floor(windowWidth * .05)
    let headerImageSize = Math.floor(windowWidth * .25)
    for (let i = 0; i < links.length; i++){
        let link = links[i];
        let icon = linkIcons[i];
        link.style.fontSize = fontSize.toString() + "px"
        icon.width = fontSize.toString()
    }
    header[0].style.fontSize = (fontSize + 10).toString() + "px"
    headerImage.setAttribute('width', headerImageSize.toString())
    headerImage.setAttribute('height', headerImageSize.toString())
    // headerSvg.setAttribute('viewBox', '0 0 1 1')
    headerSvg.setAttribute('viewBox', '0 0 ' + headerImageSize.toString() + ' ' + headerImageSize.toString())
    headerSvg.setAttribute('width', headerImageSize.toString())
    headerSvg.setAttribute('height', headerImageSize.toString())

    headerSvgPath.setAttribute('transform',
        'translate(' + (headerImageSize / 2) + ',' + (headerImageSize / 2) + ') scale(' + (headerImageSize / 2) + ')')
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



window.onload = (event) => {
    // const headerClipPath = document.getElementById('header-svg-clip-path')
    // const headerSvgPath = document.getElementById('header-svg-path')
    makePathPoints()
    detectMobile.then((value) => {
        setButtonMargins(value);
    })
    setIconTextSize();
    let buttons = document.getElementsByClassName('link-container')
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener('click', handleClick)
    }
    animate()
}

window.onresize = (event) => {
    setIconTextSize()
    detectMobile.then((value) => {
        setButtonMargins(value);
        setIconTextSize();
    })
}