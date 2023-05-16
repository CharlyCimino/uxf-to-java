class ProyectoJava {
    constructor(filename = "Proyecto sin nombre", nombrePaquete = "", clasesJava = []) {
        this.filename = filename;
        this.nombrePaquete = nombrePaquete;
        this.clasesJava = clasesJava;
    }

    getZip() {
        const zip = new JSZip();
        this.generarCarpetaSrc(zip);
        return zip;
    }

    generarCarpetaSrc(zip) {
        let pathSrc = "src";
        if (this.nombrePaquete) {
            pathSrc += "/" + this.nombrePaquete.replaceAll(".", "/");
        }
        console.log(pathSrc);
        this.clasesJava.forEach(cl => {
            zip.file(`${pathSrc}/${cl.nombre}.java`, cl.toJava());
        })
    }
}