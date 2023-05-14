class Atributo {
  constructor(visibilidad = '', nombre = '', tipo = '', esFinal = false, esStatic = false, valor = '') {
    this.visibilidad = visibilidad;
    this.nombre = nombre.trim();
    this.tipo = tipo.trim();
    this.esFinal = esFinal;
    this.esStatic = esStatic;
    this.valor = valor.trim();
  }

  toJava() {
    let javaCode = this.visibilidad;
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

  static parse(cad, nombreClase) {
    let esFinal = false;

    let match = Atributo.getRegex().exec(cad);
    if (!match) throw new Error(`No se pudo parsear atributo '${cad}' de la clase ${nombreClase}\n${REVISAR_SINTAXIS}`);

    let [, esStatic, visibilidad, nombre, tipo, valor] = match;

    if (valor) {
      esFinal = true;
    }

    if (!tipo) {
      tipo = 'Object';
    }

    if (esStatic) {
      esStatic = true;
    }

    return new Atributo(resolverVisibilidad(visibilidad), nombre, tipo, esFinal, esStatic, valor);
  }

  static getRegex() {
    return createRegex([
      /^(_)?\s*/,                                    // static (opcional)
      /([-+#]?)\s*/,                                  // Visibilidad (opcional)
      /([a-zA-Z](?:[a-zA-Z0-9_]*[a-zA-Z0-9])?)\s*/,   // Identificador
      /(?::(\s*[a-zA-Z0-9<>]+))?\s*/,                   // Tipo (opcional)
      /(?:=(\s*[a-zA-Z0-9"'. ]+))?\s*/,                // Valor (opcional)
      /_?/,                                            // Cierre de static (opcional)
      /$/,                                             // Fin de línea
    ]);
  }

  
}