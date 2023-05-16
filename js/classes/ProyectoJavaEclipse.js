class ProyectoJavaEclipse extends ProyectoJava {
    constructor(filename, nombrePaquete, clasesJava) {
        super(filename, nombrePaquete, clasesJava);
    }

    getZip() {
        super.getZip();
        console.warn("getZip de Eclipse pendiente...")
    }
}