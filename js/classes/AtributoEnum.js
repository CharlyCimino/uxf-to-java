class AtributoEnum {
    constructor(nombre = '', valores = '') {
        this.nombre = nombre;
        this.valores = valores;
    }

    static order() {
        return 1;
    }

    static parse(cad) {
        let retorno;
        // Inicializar los valores predeterminados
        let cadTrasStatic;
        let nombre = '';
        let valores = '';

        // Determinar si es static
        ({ valor: cadTrasStatic } = resolverStatic(cad));

        const regex = /\+?(\w+)(?:\((.*?)\))?/;
        const match = cadTrasStatic.match(regex);
        
        if (match && !cadTrasStatic.includes(":")) {
            nombre = match[1];
            valores = match[2] || "";
            retorno = new AtributoEnum(nombre, valores);
        } else {
            retorno = Atributo.parse(cad);
        }

        return retorno;
    }

    toJava() {
        let javaCode = this.nombre;
        if (this.valores) {
            javaCode += `(${this.valores})`;
        }
        return javaCode;
    }
}