class RelacionDeGeneralizacion extends Relacion {
    constructor(rectangulo, puntos) {   
        super(rectangulo, puntos);
    }

    toString() {
        return `relación de generalización (herencia)`;
    }

    actualizarClases() {
        this.checkClases();
        console.log("actualizarClases de RelacionDeGeneralizacion");
    }
}