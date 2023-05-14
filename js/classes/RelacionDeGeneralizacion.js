class RelacionDeGeneralizacion extends Relacion {
    constructor(rectangulo, puntos) {   
        super(rectangulo, puntos);
    }

    toString() {
        return `Relación de generalización (herencia)`;
    }

    actualizarClases() {
        this.checkClases();
        console.log("actualizarClases de RelacionDeGeneralizacion");
    }
}