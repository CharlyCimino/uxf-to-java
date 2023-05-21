class RelacionDeRealizacion extends RelacionDeGeneralizacion {
    constructor(rectangulo, puntos) {   
        super(rectangulo, puntos);
    }

    toString() {
        return `relación de realización (interfaz)`;
    }

    actualizarClases() {
        this.checkClases();
        this.claseOrigen.addInterfaz(this.claseDestino);
    }
}