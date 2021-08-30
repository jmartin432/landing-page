import * as setup from './setup.js'
import * as animation from './animation'

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

function setSizesAndMargins(mobile) {
    let windowWidth = window.innerWidth
    let fontSize = Math.floor(windowWidth * .048)
    let header = document.getElementById('header')
    header.style.fontSize = (fontSize + 10).toString() + 'px'

    let linkContainers = document.querySelectorAll('.link-container')
    let links = document.querySelectorAll('.link-text')
    for (let i = 0; i < linkContainers.length; i++) {
        linkContainers[i].style.margin = mobile ? "65px auto" : "25px auto"
        links[i].style.fontSize = fontSize.toString() + "px"
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
    const borders = []
    setup.makeFooter()
    setup.makeSvgDefs(borders)
    setup.makeHeaderImage(borders)
    detectMobile.then((value) => {
        setup.makeLinks(value, borders)
        setSizesAndMargins(value);
    })
    animation.start(borders)
    // setListeners()
}

window.onresize = (event) => {
    detectMobile.then((value) => {
        setSizesAndMargins(value);
    })
}