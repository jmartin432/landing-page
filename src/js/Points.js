import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise();

function noise(x, y) {
    return simplex.noise2D(x, y);
}

export function AnchorPoint(angle, radius) {
    this.type = 'anchor'
    this.x = Math.cos(angle) * radius
    this.y = Math.sin(angle) * radius
}

export function ControlPoint(angle, radius) {
    this.type = 'control'
    this.noiseOffsetX = Math.random() * 1000
    this.noiseOffsetY = Math.random() * 1000
    this.radiusDelta = .1 * noise(this.noiseOffsetX, this.noiseOffsetY)
    this.x = Math.cos(angle) * (radius + this.radiusDelta)
    this.y = Math.sin(angle) * (radius + this.radiusDelta)
}

export function ReflectedControlPoint (x, y) {
    this.type = 'reflected-control'
    this.x = x
    this.y = y
}