class Clase {

    static TAB = "\t";

    constructor(tipo = '', nombre = '', atributos = [], metodos = [], rectangulo) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.atributos = atributos;
        this.metodos = metodos;
        this.rectangulo = rectangulo;
        this.package = undefined;
        this.superclase = undefined;
        this.interfaces = new Set();
        this.imports = new Set();
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
        this.interfaces.add(interf);
    }

    addPackage(p) {
        if (p != "" && !p.match(/^[a-z0-9]+(\.[a-z0-9]*)*$/)) {
            throw new Error(`'${p}' no es un nombre de paquete válido`);
        }
        this.package = p;
    }

    addImport(imp) {
        this.imports.add(imp);
    }

    esConectadaPor(puntoDeRelacion) {
        return this.rectangulo.esConectadoPor(puntoDeRelacion);
    }

    toJava() {
        let javaCode = "";
        javaCode = this.escribirPaquete(javaCode);
        javaCode = this.escribirImports(javaCode);
        javaCode = this.escribirComentario(javaCode);
        javaCode += `public ${this.tipo} ${this.nombre}`;
        javaCode = this.escribirSuperclase(javaCode);
        javaCode = this.escribirInterfaces(javaCode);
        javaCode += ` {\n\n${Clase.TAB}`;
        javaCode = this.escribirValoresEnum(javaCode);
        javaCode = this.escribirAtributos(javaCode);
        javaCode += "\n";
        javaCode = this.escribirMetodos(javaCode);
        javaCode += "}";
        return javaCode;
    }

    escribirPaquete(javaCode) {
        if (this.package) {
            javaCode += `package ${this.package};\n\n`;
        }
        return javaCode;
    }

    escribirImports(javaCode) {
        if (this.imports.size > 0) {
            this.imports.forEach(imp => {
                javaCode += `import ${imp};\n`;
            });
            javaCode += `\n`;
        }
        return javaCode;
    }

    escribirComentario(javaCode) {
        javaCode += `/**
* Código generado por la app UXFtoJava by Charly Cimino
* @see https://github.com/CharlyCimino/uxf-to-java
*/\n`;
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
            javaCode += at.toJava() + `\n${Clase.TAB}`;
        });
        return javaCode;
    }

    escribirValoresEnum(javaCode) {
        if (this.tipo === "enum") {
            const atrsEnum = this.atributos.filter(at => at instanceof AtributoEnum);
            if (atrsEnum.length > 0) {
                for (let i = 0; i < atrsEnum.length - 1; i++) {
                    javaCode += atrsEnum[i].toJava() + `,\n${Clase.TAB}`;
                }
                javaCode += atrsEnum[atrsEnum.length - 1].toJava() + `;\n${Clase.TAB}`;
            }
        }
        return javaCode;
    }

    escribirInterfaces(javaCode) {
        if (this.interfaces.size > 0) {
            javaCode += ` implements `;
            this.interfaces.forEach(interf => {
                javaCode += interf.nombre + ", ";
            });
            if (this.interfaces.size > 0) {
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

    static setTAB(newTab) {
        Clase.TAB = newTab;
    }
}