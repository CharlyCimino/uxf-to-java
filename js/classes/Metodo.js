class Metodo {
    constructor(visibilidad = '', nombre = '', esFinal = false, esStatic = false, esAbstract = false, parametros = [], retorno = '') {
        this.visibilidad = visibilidad;
        this.nombre = nombre;
        this.esFinal = esFinal;
        this.esStatic = esStatic;
        this.esAbstract = esAbstract;
        this.parametros = parametros;
        this.retorno = retorno;
    }

    static parse(cad) {
        // Inicializar los valores predeterminados
        let visibilidad = '';
        let nombre = '';
        let esFinal = false;
        let esStatic = false;
        let esAbstract = false;
        let parametros = [];
        let retorno = '';

        // Determinar si es static
        ({ esStatic, valor: cad } = resolverStatic(cad));

        // Determinar si es abstract
        ({ esAbstract, valor: cad } = resolverAbstract(cad));

        // Determinar si es final
        if (cad.includes('final')) {
            esFinal = true;
        }

        let regexMetodo = /^([+\-#])?\s*(\w+)\((.*)\)\s*:\s*(\w+)/;
        let matchMetodo = regexMetodo.exec(cad);
        visibilidad = resolverVisibilidad(matchMetodo[1]);
        nombre = matchMetodo[2];
        retorno = matchMetodo[4];

        parametros = [];
        if (matchMetodo[3]) {
            let parametrosText = matchMetodo[3].split(',');
            parametros = parametrosText.map((parametro, i) => {
                let partes = parametro.trim().split(':');
                if (partes.length === 2) {
                    return { nombre: partes[0], tipo: partes[1] };
                } else {
                    return { nombre: `${partes[0].toLowerCase()}${(i+1)}`, tipo: partes[0] };
                }
            });
        }

        // Crear y retornar el objeto resultante
        return new Metodo(visibilidad, nombre, esFinal, esStatic, esAbstract, parametros, retorno);
    }

    toJava() {
        let javaCode = `\t${this.visibilidad}`;
        if (this.esStatic) javaCode += " static";
        if (this.esFinal) javaCode += " final";
        if (this.esAbstract) javaCode += " abstract";
        javaCode += ` ${this.retorno} ${this.nombre}(`;
        if (this.parametros.length > 0) {
            for (let i = 0; i < this.parametros.length; i++) {
                let parametro = this.parametros[i];
                javaCode += `${parametro.tipo} ${parametro.nombre}`;
                if (i !== this.parametros.length - 1) {
                    javaCode += ", ";
                }
            }
        }
        javaCode += ")";
        if (this.esAbstract) {
            javaCode += ";";
        } else {
            javaCode += " {\n\t\t// A resolver...\n\t}";
        }
        return javaCode;
    }
}