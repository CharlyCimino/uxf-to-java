class Relacion {
    

    constructor(rectangulo) {
        this.rectangulo = rectangulo;
        this.claseOrigen = "pendiente";
        this.claseDestino = "pendiente";
    }

    static parse(panelAttributes, additionalAttributes, coord) {

        //console.log(relItem);

        let [tipoFlecha, cardinalidad = "1", nombreRelacion = ""] = panelAttributes;

        let match = Relacion.getTipoFlechaRegex().exec(tipoFlecha);
        if (!match) throw new Error(`No se pudo parsear la relación dada por el tipo de flecha: '${tipoFlecha}'\n${REVISAR_SINTAXIS_LETINO}`);
        tipoFlecha = match[1]; // Sin el 'lt='

        match = Relacion.getCardinalidadRegex().exec(cardinalidad);
        if (!match) throw new Error(`No se pudo parsear la cardinalidad '${cardinalidad}' de la relación dada por el tipo de flecha '${tipoFlecha}'\n${REVISAR_SINTAXIS_LETINO}`);
        cardinalidad = match[1]; // Sin el 'm1='

        const rect = new Rectangulo(coord);
        let valoresIndividuales = additionalAttributes.split(";")
        for (let i = 0; i < valoresIndividuales.length; i += 2) {
            const x = parseInt(valoresIndividuales[i]);
            const y = parseInt(valoresIndividuales[i + 1]);
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
            /^(?:m1=\s*)?((?:[1*n])|(?:[0-1]\.\.[1*n])|(?:\d+))\s*$/
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

