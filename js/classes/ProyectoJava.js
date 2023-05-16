class ProyectoJava {
    constructor(filename = "Proyecto sin nombre", nombrePaquete = "", clasesJava = []) {
        this.filename = filename;
        this.nombrePaquete = nombrePaquete;
        this.clasesJava = clasesJava;
    }

    getZip() {
        this.colocarPackageEnClases();
        const zip = new JSZip();
        this.generarCarpetaSrc(zip);
        return zip;
    }

    colocarPackageEnClases() {
        this.clasesJava.forEach(cl => {
            cl.addPackage(this.nombrePaquete);
        })
    }

    generarCarpetaSrc(zip) {
        let pathSrc = "src";
        if (this.nombrePaquete) {
            pathSrc += "/" + this.nombrePaquete.replaceAll(".", "/");
        }
        this.clasesJava.forEach(cl => {
            console.log(cl.toJava())
            zip.file(`${pathSrc}/${cl.nombre}.java`, cl.toJava());
        })
    }
}
