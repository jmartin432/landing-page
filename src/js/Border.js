import SimplexNoise from 'simplex-noise';
import {AnchorPoint, ControlPoint, ReflectedControlPoint} from "./Points"
import {links} from './linkData'
const simplex = new SimplexNoise();

function noise(x, y) {
    return simplex.noise2D(x, y);
}

export function Border(size, radius, noiseStep) {
    this.size = size;
    this.radius = radius;
    this.angleStep = (Math.PI * 2) / size;
    this.noiseStep = noiseStep
    this.points = [];
    this.path = ''
}

Border.prototype.createPoints = function() {
    let points = []
    for (let i = 0; i < this.size; i++) {
        let theta = i * this.angleStep;

        let anchor = new AnchorPoint(theta, this.radius)
        let controlPoint = new ControlPoint(theta + ((1 / 3) * this.angleStep), this.radius)
        let controlPointReflected = new ReflectedControlPoint(2 * anchor.x - controlPoint.x, 2 * anchor.y - controlPoint.y)

        points.push(controlPointReflected, anchor, controlPoint);
    }
    this.points = points
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
