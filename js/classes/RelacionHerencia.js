class RelacionHerencia {
    constructor(origen, destino, esRealizacion) {        
        this.origen = origen;
        this.destino = destino;
        this.esRealizacion = esRealizacion;
    }

    static parse(flecha, coord) {
        const origen = 'nose';
        const destino = 'nose';
        const esRealizacion = flecha.includes('.');

        return new RelacionHerencia(origen,destino,esRealizacion);
    }
}