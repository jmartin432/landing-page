import {AnchorPoint, ControlPoint, ReflectedControlPoint} from "./Points"
import * as helpers from './helpers'


export function Border(id, size, radius, noiseStep) {
    this.id = id
    this.size = size;
    this.radius = radius;
    this.angleStep = (Math.PI * 2) / size;
    this.noiseStep = noiseStep
    this.points = [];
    this.path = '';
    this.hue = Math.floor(Math.random() * 360)
    this.pathElement = document.getElementById(this.id + '-path')
    this.borderGlowElement = document.getElementById(this.id + '-border-glow')
    this.borderElement = document.getElementById(this.id + '-border')
    this.containerDiv = document.getElementById(this.id + '-container')

    this.containerDiv.addEventListener('mouseenter', () => {
        this.noiseStep = .015
    })
    this.containerDiv.addEventListener('touchenter', () => {
        this.noiseStep = .015
    })
    this.containerDiv.addEventListener('mouseleave', () => {
        this.noiseStep = .005
    })
    this.containerDiv.addEventListener('touchleave', () => {
        this.noiseStep = .005
    })
}

Border.prototype.createPoints = function() {
    let points = []
    for (let i = 0; i < this.size; i++) {
        let theta = i * this.angleStep;

        let anchor = new AnchorPoint(theta, this.radius)
        let controlPoint = new ControlPoint(theta + ((1 / 3) * this.angleStep), this.radius)
        let controlPointReflected = new ReflectedControlPoint(anchor, controlPoint)

        points.push(controlPointReflected, anchor, controlPoint);
    }
    this.points = points
    return this
}

Border.prototype.updatePoints = function() {
    for (let i = 0; i < this.size; i++) {
        const reflectedControlPoint = this.points[3 * i]
        const anchor = this.points[3 * i + 1]
        const controlPoint = this.points[3 * i + 2];

        controlPoint.updateNoiseOffsets(this.noiseStep).updateRadiusDelta().updateXY()
        reflectedControlPoint.updateXY(anchor, controlPoint)
    }
    return this
}

Border.prototype.makePath = function() {
    let data = 'M ' + this.points[1].x + ' ' + this.points[1].y;
    for (let i = 2; i < this.points.length - 2; i += 3) {
        data = data + ' C ' + this.points[i].x + ' ' + this.points[i].y + ' ' +
            this.points[i + 1].x + ' ' + this.points[i + 1].y + ' ' +
            this.points[i + 2].x + ' ' + this.points[i + 2].y
    }
    // here we are adding the last control point  which is a reflection of the first control point and then
    // adding the last anchor point to close the loop
    data = data + ' C ' + this.points[this.points.length - 1].x + ' ' + this.points[this.points.length - 1].y + ' ' +
        this.points[0].x + ' ' + this.points[0].y + ' ' +
        this.points[1].x + ' ' + this.points[1].y
    this.path = data
    return this
}

Border.prototype.setPathElementData = function() {
    this.pathElement.setAttribute('d', this.path)
    return this
}

Border.prototype.setBorderGlowColor = function() {
    this.borderGlowElement.setAttribute('stroke', helpers.makeColor(this.hue, 50, 65))
}

Border.prototype.setBorderColor = function() {
    this.borderElement.setAttribute('stroke', helpers.makeColor(this.hue,100, 50),)
}

Border.prototype.setBackGroundColorClipPath = function() {
    if (this.id === 'header-image') return
    this.containerDiv.setAttribute('style', 'clip-path: url(#' + this.id + '-clip-path);background-color: ' + helpers.makeColor(this.hue, 50, 75))
}
