class Relacion {
    constructor(coord, claseOrigen, claseDestino) {
        this.coord = coord;
        this.claseOrigen = claseOrigen;
        this.claseDestino = claseDestino;
    }
    static parse(relItem, coord) {

        console.log(relItem);

        let [tipoFlecha, cardinalidad, nombreRelacion] = relItem;

        let match = Relacion.getTipoFlechaRegex().exec(tipoFlecha);
        if (!match) throw new Error(`No se pudo parsear la relación dada por el tipo de flecha: '${tipoFlecha}'\n${REVISAR_SINTAXIS_LETINO}`);

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
            /^lt=(<(?:(?:\-(?:>{4,5})?)|(?:\.+)|(?:<[\-\.])))$/
        ]);
    }
}