class Clase {
    constructor(tipo = '', nombre = '', atributos = [], metodos = [], coord) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.atributos = atributos;
        this.metodos = metodos;
        this.coord = coord;
        this.atributos = this.atributos.sort((a, b) => (a.constructor.name) > (b.constructor.name));
        this.metodos = this.metodos.sort((a, b) => (a.constructor.name) > (b.constructor.name));
    }

    static parse(clazzItem, coord) {
        let tipo = '', nombre = '', atributos = [], metodos = [];

        ({ tipo, nombre } = Clase.resolverTipoYNombreDeElemento(clazzItem));

        let atributosSinProcesar = [];
        let metodosSinProcesar = [];

        const idx1Separador = clazzItem.indexOf('--');
        const idx2Separador = clazzItem.lastIndexOf('--');

        if (idx1Separador > -1) {
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
        }

        if (tipo === "enum") {
            atributos = atributosSinProcesar.map(AtributoEnum.parse);
            console.log(atributos);
        } else {
            atributos = atributosSinProcesar.map(Atributo.parse);
        }

        metodos = metodosSinProcesar.map(Metodo.parse);

        return new Clase(tipo, nombre, atributos, metodos, new Coordenada(coord));
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

        return { tipo, nombre };
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
        if (this.tipo === "enum") {
            const atrsEnum = this.atributos.filter(at => at instanceof AtributoEnum);
            atrsEnum.forEach( atEnum => {
                javaCode += atEnum.toJava() + ",\n\t"
            })
            if (atrsEnum.length > 0) {
                javaCode = javaCode.substring(0, javaCode.length - 3) + ";\n\t"; // Quita última coma
            } 
        }

        this.atributos.filter(at => at instanceof Atributo).forEach(at => {
            javaCode += at.toJava() + "\n\t";
        });
        javaCode += "\n";
        this.metodos.forEach(me => {
            javaCode += me.toJava() + "\n\n";
        });
        javaCode += "}";

        return javaCode;

    }
}