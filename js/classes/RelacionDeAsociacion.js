class RelacionDeAsociacion extends Relacion {
    constructor(rectangulo, puntos, cardinalidad, nombre) {   
        super(rectangulo, puntos);
        this.cardinalidad = cardinalidad;
        this.nombre = nombre;
    }
}