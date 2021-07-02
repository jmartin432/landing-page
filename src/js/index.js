let isMobile = false;

function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

function setIconTextSize() {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let links = document.querySelectorAll('.link-text')
    let linkIcons = document.querySelectorAll('.link-icon')
    let fontSize = Math.floor(windowWidth * .05)
    let x = "150"
    console.log("setting Size", windowWidth, windowHeight, fontSize)
    for (let i = 0; i < links.length; i++){
        let link = links[i];
        let icon = linkIcons[i];
        console.log(icon)
        link.style.fontSize = fontSize + "px"
        icon.width = fontSize.toString()
    }
}

function handleClick(event) {
    let id = event.target.id
    console.log(event.target.id)
    switch(id) {
        case 'instagram':
            window.open('https://www.instagram.com/jugglingtallguy/')
            break
        case 'venmo':
            window.open('https://www.venmo.com/u/jmartin432')
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



}

window.onload = (event) => {
    isMobile = detectMobile()
    setIconTextSize()
    let buttons = document.querySelectorAll('.link-container')
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener('click', handleClick)
    }
}

window.onresize = (event) => {
    setIconTextSize()
}