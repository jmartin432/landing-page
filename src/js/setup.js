import * as linkData from './linkData'
import * as helpers from './helpers'
import {Border} from './Border'
import {links} from "./linkData";

export function makeSvgDefs(borders) {
	let numLinks = linkData.links.length;
	let container = document.getElementById('svg-defs-container')
	let svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
	let defs = document.createElementNS('http://www.w3.org/2000/svg','defs')
	helpers.setAttributes(defs, {
		id: 'svg-defs'
	})

	container.appendChild(svg)
	svg.appendChild(defs)

	borders.push(new Border('header-img', 8, .93, .005))
	borders.push(new Border('header', 8, .93, .005))

	for (let i = 0; i < numLinks; i++) {
		borders.push(new Border('link-' + i, 8, .93, .005))
	}

	for (let i = 0; i < borders.length; i++) {
		borders[i].createPoints().makePath().setPathElementData()
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

export function makeHeaderImage(borders) {
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

	let glowBorder = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	helpers.setAttributes(glowBorder, {
		class: 'border-glow',
		id: 'header-img-border-glow',
		href: '#header-img-path',
		stroke: helpers.makeColor(borders[0].hue, 50, 65),
		filter: 'url(#glow)',
		'stroke-width': '10'
	})

	let border = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	//border.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#header-img-path')
	helpers.setAttributes(border, {
		class: 'border',
		id: 'header-img-border',
		href: '#header-img-path',
		stroke: helpers.makeColor(borders[0].hue, 100, 50),
		'stroke-width': '2'
	})

	let image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	image.onload = function () {
		group.appendChild(circle1)
		group.appendChild(circle2)
		group.appendChild(image)
		group.appendChild(glowBorder)
		group.appendChild(border)
	};
	helpers.setAttributes(image, {
		class: 'header-image',
		id: 'header-image',
	    style: 'clip-path: url(#header-img-clip-path);',
	    href: 'images/landingPageFaceEyeClip-500.png',
		width: 1,
		height: 1
	})

	svg.appendChild(group)
	container.appendChild(svg)
}

export function makeLinks(mobile, borders) {
	let container = document.getElementById('links-container')
	for (let i = 0; i < links.length; i++) {
		let linkContainer = document.createElement('div')
		helpers.setAttributes(linkContainer, {
			class: 'link-container',
			id: links[i].id
		})
		let linkClipContainer = document.createElement('div')
		helpers.setAttributes(linkClipContainer, {
			class: 'link-clip-div',
			style: 'clip-path: url(#link-' + i + '-clip-path); background-color: ' + helpers.makeColor(borders[i + 2].hue, 50, 75)
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
		//glowBorder.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#link-' + i + '-path')
		helpers.setAttributes(glowBorder, {
			class: 'border-glow',
			id: 'link-' + i + '-border-glow',
			href: '#link-' + i + '-path',
			stroke: helpers.makeColor(borders[i + 2].hue, 50, 65),
			filter: 'url(#glow)',
			'stroke-width': '10'
		})

		let border = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		helpers.setAttributes(border, {
			class: 'border',
			id: 'link-' + i + '-border',
			href: '#link-' + i + '-path',
			stroke: helpers.makeColor(borders[i + 2].hue,100, 50),
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