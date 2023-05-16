class ProyectoJavaNetBeans extends ProyectoJava {
    constructor(filename, nombrePaquete, clasesJava) {
        super(filename, nombrePaquete, clasesJava);
    }

    getZip() {
        return super.getZip();
        console.warn("getZip de NetBeans pendiente...")
    }
}