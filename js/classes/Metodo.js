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

    toJava() {
        let javaCode = `\t${this.visibilidad}`;
        if (this.esStatic) javaCode += "static ";
        if (this.esAbstract) javaCode += "abstract ";
        javaCode += this.esConstructor ? "" : `${this.retorno} `;
        javaCode += `${this.nombre}(`;
        javaCode = this.escribirListaDeParametros(javaCode);
        javaCode += ")";
        javaCode = this.escribirImplementacion(javaCode);
        return javaCode;
    }

    escribirImplementacion(javaCode) {
        if (this.esAbstract) {
            javaCode += ";"; // Los métodos abstractos no llevan implementación
        } else {
            javaCode += " {\n\t\t// A resolver...\n\t}";
        }
        return javaCode;
    }

    escribirListaDeParametros(javaCode) {
        if (this.parametros.length > 0) {
            for (let i = 0; i < this.parametros.length; i++) {
                let parametro = this.parametros[i];
                javaCode += `${parametro.tipo} ${parametro.nombre}`;
                if (i !== this.parametros.length - 1) {
                    javaCode += ", ";
                }
            }
        }
        return javaCode;
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

        let [, visibilidad, nombre, listaDeParametros , retorno] = match;

        visibilidad = resolverVisibilidad(visibilidad?.trim());
        nombre = nombre?.trim();
        retorno = retorno ? retorno.trim() : 'void';
        esConstructor = nombreClase === nombre;

        parametros = [];
        if (listaDeParametros) {
            let parametrosText = listaDeParametros.trim().split(',');
            parametros = parametrosText.map((parametro, i) => {
                let partes = parametro.trim().split(':');
                partes = partes.map(p => p.trim());
                const { 0: nombre, 1: tipo } = partes;
                if (tipo) {
                    return { nombre, tipo };
                } else {
                    let nombreParametro;
                    if (nombre.includes('<')) {
                        nombreParametro = nombre.substring(0, nombre.indexOf('<'));
                    } else {
                        nombreParametro = `${nombre}${(i + 1)}`;
                    }
                    return {
                        nombre: nombreParametro.toLowerCase(),
                        tipo: nombre
                    };
                }
            });
        }
        return new Metodo(visibilidad, nombre, esStatic, esAbstract, esConstructor, parametros, retorno);
    }

    static getRegex() {
        return createRegex([
            /^(?:_|\/)?\s*/,                                    // Abstract o static (opcional)
            /([-+#]?)\s*/,                                      // Visibilidad (opcional)
            /([a-zA-Z0-9]+)/,                                  // Identificador
            /\s*\(\s*/,                                         // Paréntesis de apertura
            /((?:(?:(?:[a-zA-Z0-9<>? ]+\s*(?:,\s*[a-zA-Z0-9<>? ]+)*))|(?:[a-zA-Z0-9<>? ]+\s*(?::\s*[a-zA-Z0-9<>? ]+)?\s*(?:,\s*[a-zA-Z0-9<>? ]+\s*(?::\s*[a-zA-Z0-9<>? ]+)?)*))?)/,
            /\s*\)\s*/,                                         // Paréntesis de cierre
            /(?::\s*([a-zA-Z0-9<>]+))?/,                           // :Retorno (opcional)
            /(?:\s*(?:_|\/)?)/,                                 // Abstract o static (opcional)
            /$/,                                                // Fin de línea
        ]);
    }

    
}