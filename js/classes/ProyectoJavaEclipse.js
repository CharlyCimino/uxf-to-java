class ProyectoJavaEclipse extends ProyectoJava {
    constructor(filename, nombrePaquete, jdk, clasesJava) {
        super(filename, nombrePaquete, jdk, clasesJava);
    }

    getZip() {
        return super.getZip();
        console.warn("getZip de Eclipse pendiente...")
    }
}