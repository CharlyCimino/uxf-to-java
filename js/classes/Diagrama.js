class Diagrama {
    constructor(nombre = '', clases = [], relaciones = []) {
        this.nombre = nombre;
        this.clases = clases;
        this.relaciones = relaciones;
    }

    static parse(elements) {
        const datos = (elements.map(elem => { return { 
            id: elem.id[0]._text, 
            data: elem.panel_attributes[0]._text, 
            coord: Object.fromEntries(
                Object.entries(elem.coordinates[0]).map(([key, value]) => [key, parseInt(value[0]._text)])
              )
        } }));
        const clasesSinProcesar = datos.filter(elem => elem.id === "UMLClass");
        const relacionesSinProcesar = datos.filter(elem => elem.id === "Relation");

        const clases = Diagrama.procesarClases(clasesSinProcesar);
        const relaciones = Diagrama.procesarRelaciones(relacionesSinProcesar);
        console.log(relaciones);
        return new Diagrama("Nombre no decidido", clases, relaciones);
    }

    static procesarClases(clasesSinProcesar) {
        const clases = [];
        clasesSinProcesar.forEach(clazzItem => {
            const data = clazzItem.data.replaceAll(' ', '').split('\n').filter(x => x !== '');
            console.log(data);
            clases.push(Clase.parse(data, clazzItem.coord));
          });
        return clases;
    }

    static procesarRelaciones(relacionesSinProcesar) {
        const relaciones = [];
        relacionesSinProcesar.forEach(relItem => {
            const data = relItem.data.replaceAll(' ', '').split('\n').filter(x => x !== '');
            relaciones.push(Relacion.parse(data, relItem.coord));
          });
        return relaciones.filter(r => r !== "dependencia");
    }

    toJava() {
        let javaResult = "";

        this.clases.forEach (cl => {
            javaResult += cl.toJava() + "\n\n";
        })

        return javaResult;
    }
}