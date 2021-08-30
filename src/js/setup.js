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

	let image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	helpers.setAttributes(image, {
		class: 'header-image',
		id: 'header-image',
	    style: 'clip-path: url(#header-img-clip-path);',
	    href: 'images/landingPageFaceEyeClip.png',
		width: 1,
		height: 1
	})

	let glowBorder = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	glowBorder.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#header-img-path')
	helpers.setAttributes(glowBorder, {
		class: 'border-glow',
		id: 'header-img-border-glow',
		stroke: helpers.makeColor(borders[0].hue, 50, 65),
		filter: 'url(#glow)',
		'stroke-width': '10'
	})

	let border = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	border.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#header-img-path')
	helpers.setAttributes(border, {
		class: 'border',
		id: 'header-img-border',
		stroke: helpers.makeColor(borders[0].hue, 100, 50),
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
		let link = document.createElement('a')
		helpers.setAttributes(link, {
			class: 'link-text',
			href: (mobile) ? links[i].mobileLink : links[i].link,
			target: '_blank'
		})
		link.textContent = links[i].text

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
		glowBorder.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#link-' + i + '-path')
		helpers.setAttributes(glowBorder, {
			class: 'border-glow',
			id: 'link-' + i + '-border-glow',
			stroke: helpers.makeColor(borders[i + 2].hue, 50, 65),
			filter: 'url(#glow)',
			'stroke-width': '10'
		})

		let border = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		border.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#link-' + i + '-path')
		helpers.setAttributes(border, {
			class: 'border',
			id: 'link-' + i + '-border',
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
	let part1 = document.createElement('span')
	part1.textContent = '🦄 I made this myself! '
	let part2 = document.createElement('span')
	part2.textContent = '🦄'
	part2.setAttribute('id', 'unicorn-flip')
	footer.appendChild(part1);
	footer.appendChild(part2);
	container.appendChild(footer)
}