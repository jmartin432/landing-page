// let isMobile = false

const detectMobile = new Promise((resolve, reject) => {
    console.log('detect')
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
    let headerImage = document.querySelectorAll('.header-image')
    let fontSize = Math.floor(windowWidth * .05)
    let headerImageSize = Math.floor(windowWidth * .25)
    // console.log("setting Size", windowWidth, windowHeight, fontSize)
    for (let i = 0; i < links.length; i++){
        let link = links[i];
        let icon = linkIcons[i];
        link.style.fontSize = fontSize.toString() + "px"
        icon.width = fontSize.toString()
    }
    header[0].style.fontSize = (fontSize + 10).toString() + "px"
    headerImage[0].width = headerImageSize.toString()
    headerImage[0].height = headerImageSize.toString()
}

function handleClick(event) {
    let id = event.currentTarget.id
    detectMobile.then((value) => {
        console.log(id, value)
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
    detectMobile.then((value) => {
        setButtonMargins(value);
    })
    setIconTextSize();
    let buttons = document.getElementsByClassName('link-container')
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener('click', handleClick)
    }
}

window.onresize = (event) => {
    setIconTextSize()
    detectMobile.then((value) => {
        setButtonMargins(value);
        setIconTextSize();
    })
}