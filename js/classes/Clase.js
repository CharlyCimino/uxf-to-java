class Clase {
    constructor(tipo = '', nombre = '', atributos = [], metodos = []) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.atributos = atributos;
        this.metodos = metodos;
    }

    static parse(clazzItem) {
        let tipo = '', nombre = '', atributos = [], metodos = [];

        ({tipo, nombre} = Clase.resolverTipoYNombreDeElemento(clazzItem));

        let atributosSinProcesar = [];
        let metodosSinProcesar = [];

        const idx1Separador = clazzItem.indexOf('--');
        const idx2Separador = clazzItem.lastIndexOf('--');

        console.log(clazzItem)

        if (idx2Separador == idx1Separador) { // Solo atributos
            atributosSinProcesar = clazzItem.slice(idx1Separador + 1, clazzItem.length);
        } else if (idx2Separador - idx1Separador > 1) { // Atributos y métodos
            atributosSinProcesar = clazzItem.slice(idx1Separador + 1, idx2Separador);
            if (clazzItem.length - idx2Separador > 1) {
                metodosSinProcesar = clazzItem.slice(idx2Separador + 1, clazzItem.length);
            }
        } else { // Solo métodos
            metodosSinProcesar = clazzItem.slice(idx2Separador + 1, clazzItem.length);
        }

        if (tipo !== "enum") {
            atributos = atributosSinProcesar.map(Atributo.parse);
        }

        metodos = metodosSinProcesar.map(Metodo.parse);

        

        return new Clase(tipo, nombre, atributos, metodos);
    }

    static resolverTipoYNombreDeElemento(clazzItem) {
        let tipo = "class";
        let nombre = clazzItem[0];
        if (clazzItem[0].startsWith('<<')) { // Tiene estereotipo
            tipo = Clase.resolverTipoDeElemento(clazzItem[0]);
            nombre = clazzItem[1];
        } 
        const resultAbstract = resolverAbstract(nombre);
        nombre = resultAbstract.valor;
        if (tipo === "class") {
            tipo = (resultAbstract.esAbstract ? "abstract " : "") + tipo;  
        }              

        return {tipo, nombre};
    }

    static resolverTipoDeElemento(cad) {
        let tipo = "class";
        if (cad.includes("interf")) {
            tipo = 'interface';
        } else if (cad.includes('enum')) {
            tipo = 'enum';
        }
        return tipo;
    }

    toJava() {

        let javaCode = `public ${this.tipo} ${this.nombre} {\n\n\t`;
        this.atributos.forEach( at => {
            javaCode += at.toJava() + "\n\t";
        });
        javaCode += "\n";
        this.metodos.forEach( me => {
            javaCode += me.toJava() + "\n\n";
        });
        javaCode += "}";

        return javaCode;

    }
}