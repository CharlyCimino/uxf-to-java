class Relacion {

    static PENDIENTE = "PEND";

    constructor(rectangulo) {
        this.rectangulo = rectangulo;
        this.claseOrigen = Relacion.PENDIENTE;
        this.claseDestino = Relacion.PENDIENTE;
    }

    checkClases() {
        if (this.claseOrigen === Relacion.PENDIENTE) {
            throw new Error(`No se pudo encontrar una clase para el ORIGEN de una ${this.toString()}`);
        }
        if (this.claseDestino === Relacion.PENDIENTE) {
            throw new Error(`No se pudo encontrar una clase para el DESTINO de una ${this.toString()}`);
        }
    }

    static parse(panelAttributes, additionalAttributes, coord, zoom) {

        let [tipoFlecha, cardinalidad = "1", nombreRelacion = "sinNombre"] = panelAttributes;

        let match = Relacion.getTipoFlechaRegex().exec(tipoFlecha);
        if (!match) throw new Error(`La expresión '${tipoFlecha}' no representa una relación válida`);
        tipoFlecha = match[1]; // Sin el 'lt='

        match = Relacion.getCardinalidadRegex().exec(cardinalidad);
        if (!match) throw new Error(`La expresión '${cardinalidad}' no representa una cardinalidad válida`);
        cardinalidad = match[1]; // Sin el 'm1='

        const rect = new Rectangulo(coord);
        let valoresIndividuales = additionalAttributes.split(";")
        for (let i = 0; i < valoresIndividuales.length; i += 2) {
            const x = parseInt(valoresIndividuales[i]) * (zoom / 10);
            const y = parseInt(valoresIndividuales[i + 1]) * (zoom / 10);
            rect.agregarPuntoDeRelacion({ x, y });
        }
        
        let relacion = RelacionFactory.crearRelacion(tipoFlecha, rect);
        if (relacion instanceof RelacionDeAsociacion) {
            relacion.nombre = nombreRelacion;
            relacion.cardinalidad = cardinalidad;
        }

        return relacion;
    }

    static getTipoFlechaRegex() {
        return createRegex([
            /^(?:lt=)(<(?:(?:\-(?:>{4,5})?)|(?:\.+)|(?:<[\-\.])))\s*$/
        ]);
    }

    static getCardinalidadRegex() {
        return createRegex([
            /^(?:m1=\s*)?((?:[1*n])|(?:[0-1]\.\.[1*n])|(?:\d+)|(?:[a-zA-Z0-9_\[\]]*))\s*$/
        ]);
    }

    static getNombreRelacionRegex() {
        return createRegex([
            /^/,                                            // Inicio de línea
            /([-+#]?)\s*/,                                  // Visibilidad (opcional)
            /([a-zA-Z](?:[a-zA-Z0-9_]*[a-zA-Z0-9])?)\s*/,   // Identificador
            /$/,                                            // Fin de línea
        ]);
    }
}

