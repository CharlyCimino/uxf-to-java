class AtributoEnum {
    constructor(nombre = '', valoresEntreParentesis = '') {
        this.nombre = nombre.trim();
        this.valoresEntreParentesis = valoresEntreParentesis.trim();
    }

    toJava() {
        let javaCode = this.nombre;
        if (this.valoresEntreParentesis) {
            javaCode += `${this.valoresEntreParentesis}`;
        }
        return javaCode;
    }

    static parse(cad, nombreClase) {
        let retorno;
        let nombre = '';
        let valoresEntreParentesis = '';

        let match = AtributoEnum.getRegex().exec(cad);
        if (!match) {
            retorno = Atributo.parse(cad, nombreClase);
        } else {
            [,nombre, valoresEntreParentesis] = match;
            retorno = new AtributoEnum(nombre, valoresEntreParentesis);
        }
        return retorno;
    }

    static getRegex() {
        return createRegex([
            /^(?:_)?\s*/,                                    // static (opcional)
            /(?:\+)?\s*/,                                    // public (opcional)
            /([A-Z](?:[A-Z0-9_]*[A-Z0-9])?)\s*/,             // Identificador en mayúsculas
            /(\(\s*[a-zA-Z0-9"'.]+\s*(?:,[a-zA-Z0-9"'.]+)*\s*\))?\s*/,  // Parámetros (opcionales)
            /(?::\s*[a-zA-Z0-9]+)?/,                        // Tipo de dato (opcional)
            /_?/,                                            // Cierre de static (opcional)
            /$/,                                             // Fin de línea
        ]);
    }      
}