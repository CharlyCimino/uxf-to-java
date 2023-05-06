class AtributoEnum {
    constructor(nombre = '', valoresEntreParentesis = '') {
        this.nombre = nombre;
        this.valoresEntreParentesis = valoresEntreParentesis;
    }

    static order() {
        return 1;
    }

    static parse(cad) {
        let retorno;
        let nombre = '';
        let valoresEntreParentesis = '';

        let match = AtributoEnum.getRegex().exec(cad);
        if (!match) throw new Error(`No se pudo parsear valor '${cad}' de la clase enum ${nombreClase}\n${REVISAR_SINTAXIS}`);
        
        nombre = match[1];
        if (match[2]) {
            valoresEntreParentesis = match[2];
            retorno = new AtributoEnum(nombre, valoresEntreParentesis);
        } else {
            retorno = Atributo.parse(cad);
        }

        return retorno;
    }

    static getRegex() {
        return createRegex([
            /^(?:_)?\s*/,                                    // static (opcional)
            /(?:\+)?\s*/,                                    // public (opcional)
            /([a-zA-Z0-9]+)\s*/,                             // Identificador
            /(\(\s*[a-zA-Z0-9"'.]+\s*(?:,[a-zA-Z0-9"'.]+)*\s*\))?\s*/,  // Parámetros (opcionales)
            /(?::\s*[a-zA-Z0-9_]+)?/,                        // Tipo de dato (opcional)
            /_?/,                                            // Cierre de static (opcional)
            /$/,                                             // Fin de línea
        ]);
    }   

    toJava() {
        let javaCode = this.nombre;
        if (this.valoresEntreParentesis) {
            javaCode += `${this.valoresEntreParentesis}`;
        }
        return javaCode;
    }
}