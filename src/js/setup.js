import * as linkData from './linkData'
import * as helpers from './helpers'
import {Border} from './Border'
import {links} from "./linkData";

function makePath(id) {
	let path = document.createElementNS('http://www.w3.org/2000/svg','path')
	helpers.setAttributes(path, {
        id: id,
        class: 'svg-path border',
        // Not sure why but the following 2 attributes have to be set here,
        // not with the 'use' element that references them?????????
        'vector-effect': 'non-scaling-stroke',
        transform: 'translate(.5,.5) scale(.5)'
    })
	return path
}

function makeClipPath(id) {
	let clipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath')
    helpers.setAttributes(clipPath, {
        id: id,
        class: 'svg-clip-path',
        clipPathUnits: 'objectBoundingBox'
    })
	return clipPath
}

function makeUse(href) {
	let use = document.createElementNS('http://www.w3.org/2000/svg','use')
    helpers.setAttributes(use, {
        href: href
    })
	return use
}

export function makeSvgDefs() {
	let container = document.getElementById('svg-defs-container')
	let svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
	let defs = document.createElementNS('http://www.w3.org/2000/svg','defs')
	helpers.setAttributes(defs, {
		id: 'svg-defs'
	})

	container.appendChild(svg)
	svg.appendChild(defs)

    defs.appendChild(makePath('header-image-path'))
	let headerImageClipPath = makeClipPath('header-image-clip-path')
	headerImageClipPath.appendChild(makeUse('#header-image-path'))
    defs.appendChild(headerImageClipPath)

	defs.appendChild(makePath('header-path'))
	let headerClipPath = makeClipPath('header-clip-path')
	headerClipPath.appendChild(makeUse('#header-path'))
    defs.appendChild(headerClipPath)

	for (let i = 0; i < links.length; i++) {
		defs.appendChild(makePath('link-' + i + '-path'))
		let clipPath = makeClipPath('link-' + i + '-clip-path')
		clipPath.appendChild(makeUse('#link-' + i + '-path'))
		defs.appendChild(clipPath)
	}

	let filter = document.createElementNS('http://www.w3.org/2000/svg','filter')
 	helpers.setAttributes(filter, {
 		id: 'glow',
		x: '-10%',
		y: '-10%', width: '120%',
		height: '120%'
	})
	let blur = document.createElementNS('http://www.w3.org/2000/svg','feGaussianBlur')
	helpers.setAttributes(blur, {
		result:'coloredBlur',
		stdDeviation: '.015'
	})
	filter.appendChild(blur)
	defs.appendChild(filter)

	let gradient = document.createElementNS('http://www.w3.org/2000/svg','radialGradient')
	gradient.setAttribute('id', 'eye-gradient')
	for (let i = 0; i < 3; i++) {
		let stop = document.createElementNS('http://www.w3.org/2000/svg','stop')
		helpers.setAttributes(stop, {
			class: 'gradient-stop',
			id: 'eye-gradient-stop-' + i.toString(),
			'stop-color': helpers.makeColor(Math.floor(Math.random() * 360), 50, 75),
			offset: (i * 50).toString() + '%'
		})
		gradient.appendChild(stop)
	}

	defs.appendChild(gradient)
	svg.appendChild(defs)
	container.appendChild(svg)
}

export function defineHeaderElements() {
	let container = document.getElementById('header-image-container')
	let svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
	helpers.setAttributes(svg, {
		id: 'header-svg',
		viewBox:'0 0 1 1'
	})
	let group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
	helpers.setAttributes(group, {
		id: 'header-svg-group'
	})
	let circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	helpers.setAttributes(circle1, {
		id: 'eye-circle-1',
		cx: '.31',
		cy: '.5',
		r: '.13',
		fill: 'url(#eye-gradient)'
	})
	let circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	helpers.setAttributes(circle2, {
		id: 'eye-circle-2',
		cx: '.62',
		cy: '.425',
		r: '.13',
		fill: 'url(#eye-gradient)'
	})
	let image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	helpers.setAttributes(image, {
		class: 'header-image',
		id: 'header-image',
	    style: 'clip-path: url(#header-image-clip-path);',
		width: 1,
		height: 1
	})
	let glowBorder = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	helpers.setAttributes(glowBorder, {
		class: 'border-glow',
		id: 'header-image-border-glow',
		href: '#header-image-path',
		filter: 'url(#glow)',
		'stroke-width': '10'
	})

	let border = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	helpers.setAttributes(border, {
		class: 'border',
		id: 'header-image-border',
		href: '#header-image-path',
		'stroke-width': '2'
	})

	group.appendChild(circle1)
	group.appendChild(circle2)
	group.appendChild(image)
	group.appendChild(glowBorder)
	group.appendChild(border)
	svg.appendChild(group)
	container.appendChild(svg)
}

export function setHeaderImage() {
	let image = document.getElementById('header-image')
	helpers.setAttributes(image, {
		href: 'images/landingPageFaceEyeClip-500.png',
	})
}

export async function makeLinks(mobile) {
	let container = document.getElementById('links-container')
	for (let i = 0; i < links.length; i++) {
		let linkContainer = document.createElement('div')
		helpers.setAttributes(linkContainer, {
			class: 'link-container',
			id: 'link-' + i + '-main-container',

		})
		let linkClipContainer = document.createElement('div')
		helpers.setAttributes(linkClipContainer, {
			id: 'link-' + i + '-container',
			class: 'link-clip-div',
		})
		let linkTextBox = document.createElement('div')
		helpers.setAttributes(linkTextBox, {
			class: 'link-text-box'
		})

		let link
		if (links[i].id === 'postcard') {
			link = document.createElement('span')
			helpers.setAttributes(link, {
				class: 'link-text',
			})
			link.textContent = links[i].text
			link.addEventListener('mouseenter', function(){
				link.textContent = ''
				link.innerHTML = '<span>PO Box 14011</span><br><span>Portland OR, 97293</span>'
			})
			link.addEventListener('touchenter', function(){
				link.textContent = ''
				link.innerHTML = '<span>PO Box 14011</span><br><span>Portland OR, 97293</span>'
			})
			link.addEventListener('mouseleave', function(){
				link.innerHTML = ''
				link.textContent = 'Send Me a Postcard'
			})
			link.addEventListener('touchleave', function(){
				link.innerHTML = ''
				link.textContent = 'Send Me a Postcard'
			})
		} else {
			link = document.createElement('a')
			helpers.setAttributes(link, {
				class: 'link-text',
				href: (mobile) ? links[i].mobileLink : links[i].link,
				target: '_blank'
			})
			link.textContent = links[i].text
		}

		let linkSvgContainer = document.createElement('div')
		helpers.setAttributes(linkSvgContainer, {
			class: 'link-svg-container'
		})
		let linkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		helpers.setAttributes(linkSvg, {
			id: 'link-' + i + '-svg',
			viewBox: '0 0 1 1',
			preserveAspectRatio: 'none'
		})
		let group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		let glowBorder = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		helpers.setAttributes(glowBorder, {
			class: 'border-glow',
			id: 'link-' + i + '-border-glow',
			href: '#link-' + i + '-path',
			filter: 'url(#glow)',
			'stroke-width': '10'
		})

		let border = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		helpers.setAttributes(border, {
			class: 'border',
			id: 'link-' + i + '-border',
			href: '#link-' + i + '-path',
			'stroke-width': '2'
		})

		container.appendChild(linkContainer)

		linkContainer.appendChild(linkClipContainer)
		linkClipContainer.appendChild(linkTextBox)
		linkTextBox.appendChild(link)

		linkContainer.appendChild(linkSvgContainer)
		linkSvgContainer.appendChild(linkSvg)
		linkSvg.appendChild(group)
		group.append(glowBorder)
		group.appendChild(border)
	}
}

export function makeBorders (borders) {
	let numLinks = linkData.links.length;
	borders.push(new Border('header-image', 8, .93, .005))
	//borders.push(new Border('header', 8, .93, .005))

	for (let i = 0; i < numLinks; i++) {
		borders.push(new Border('link-' + i, 8, .93, .005))
	}

	for (let i = 0; i < borders.length; i++) {
		borders[i].createPoints().makePath().setPathElementData()
		borders[i].setBorderGlowColor()
		borders[i].setBorderColor()
		borders[i].setBackGroundColorClipPath()
	}
}

export function makeFooter() {
	let container = document.getElementById('footer-container')
	let footer = document.createElement("footer");
	let emoji1 = document.createElement('span')
	emoji1.textContent = '🦄'
	emoji1.setAttribute('id', 'unicorn-unflipped')
	let text = document.createElement('span')
	text.textContent = ' I made this myself! '
	let emoji2 = document.createElement('span')
	emoji2.textContent = '🦄'
	emoji2.setAttribute('id', 'unicorn-flip')
	footer.appendChild(emoji1);
	footer.appendChild(text);
	footer.appendChild(emoji2);
	container.appendChild(footer)
}