class RelacionDeRealizacion extends RelacionDeGeneralizacion {
    constructor(rectangulo, puntos) {   
        super(rectangulo, puntos);
    }

    toString() {
        return `relación de realización (de interfaz)`;
    }

    actualizarClases() {
        this.checkClases();
        console.log("actualizarClases de RelacionDeRealizacion");
    }
}