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
    console.log('Mobile', isMobile)
    let id = event.currentTarget.id
    console.log(id)
    switch(id) {
        case 'instagram':
            if (isMobile)
                window.open("instagram://user?username=jugglingtallguy")
            else
                window.open('https://www.instagram.com/jugglingtallguy/')
            break
        case 'venmo':
            if (isMobile)
                // window.open('venmo://user?username=justinlmartin')
                window.open('https://www.venmo.com/u/justinlmartin')

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
}

window.onload = (event) => {
    isMobile = detectMobile()
    setIconTextSize()
    let buttons = document.getElementsByClassName('link-container')
    console.log(buttons)
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener('click', handleClick)
    }
}

window.onresize = (event) => {
    setIconTextSize()
}