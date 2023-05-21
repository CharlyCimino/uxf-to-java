const JAVA_IMPORTS = {
    ArrayList: "java.util.ArrayList",
    LinkedList: "java.util.LinkedList",
    List: "java.util.List",
    Collection: "java.util.Collection",
}

function resolverAbstract(cad) {
    const esAbstract = cad.includes('abstract') || cad.startsWith('/');
    return {
        esAbstract,
        valor: esAbstract ? cad.slice(1, cad.length - 1) : cad
    };
}

function resolverStatic(cad) {
    const esStatic = cad.includes('static') || cad.startsWith('_');
    return {
        esStatic,
        valor: esStatic ? cad.slice(1, cad.length - 1) : cad
    };
}

function resolverVisibilidad(cad) {
    let vis = '';
    switch (cad) {
        case '+':
            vis = 'public '
            break;
        case '-':
            vis = 'private '
            break;
        case '#':
            vis = 'protected '
            break;
    }
    return vis;
}

function dataElementoToArray(cad) {
    return cad.replaceAll('  ', '').split('\n').filter(x => x !== '')
}