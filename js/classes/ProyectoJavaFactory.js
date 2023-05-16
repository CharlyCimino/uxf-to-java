class ProyectoJavaFactory {
    static crearProyecto(tipoProyecto, filename, nombrePaquete, clasesJava) {
        let proyecto;
        switch (tipoProyecto) {
            case "NetBeans":
                proyecto = new ProyectoJavaNetBeans(filename, nombrePaquete, clasesJava);
                break;
            case "Eclipse":
                proyecto = new ProyectoJavaEclipse(filename, nombrePaquete, clasesJava);
                break;
        }
        return proyecto;
    }
}