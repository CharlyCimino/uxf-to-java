class Atributo {
    constructor(visibilidad = '', nombre = '', tipo = '', esFinal = false, esStatic = false, valor = '') {
        this.visibilidad = visibilidad;
        this.nombre = nombre;
        this.tipo = tipo;
        this.esFinal = esFinal;
        this.esStatic = esStatic;
        this.valor = valor;
    }

    static order() {
      return 2;
    }

    static parse(cad) {
        // Inicializar los valores predeterminados
        let visibilidad = '';
        let nombre = '';
        let tipo = '';
        let esFinal = false;
        let esStatic = false;
        let valor = '';

        // Determinar si es static
        ({ esStatic, valor: cad } = resolverStatic(cad));

        // Determinar si es final
        if (cad.includes('final') || cad.includes('=')) {
            esFinal = true;
        }
        let regex = /^([+\-#~])?\s*(\w+)\s*:\s*(\w+)(?:\s*=\s*(.+))?$/;
        let matchAtributo = regex.exec(cad);

        if(!matchAtributo) throw new Error(`Error al parsear atributo: ${cad}`);

        [,visibilidad, nombre, tipo, valor] = matchAtributo;

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