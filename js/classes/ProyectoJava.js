class ProyectoJava {
    constructor(filename = "Proyecto sin nombre", nombrePaquete = "", clasesJava = []) {
        this.filename = filename;
        this.nombrePaquete = nombrePaquete;
        this.clasesJava = clasesJava;
    }

    getZip() {
        const zip = new JSZip();
        this.clasesJava.forEach(cl => {
            zip.file(`${cl.nombre}.java`, cl.toJava());
        })
        return zip;
    }
}