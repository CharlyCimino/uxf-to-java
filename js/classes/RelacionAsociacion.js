class RelacionAsociacion {
    constructor(origen, destino, atrObj, cardinalidad) {        
        this.origen = origen;
        this.destino = destino;
        this.atrObj = atrObj;
        this.cardinalidad = cardinalidad;
    }

    static parse(flecha, card, nombre, coord) {
        const origen = 'nose';
        const destino = 'nose';
        const atr = Atributo.parse(`${nombre}:${destino}`);
        const cardi = card.split('=')[1];       

        return new RelacionAsociacion(origen,destino,atr,cardi);
    }
}