class ProyectoJava {
    constructor(filename = "Proyecto sin nombre", nombrePaquete = "", jdk = "1.8", clasesJava = []) {
        this.filename = filename.trim().replaceAll(" ", "-");
        this.nombrePaquete = nombrePaquete;
        this.clasesJava = clasesJava;
        this.jdk = jdk;
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
        this.corregirFechaJSZip(); // Para evitar error de fecha de modificación en los archivos generados
        this.colocarPackageEnClases();
        this.clasesJava.forEach(cl => console.log(cl.toJava()));
        const zip = new JSZip();
        const folderProjectZip = zip.folder(this.filename);
        this.generarCarpetaDeFuentesJava(folderProjectZip);
        return zip;
    }

    corregirFechaJSZip() {
        const currDate = new Date();
        const dateWithOffset = new Date(currDate.getTime() - currDate.getTimezoneOffset() * 60000);
        JSZip.defaults.date = dateWithOffset;
    }

    colocarPackageEnClases() {
        this.clasesJava.forEach(cl => {
            cl.addPackage(this.nombrePaquete);
        })
    }

    generarCarpetaDeFuentesJava(zip) {
        let pathSrc = "src";
        if (this.nombrePaquete) {
            pathSrc += "/" + this.nombrePaquete.replaceAll(".", "/");
        }
        this.clasesJava.forEach(cl => {
            zip.file(`${pathSrc}/${cl.nombre}.java`, cl.toJava());
        })
    }
}
