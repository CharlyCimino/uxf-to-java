class RelacionDeAsociacion extends Relacion {
    constructor(coord, claseOrigen, claseDestino, cardinalidad, nombreRelacion) {   
        super(coord, claseOrigen, claseDestino);
        this.cardinalidad = cardinalidad;
        this.nombreRelacion = nombreRelacion;
    }
}