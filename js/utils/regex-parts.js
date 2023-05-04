const VISIBILIDAD = `[-+#]`;
const IDENTIFICADOR = `[a-zA-Z0-9]+`;
const PARENTESIS_APERTURA = `\\(`;
const PARENTESIS_CIERRE = `\\)`;
const ESPACIO = `\\s`;


const REGEX_METODO_1 = `[-+#]?\\s*[a-zA-Z0-9]+\\s*\\(\\s*`;


function createRegex() {
    return new RegExp(["^",
            /[-+#]?/,                                           // Visibilidad (opcional)
            /\s*/,                                              // Posibles espacios
            /[a-zA-Z0-9_]*/,                                    // Identificador
            /\s*/,                                              // Posibles espacios
            /\(/,                                               // Paréntesis de apertura
            /\s*/,                                              // Posibles espacios
            /((([a-zA-Z0-9_]*\s*(,\s*[a-zA-Z0-9_]*)*))|([a-zA-Z0-9_]*\s*(:\s*[a-zA-Z0-9_]*)?\s*(,\s*[a-zA-Z0-9_]*\s*(:\s*[a-zA-Z0-9_]*)?)*))/,
            /\s*/,                                              // Posibles espacios
            /\)/,                                               // Paréntesis de cierre
        ].map(r => r.source).join(''), "gm");
}


// [a-zA-Z0-9_]*\(\s*(?:[a-zA-Z0-9_]*\s*:\s*[a-zA-Z0-9_]*\s*,\s*)*[a-zA-Z0-9_]*\s*:\s*[a-zA-Z0-9_]*\s*\)\s*:\s*[a-zA-Z0-9_]*\s*$|^[-+#]?[a-zA-Z0-9_]*\(\s*(?:[a-zA-Z0-9_]*\s*:\s*[a-zA-Z0-9_]*\s*)?\)\s*(?::\s*[a-zA-Z0-9_]*)?$

// /[-+#]?\s*[a-zA-Z0-9]+\s*/

// ^[-+#]?[a-zA-Z0-9]+\(\s*(([a-zA-Z0-9]+\s+[a-zA-Z0-9]*(,\s*)?)|(\)))*(:\s*[a-zA-Z0-9]+)?\)$