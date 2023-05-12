class RelacionFactory {
    static crearRelacion(tipoFlecha, rectangulo) {
        let rel;
        switch (tipoFlecha) {
            case "<-":
            case "<->>>>":
            case "<->>>>>":
                rel = new RelacionDeAsociacion(rectangulo);
                break;
            case "<<-":
                rel = new RelacionDeGeneralizacion(rectangulo);
                break;
            case "<<.":
                rel = new RelacionDeRealizacion(rectangulo);
                break;
        }
        return rel;
    }
}