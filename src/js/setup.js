import * as linkData from './linkData'
import {Border} from './Border'
import {links} from "./linkData";

function setAttributes(el, attrs) {
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function makeColor (s, l) {
	let hue = Math.floor(Math.random() * 360)
	return 'hsl(' + hue.toString() + ',' + s.toString() + '%,' + l.toString() + '%)'
}

export function makeSvgDefs(b) {
	let numLinks = linkData.links.length;
	let paths = []
	let clipPaths = []
	let container = document.getElementById('svg-defs-container')
	let svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
	let defs = document.createElementNS('http://www.w3.org/2000/svg','defs')
	setAttributes(svg, {
		id: 'svg-defs'
	})

	let headerImgPath = document.createElementNS('http://www.w3.org/2000/svg','path')
	headerImgPath.setAttribute( 'id', 'header-img-path')
	paths.push(headerImgPath)

	let headerImgClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath')
	headerImgClipPath.setAttribute('id', 'header-img-clip-path')
	clipPaths.push(headerImgClipPath)

	let headerPath = document.createElementNS('http://www.w3.org/2000/svg','path')
	headerPath.setAttribute('id', 'header-path')
	paths.push(headerPath)

	let headerClipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath')
	headerClipPath.setAttribute('id', 'header-clip-path')
	clipPaths.push(headerClipPath)

	for (let i = 0; i < numLinks; i++) {
		let path = document.createElementNS('http://www.w3.org/2000/svg','path')
		path.setAttribute('id', 'link-' + [i] + '-path')
		paths.push(path)

		let clipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath')
		clipPath.setAttribute('id', 'link-' + [i] + '-clip-path')
		clipPaths.push(clipPath)
	}
	for (let i = 0; i < paths.length; i++) {
		paths[i].setAttribute( 'class', 'svg-path border')
		paths[i].setAttribute( 'd', b[i].createPoints().makePath().path)

		// Not sure why but the following 2 attributes have to be set here,
		// not with the 'use' element that references them?????????
		paths[i].setAttribute('vector-effect', 'non-scaling-stroke')
		paths[i].setAttribute( 'transform', 'translate(.5,.5) scale(.5)')

		clipPaths[i].setAttribute('class', 'svg-clip-path')
		clipPaths[i].setAttribute('clipPathUnits', 'objectBoundingBox')

		let id = paths[i].getAttribute('id')
		let use = document.createElementNS('http://www.w3.org/2000/svg','use')
		use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + id)
		clipPaths[i].appendChild(use)

		defs.appendChild(paths[i])
		defs.appendChild(clipPaths[i])
	}

	let filter = document.createElementNS('http://www.w3.org/2000/svg','filter')
 	setAttributes(filter, {
 		id: 'glow',
		x: '-10%',
		y: '-10%', width: '120%',
		height: '120%'
	})
	let blur = document.createElementNS('http://www.w3.org/2000/svg','feGaussianBlur')
	setAttributes(blur, {
		result:'coloredBlur',
		stdDeviation: '.015'
	})
	filter.appendChild(blur)
	defs.appendChild(filter)

	let gradient = document.createElementNS('http://www.w3.org/2000/svg','radialGradient')
	gradient.setAttribute('id', 'eye-gradient')
	for (let i = 0; i < 3; i++) {
		let stop = document.createElementNS('http://www.w3.org/2000/svg','stop')
		setAttributes(stop, {
			class: 'gradient-stop',
			id: 'eye-gradient-stop-' + i.toString(),
			'stop-color': makeColor(50, 75),
			offset: (i * 50).toString() + '%'
		})
		gradient.appendChild(stop)
	}

	defs.appendChild(gradient)
	svg.appendChild(defs)
	container.appendChild(svg)
}

export function makeHeader() {
	let container = document.getElementById('header-image-container')
	let svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
	setAttributes(svg, {
		id: 'header-svg',
		viewBox:'0 0 1 1'
	})

	let group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
	setAttributes(group, {
		id: 'header-svg-group'
	})

	let circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	setAttributes(circle1, {
		id: 'eye-circle-1',
		cx: '.31',
		cy: '.5',
		r: '.13',
		fill: 'url(#eye-gradient)'
	})

	let circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	setAttributes(circle2, {
		id: 'eye-circle-2',
		cx: '.62',
		cy: '.425',
		r: '.13',
		fill: 'url(#eye-gradient)'
	})

	let image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
	setAttributes(image, {
		class: 'header-image',
		id: 'header-image',
	    style: 'clip-path: url(#header-img-clip-path);',
	    href: 'images/landingPageFaceEyeClip.png',
		width: 1,
		height: 1
	})

	let glowBorder = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	glowBorder.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#header-img-path')
	setAttributes(glowBorder, {
		class: 'border-glow',
		id: 'header-img-border-glow',
		stroke: makeColor(50, 65),
		filter: 'url(#glow)',
		'stroke-width': '10'
	})

	let border = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	border.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#header-img-path')
	setAttributes(border, {
		class: 'border',
		id: 'header-img-border',
		stroke: makeColor(100, 50),
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

export function makeLinks(mobile) {
	let container = document.getElementById('links-container')
	for (let i = 0; i < links.length; i++) {
		let linkContainer = document.createElement('div')
		setAttributes(linkContainer, {
			class: 'link-container',
			id: links[i].id
		})
		let linkClipContainer = document.createElement('div')
		setAttributes(linkClipContainer, {
			class: 'link-clip-div',
			style: 'clip-path: url(#link-' + i + '-clip-path);'
		})
		let linkTextBox = document.createElement('div')
		setAttributes(linkTextBox, {
			class: 'link-text-box'
		})
		let link = document.createElement('a')
		setAttributes(link, {
			class: 'link-text',
			href: (mobile) ? links[i].mobileLink : links[i].link,
			target: '_blank'
		})
		link.textContent = links[i].text

		let linkSvgContainer = document.createElement('div')
		setAttributes(linkSvgContainer, {
			class: 'link-svg-container'
		})
		let linkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		setAttributes(linkSvg, {
			id: 'link-' + i + '-svg',
			viewBox: '0 0 1 1',
			preserveAspectRatio: 'none'
		})
		let group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		let glowBorder = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		glowBorder.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#link-' + i + '-path')
		setAttributes(glowBorder, {
			class: 'border-glow',
			id: 'link-' + i + '-border-glow',
			stroke: makeColor(50, 65),
			filter: 'url(#glow)',
			'stroke-width': '10'
		})

		let border = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		border.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#link-' + i + '-path')
		setAttributes(border, {
			class: 'border',
			id: 'link-' + i + '-border',
			stroke: makeColor(100, 50),
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