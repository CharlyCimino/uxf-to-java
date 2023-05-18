class ProyectoJavaFactory {
    static crearProyecto(tipoProyecto, filename, nombrePaquete, jdk, clasesJava) {
        let proyecto;
        switch (tipoProyecto) {
            case "NetBeans":
                proyecto = new ProyectoJavaNetBeans(filename, nombrePaquete, jdk, clasesJava);
                break;
            case "Eclipse":
                proyecto = new ProyectoJavaEclipse(filename, nombrePaquete, jdk, clasesJava);
                break;
        }
        return proyecto;
    }
}