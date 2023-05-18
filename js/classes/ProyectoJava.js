class ProyectoJava {
    constructor(filename = "Proyecto sin nombre", nombrePaquete = "", clasesJava = []) {
        this.filename = filename.trim().replaceAll(" ", "-");
        this.nombrePaquete = nombrePaquete;
        this.clasesJava = clasesJava;
        this.generarMain();
    }

    generarMain() {
        const nombreClaseMain = "Test";
        const mainUML = "_+main(args: String[]): void_";
        const metodoMain = Metodo.parse(mainUML, nombreClaseMain);
        const mainClass = new Clase("class", nombreClaseMain, [], [metodoMain]);
        this.clasesJava.push(mainClass);
    }

    getZip() {
        this.colocarPackageEnClases();
        this.clasesJava.forEach(cl => console.log(cl.toJava()));
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
