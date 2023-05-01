class Diagrama {
    constructor(nombre = '', clases = [], relaciones = []) {
        this.nombre = nombre;
        this.clases = clases;
        this.relaciones = relaciones;
    }

    static parse(elements) {
        const datos = (elements.map(elem => { return { id: elem.id[0]._text, data: elem.panel_attributes[0]._text } }));
        const clasesSinProcesar = datos.filter(elem => elem.id === "UMLClass");
        const relacionesSinProcesar = datos.filter(elem => elem.id === "Relation");

        const clases = Diagrama.procesarClases(clasesSinProcesar);
        console.log(clases);
        return new Diagrama("Nombre no decidido", clases);
    }

    static procesarClases(clasesSinProcesar) {
        const clases = [];
        clasesSinProcesar.forEach(clazzItem => {
            clazzItem = clazzItem.data.replaceAll(' ', '').split('\n').filter(x => x !== '');
            clases.push(Clase.parse(clazzItem));
          });
        return clases;
    }

    toJava() {
        let javaResult = "";

        this.clases.forEach (cl => {
            javaResult += cl.toJava() + "\n\n";
        })

        return javaResult;
    }
}