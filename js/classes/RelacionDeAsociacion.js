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
            tipo = `${RelacionDeAsociacion.TIPO_COLECCION}<${tipo}>`;
            this.claseOrigen.addImport( JAVA_IMPORTS[RelacionDeAsociacion.TIPO_COLECCION] );
        } else if (!this.cardinalidad.includes("0") && !this.cardinalidad.includes("1")) {
            const cantCorchetes = this.cuantosCorchetes(this.cardinalidad);
            tipo = `${tipo}[]`;
            for (let i = 1; i < cantCorchetes; i++) {
                tipo += `[]`;
            }
        }
        return Atributo.parse(`${this.nombre}: ${tipo}`);
    }

    cuantosCorchetes(cad) {
        return cad.split("[").length-1;
    }

    static setTipoColeccion(tipoColeccion) {
        RelacionDeAsociacion.TIPO_COLECCION = tipoColeccion;
    }
}