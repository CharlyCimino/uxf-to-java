class Diagrama {
    constructor(nombre = '', zoom=10, clasesSinProcesar = [], relacionesSinProcesar = []) {
        this.nombre = nombre;
        this.clases = [];
        this.relaciones = [];
        this.zoom = zoom;
        this.clases = this.procesarClases(clasesSinProcesar);
        this.relaciones = this.procesarRelaciones(relacionesSinProcesar);
        this.transformarRelacionesACodigo();
    }

    transformarRelacionesACodigo() {
        this.conectarRelacionesConClases();
        this.actualizarClasesSegunRelaciones();
    }    

    conectarRelacionesConClases() {
        this.relaciones.forEach(rel => {
            let claseEncontrada = this.clases.find(c => c.esConectadaPor(rel.rectangulo.puntoDeOrigen()))
            if (claseEncontrada) {
                rel.claseOrigen = claseEncontrada;
            }
            claseEncontrada = this.clases.find(c => c.esConectadaPor(rel.rectangulo.puntoDeDestino()))
            if (claseEncontrada) {
                rel.claseDestino = claseEncontrada;
            }
        })
    }    

    actualizarClasesSegunRelaciones() {
        this.relaciones.forEach(rel => {
            rel.actualizarClases();  
        })
    } 

    procesarClases(clasesSinProcesar) {
        const clases = [];
        clasesSinProcesar.forEach(clazzItem => {
            const data = dataElementoToArray(clazzItem.panelAttributes);
            clases.push(Clase.parse(data, clazzItem.coord));
          });
        return clases;
    }

    procesarRelaciones(relacionesSinProcesar) {
        const relaciones = [];
        relacionesSinProcesar.forEach(relItem => {
            const data = dataElementoToArray(relItem.panelAttributes);
            relaciones.push(Relacion.parse(data, relItem.additionalAttributes, relItem.coord, this.zoom));
          });
        return relaciones.filter(Boolean); // Elimina los 'undefined'
    }

    toJava() {
        let javaResult = "";

        this.clases.forEach (cl => {
            javaResult += cl.toJava() + "\n\n";
        })

        return javaResult;
    }

    static parse(nombre, zoomLevel, elements, tipoColeccion) {
        RelacionDeAsociacion.setTipoColeccion(tipoColeccion);
        const datos = (elements.map(elem => { return { 
            id: elem.id[0]._text, 
            panelAttributes: elem.panel_attributes[0]?._text, 
            additionalAttributes: elem.additional_attributes[0]?._text,
            coord: Object.fromEntries(
                Object.entries(elem.coordinates[0]).map(([key, value]) => [key, parseInt(value[0]._text)])
              )
        }}));
        const clasesSinProcesar = datos.filter(elem => elem.id === "UMLClass");
        const relacionesSinProcesar = datos.filter(elem => elem.id === "Relation");
        return new Diagrama(nombre, zoomLevel, clasesSinProcesar, relacionesSinProcesar);
    }
}