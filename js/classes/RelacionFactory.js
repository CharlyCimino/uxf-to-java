class RelacionFactory {
    static crearRelacion(tipoFlecha, coord) {
        let rel;
        switch (tipoFlecha) {
            case "<-":
            case "<->>>>":
            case "<->>>>>":
                rel = new RelacionDeAsociacion(coord);
                break;
            case "<<-":
                rel = new RelacionDeGeneralizacion(coord);
                break;
            case "<<.":
                rel = new RelacionDeRealizacion(coord);
                break;
        }
        return rel;
    }
}