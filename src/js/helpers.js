import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise();

export function setAttributes(el, attrs) {
  for(let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

export function makeColor (h, s, l) {
	return 'hsl(' + h.toString() + ',' + s.toString() + '%,' + l.toString() + '%)'
}

export function noise(x, y) {
    return simplex.noise2D(x, y);
}

export function parseHslColorString(str) {
    let hsl = str.replace(/(hsl)+|[%()]+/g, '').split(',')
    return hsl.map((val => parseInt(val)))
}
