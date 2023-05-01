class Relacion {
    static parse(relItem, coord) {
        
        let [flecha, card, nombre] = relItem;

        if (flecha.includes('>>') || flecha.includes('<<')) {
            return RelacionHerencia.parse(flecha, coord);
        } else if (flecha.includes('->') || flecha.includes('<-')) {
            return RelacionAsociacion.parse(flecha, card, nombre, coord);
        } else {
            return 'dependencia';
        }
    }
}