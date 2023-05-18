class ProyectoJava {
    constructor(filename = "Proyecto sin nombre", nombrePaquete = "", clasesJava = []) {
        this.filename = filename.trim().replaceAll(" ", "-");
        this.nombrePaquete = nombrePaquete;
        this.clasesJava = clasesJava;
    }

    getZip() {
        this.colocarPackageEnClases();
        const zip = new JSZip();
        const folderProjectZip = zip.folder(this.filename);
        this.generarCarpetaSrc(folderProjectZip);
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
            zip.file(`${pathSrc}/${cl.nombre}.java`, cl.toJava());
        })
    }
}
