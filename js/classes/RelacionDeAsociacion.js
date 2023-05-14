class RelacionDeAsociacion extends Relacion {
    constructor(rectangulo, puntos, cardinalidad, nombre) {   
        super(rectangulo, puntos);
        this.cardinalidad = cardinalidad;
        this.nombre = nombre;
    }

    toString() {
        return `Relación de asociación "${this.nombre || "(sin_nombre)"}" con cardinalidad: ${this.cardinalidad || "(cardinalidad)"}`;
    }

    actualizarClases() {
        this.checkClases();
        console.log("actualizarClases de RelacionDeAsociacion");
    }
}