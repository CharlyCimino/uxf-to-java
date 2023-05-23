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

function createRegex(regexParts) {
    return new RegExp(regexParts.map(r => r.source).join(''), "gm");
}


/** * Regular Expresion IndexOf for Arrays 
* This little addition to the Array prototype will iterate over array 
* and return the index of the first element which matches the provided 
* regular expresion. 
* Note: This will not match on objects. 
* @param  {RegEx}   rx The regular expression to test with. E.g. /-ba/gim 
* @return {Numeric} -1 means not found */
if (typeof Array.prototype.regexIndexOf === 'undefined') {
    Array.prototype.regexIndexOf = function (rx) {
        for (let i in this) {
            i = parseInt(i);
            if (this[i].toString().match(rx)) {
                return i;
            }
        }
        return -1;
    };
}

/**
* @param  {RegEx}   rx The regular expression to test with. E.g. /-ba/gim 
* @return {Numeric} -1 means not found */
if (typeof Array.prototype.regexLastIndexOf === 'undefined') {
    Array.prototype.regexLastIndexOf = function (rx) {
        let i = this.length - 1;
        while (i >= 0 && !this[i].toString().match(rx)) {
            i--;
        }
        return i;
    };
}