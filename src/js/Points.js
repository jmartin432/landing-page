import * as helpers from './helpers'


export function AnchorPoint(angle, radius) {
    this.type = 'anchor'
    this.angle = angle
    this.radius = radius
    this.x = Math.cos(angle) * radius
    this.y = Math.sin(angle) * radius
}

export function ControlPoint(angle, radius) {
    this.type = 'control'
    this.angle = angle
    this.radius = radius
    this.noiseOffsetX = Math.random() * 1000
    this.noiseOffsetY = Math.random() * 1000
    this.radiusDelta = .1 * helpers.noise(this.noiseOffsetX, this.noiseOffsetY)
    this.x = Math.cos(angle) * (radius + this.radiusDelta)
    this.y = Math.sin(angle) * (radius + this.radiusDelta)
}

ControlPoint.prototype.updateNoiseOffsets = function(delta) {
    this.noiseOffsetX += delta;
    this.noiseOffsetY += delta;
    return this
}

ControlPoint.prototype.updateRadiusDelta = function(){
    this.radiusDelta = .1 * helpers.noise(this.noiseOffsetX, this.noiseOffsetY)
    return this
}

ControlPoint.prototype.updateXY = function() {
    this.x = Math.cos(this.angle) * (this.radius + this.radiusDelta)
    this.y = Math.sin(this.angle) * (this.radius + this.radiusDelta)
    return this
}

export function ReflectedControlPoint (anchor, control) {
    this.type = 'reflected-control'
    this.x = 2 * anchor.x - control.x
    this.y = 2 * anchor.y - control.y
}

ReflectedControlPoint.prototype.updateXY = function(anchor, control) {
    this.x = 2 * anchor.x - control.x
    this.y = 2 * anchor.y - control.y
    return this
}