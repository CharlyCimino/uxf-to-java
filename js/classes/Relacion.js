class Relacion {
    constructor(coord, claseOrigen, claseDestino) {
        this.coord = coord;
        this.claseOrigen = claseOrigen;
        this.claseDestino = claseDestino;
    }
    static parse(relItem, coord) {

        console.log(relItem);

        let [tipoFlecha, cardinalidad = "1", nombreRelacion = ""] = relItem;

        let match = Relacion.getTipoFlechaRegex().exec(tipoFlecha);
        if (!match) throw new Error(`No se pudo parsear la relación dada por el tipo de flecha: '${tipoFlecha}'\n${REVISAR_SINTAXIS_LETINO}`);
        tipoFlecha = match[1]; // Sin el 'lt='

        match = Relacion.getCardinalidadRegex().exec(cardinalidad);
        if (!match) throw new Error(`No se pudo parsear la cardinalidad '${cardinalidad}' de la relación dada por el tipo de flecha '${tipoFlecha}'\n${REVISAR_SINTAXIS_LETINO}`);
        cardinalidad = match[1]; // Sin el 'm1='

        /*if (tipoFlecha.includes('>>') || tipoFlecha.includes('<<')) {
            return RelacionHerencia.parse(tipoFlecha, coord);
        } else if (tipoFlecha.includes('->') || tipoFlecha.includes('<-')) {
            return RelacionAsociacion.parse(tipoFlecha, cardinalidad, nombreRelacion, coord);
        } else {
            return 'dependencia';
        }*/
        return { coord, tipoFlecha, cardinalidad, nombreRelacion }
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

