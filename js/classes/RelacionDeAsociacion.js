class RelacionDeAsociacion extends Relacion {
    static TIPO_COLECCION = "ArrayList";

    constructor(rectangulo, puntos, cardinalidad, nombre) {   
        super(rectangulo, puntos);
        this.cardinalidad = cardinalidad;
        this.nombre = nombre;
    }

    toString() {
        return `relación de asociación "${this.nombre || "(sin_nombre)"}" con cardinalidad: ${this.cardinalidad || "(cardinalidad)"}`;
    }

    actualizarClases() {
        this.checkClases();
        this.claseOrigen.addAtributo(this.definirAtributoUML());
    }

    definirAtributoUML() {
        let tipo = this.claseDestino.nombre;
        if (this.cardinalidad.includes("*") || this.cardinalidad.includes("n")) {
            tipo = `${TIPO_COLECCION}<${tipo}>`;
        }
        return Atributo.parse(`${this.nombre}: ${tipo}`);
    }

    static setTipoColeccion(tipoColeccion) {
        RelacionDeAsociacion.TIPO_COLECCION = tipoColeccion;
    }
}