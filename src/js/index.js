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

window.onload = (event) => {
    isMobile = detectMobile()
    setIconTextSize()
}

window.onresize = (event) => {
    setIconTextSize()
}