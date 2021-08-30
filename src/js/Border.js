import {AnchorPoint, ControlPoint, ReflectedControlPoint} from "./Points"

export function Border(id, size, radius, noiseStep) {
    this.id = id
    this.size = size;
    this.radius = radius;
    this.angleStep = (Math.PI * 2) / size;
    this.noiseStep = noiseStep
    this.points = [];
    this.path = '';
    this.hue = Math.floor(Math.random() * 360)

    this.pathElement = document.createElementNS('http://www.w3.org/2000/svg','path')

    let defs = document.getElementById('svg-defs')
    this.pathElement.setAttribute( 'id', this.id + '-path')
    this.pathElement.setAttribute( 'class', 'svg-path border')
    this.pathElement.setAttribute( 'class', 'svg-path border')

    // Not sure why but the following 2 attributes have to be set here,
    // not with the 'use' element that references them?????????
    this.pathElement.setAttribute('vector-effect', 'non-scaling-stroke')
    this.pathElement.setAttribute( 'transform', 'translate(.5,.5) scale(.5)')
    defs.appendChild(this.pathElement)

    let clipPath = document.createElementNS('http://www.w3.org/2000/svg','clipPath')
    clipPath.setAttribute('id', this.id + '-clip-path')
    clipPath.setAttribute('class', 'svg-clip-path')
    clipPath.setAttribute('clipPathUnits', 'objectBoundingBox')

    let use = document.createElementNS('http://www.w3.org/2000/svg','use')
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#' + id + '-path')
    clipPath.appendChild(use)
    defs.appendChild(clipPath)

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
