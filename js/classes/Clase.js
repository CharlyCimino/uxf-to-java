class Clase {
    constructor(tipo = '', nombre = '', atributos = [], metodos = [], rectangulo) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.atributos = atributos;
        this.metodos = metodos;
        this.rectangulo = rectangulo;
        this.superclase = undefined;
        this.interfaces = [];
        this.atributos = this.atributos.sort((a, b) => (a.constructor.name) > (b.constructor.name));
        this.metodos = this.metodos.sort((a, b) => (a.constructor.name) > (b.constructor.name));
    }

    addAtributo(a) {
        this.atributos.push(a);
    }

    addSuperclase(sc) {
        if (this.superclase) {
            throw new Error(`La clase ${this.nombre} ya es hija de ${this.superclase.nombre}, no puede serlo también de ${sc.nombre}. Java no soporta herencia múltiple.`);
        }
        this.superclase = sc;
    }

    addInterfaz(interf) {
        this.interfaces.push(interf);
    }

    esConectadaPor(puntoDeRelacion) {
        return this.rectangulo.esConectadoPor(puntoDeRelacion);
    }

    toJava() {
        let javaCode = `public ${this.tipo} ${this.nombre}`;
        javaCode = this.escribirSuperclase(javaCode);
        javaCode = this.escribirInterfaces(javaCode);
        javaCode += " {\n\n\t";
        javaCode = this.escribirValoresEnum(javaCode);
        javaCode = this.escribirAtributos(javaCode);
        javaCode += "\n";
        javaCode = this.escribirMetodos(javaCode);
        javaCode += "}";
        return javaCode;
    }

    escribirMetodos(javaCode) {
        this.metodos.forEach(me => {
            javaCode += me.toJava() + "\n\n";
        });
        return javaCode;
    }

    escribirAtributos(javaCode) {
        this.atributos.filter(at => at instanceof Atributo).forEach(at => {
            javaCode += at.toJava() + "\n\t";
        });
        return javaCode;
    }

    escribirValoresEnum(javaCode) {
        if (this.tipo === "enum") {
            const atrsEnum = this.atributos.filter(at => at instanceof AtributoEnum);
            atrsEnum.forEach(atEnum => {
                javaCode += atEnum.toJava() + ",\n\t";
            });
            if (atrsEnum.length > 0) {
                javaCode = javaCode.substring(0, javaCode.length - 3) + ";\n\t"; // Quita última coma
            }
        }
        return javaCode;
    }

    escribirInterfaces(javaCode) {
        if (this.interfaces.length > 0) {
            javaCode += ` implements `;
            this.interfaces.forEach(interf => {
                javaCode += interf.nombre + ", ";
            });
            if (this.interfaces.length > 0) {
                javaCode = javaCode.substring(0, javaCode.length - 2); // Quita última coma
            }
        }
        return javaCode;
    }

    escribirSuperclase(javaCode) {
        if (this.superclase) {
            javaCode += ` extends ${this.superclase.nombre}`;
        }
        return javaCode;
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
            atributos = atributosSinProcesar.map(a => AtributoEnum.parse(a, nombre));
        } else {
            atributos = atributosSinProcesar.map(a => Atributo.parse(a, nombre));
        }
        metodos = metodosSinProcesar.map(m => Metodo.parse(m, nombre));

        return new Clase(tipo, nombre, atributos, metodos, new Rectangulo(coord));
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
        if (cad.match(/interf/i)) {
            tipo = 'interface';
        } else if (cad.match(/enum/i)) {
            tipo = 'enum';
        }
        return tipo;
    }
}