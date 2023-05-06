class Metodo {
    constructor(visibilidad = '', nombre = '', esStatic = false, esAbstract = false, esConstructor = false, parametros = [], retorno = '') {
        this.visibilidad = visibilidad;
        this.nombre = nombre;
        this.esStatic = esStatic;
        this.esAbstract = esAbstract;
        this.esConstructor = esConstructor;
        this.parametros = parametros;
        this.retorno = retorno;
    }

    static order() {
        return 4;
    }

    static parse(cad, nombreClase) {
        let esStatic = false;
        let esAbstract = false;
        let esConstructor = false;
        let parametros = [];

        // Determinar si es static
        ({ esStatic, valor: cad } = resolverStatic(cad));

        // Determinar si es abstract
        ({ esAbstract, valor: cad } = resolverAbstract(cad));

        let match = Metodo.getRegex().exec(cad);
        if (!match) throw new Error(`No se pudo parsear método '${cad}' de la clase ${nombreClase}\n${REVISAR_SINTAXIS}`);

        let [, visibilidad, nombre, , retorno] = match;

        
        visibilidad = resolverVisibilidad(match[1]?.trim());
        nombre = match[2]?.trim();
        retorno = match[4] ? match[4].trim() : 'void';
        esConstructor = nombreClase === nombre;

        parametros = [];
        if (match[3]) {
            let parametrosText = match[3].trim().split(',');
            parametros = parametrosText.map((parametro, i) => {
                let partes = parametro.trim().split(':');
                if (partes.length === 2) {
                    return { nombre: partes[0].trim(), tipo: partes[1].trim() };
                } else {
                    return { nombre: `${partes[0].trim().toLowerCase()}${(i + 1)}`, tipo: partes[0].trim() };
                }
            });
        }
        return new Metodo(visibilidad, nombre, esStatic, esAbstract, esConstructor, parametros, retorno);;
    }

    static getRegex() {
        return createRegex([
            /^(?:_|\/)?\s*/,                                    // Abstract o static (opcional)
            /([-+#]?)\s*/,                                      // Visibilidad (opcional)
            /([a-zA-Z0-9]+)/,                                  // Identificador
            /\s*\(\s*/,                                         // Paréntesis de apertura
            /((?:(?:(?:[a-zA-Z0-9]+\s*(?:,\s*[a-zA-Z0-9]+)*))|(?:[a-zA-Z0-9]+\s*(?::\s*[a-zA-Z0-9]+)?\s*(?:,\s*[a-zA-Z0-9]+\s*(?::\s*[a-zA-Z0-9]+)?)*))?)/,
            /\s*\)\s*/,                                         // Paréntesis de cierre
            /(?::\s*([a-zA-Z0-9]+))?/,                           // :Retorno (opcional)
            /(?:\s*(?:_|\/)?)/,                                 // Abstract o static (opcional)
            /$/,                                                // Fin de línea
        ]);
    }    

    toJava() {
        let javaCode = `\t${this.visibilidad}`;
        if (this.esStatic) javaCode += "static ";
        if (this.esAbstract) javaCode += "abstract ";
        javaCode += this.esConstructor ? "" : `${this.retorno} `;
        javaCode += `${this.nombre}(`;
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