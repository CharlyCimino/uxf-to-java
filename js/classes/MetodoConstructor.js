class MetodoConstructor {
    constructor(visibilidad = '', nombre = '', parametros = []) {
        this.visibilidad = visibilidad;
        this.nombre = nombre;
        this.parametros = parametros;
    }

    static order() {
        return 3;
    }

    static parse(cad) {
        // Inicializar los valores predeterminados
        let visibilidad = '';
        let nombre = '';
        let parametros = [];

        let match = MetodoConstructor.getRegex().exec(cad);
        if (!match) throw new Error(`No se pudo parsear método constructor: '${cad}'\n${REVISAR_SINTAXIS}`);

        visibilidad = resolverVisibilidad(match[1]);
        nombre = match[2];

        parametros = [];
        if (match[3]) {
            let parametrosText = match[3].split(',');
            parametros = parametrosText.map((parametro, i) => {
                let partes = parametro.trim().split(':');
                if (partes.length === 2) {
                    return { nombre: partes[0], tipo: partes[1] };
                } else {
                    return { nombre: `${partes[0].toLowerCase()}${(i + 1)}`, tipo: partes[0] };
                }
            });
        }

        // Crear y retornar el objeto resultante
        return new MetodoConstructor(visibilidad, nombre, parametros);
    }

    static getRegex() {
        /*
            NombreClase()
            +NombreClase()
            #NombreClase()
            -NombreClase()
            +NombreClase(Tipo x)
            +NombreClase(Tipo x1, Tipo x2)
            +NombreClase(Tipo)
            +NombreClase(Tipo, Tipo)
        */
        return /^([+\-#])?\s*(\w+)\((.*?)\)\s*(?::\s*(\w+))?/;
    }

    toJava() {
        let javaCode = `\t${this.visibilidad}`;
        javaCode += ` ${this.nombre}(`;
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
        javaCode += " {\n\t\t// A resolver...\n\t}";
        return javaCode;
    }
}