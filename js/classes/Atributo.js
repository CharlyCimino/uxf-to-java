class Atributo {
    constructor(visibilidad = '', nombre = '', tipo = '', esFinal = false, esStatic = false, valor = '') {
        this.visibilidad = visibilidad;
        this.nombre = nombre;
        this.tipo = tipo;
        this.esFinal = esFinal;
        this.esStatic = esStatic;
        this.valor = valor;
    }

    static parse(attrItem) {
        // Inicializar los valores predeterminados
        let visibilidad = '';
        let nombre = '';
        let tipo = '';
        let esFinal = false;
        let esStatic = false;
        let valor = '';

        // Determinar si es static
        ({ esStatic, valor: attrItem } = resolverStatic(attrItem));

        // Determinar si es final
        if (attrItem.includes('final') || attrItem.includes('=')) {
            esFinal = true;
        }
        let regex = /^([+\-#~])?\s*(\w+)\s*:\s*(\w+)(?:\s*=\s*(.+))?$/;
        [,visibilidad, nombre, tipo, valor] = attrItem.match(regex);

        return new Atributo(resolverVisibilidad(visibilidad), nombre, tipo, esFinal, esStatic, valor);
    }

    toJava() {
        let javaCode = this.visibilidad + ' ';
        if (this.esStatic) {
          javaCode += 'static ';
        }
        if (this.esFinal) {
          javaCode += 'final ';
        }
        javaCode += this.tipo + ' ' + this.nombre;
        if (this.valor) {
          javaCode += ' = ' + this.valor;
        }
        javaCode += ';';
        return javaCode;
      }
}