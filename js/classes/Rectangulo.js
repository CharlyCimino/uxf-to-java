/*
    x and y: distance from the upper left corner of the drawpanel.
	* width and height: size of the element.
*/

/**
 * public static final int DRAG_BOX_SIZE = 12; // size of the box to drag the whole relation
	public static final int POINT_SELECTION_RADIUS = 10; // radius of the selection circle of relation-points
	public static final int NEW_POINT_DISTANCE = 5; // distance from which new points can be dragged away from a relation-line
 * 
 */

class Rectangulo {
    static POINT_SELECTION_RADIUS = 10;

    constructor({x, y, w, h}) {
        this.p1 = {x, y};
        this.p2 = {x: x + w, y: y + h};
        this.puntosDeRelacion = [];
    }

    agregarPuntoDeRelacion(p) {
        const nuevoPuntoPosAbsoluta = {
            x: p.x + this.p1.x,
            y: p.y + this.p1.y
        }
        this.puntosDeRelacion.push(nuevoPuntoPosAbsoluta);
    }

    puntoDeOrigen() {
        return this.puntosDeRelacion[this.puntosDeRelacion.length-1];
    }

    puntoDeDestino() {
        return this.puntosDeRelacion[0];
    }

    esConectadoPor(pto) {
        const POINT = Rectangulo.POINT_SELECTION_RADIUS;
        return (pto.x + POINT >= this.p1.x && pto.y + POINT >= this.p1.y && pto.x - POINT <= this.p2.x && pto.y - POINT <= this.p2.y);
    }

    
}