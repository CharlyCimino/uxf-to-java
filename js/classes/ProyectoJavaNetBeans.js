class ProyectoJavaNetBeans extends ProyectoJava {
    constructor(filename, nombrePaquete, clasesJava) {
        super(filename, nombrePaquete, clasesJava);
    }

    getZip() {
        const zip = super.getZip();
        zip.folder(this.filename).folder("nbproject").file("project.xml", this.getProjectXML());
        zip.folder(this.filename).folder("nbproject").file("project.properties", this.getProjectProperties());
        return zip;
    }

    getProjectProperties() {
        return `build.generated.sources.dir=\${build.dir}/generated-sources
debug.modulepath=\
    \${run.modulepath}
debug.test.modulepath=\
    \${run.test.modulepath}
excludes=
includes=**
javac.modulepath=
javac.processormodulepath=
javac.test.modulepath=\
    \${javac.modulepath}
run.modulepath=\
    \${javac.modulepath}
run.test.modulepath=\
    \${javac.test.modulepath}
src.dir=src
test.src.dir=test`;
    }

    getProjectXML() {
        return `<?xml version="1.0" encoding="UTF-8"?>
                    <project xmlns="http://www.netbeans.org/ns/project/1">
                        <type>org.netbeans.modules.java.j2seproject</type>
                        <configuration>
                            <data xmlns="http://www.netbeans.org/ns/j2se-project/3">
                                <name>${this.filename}</name>
                                <source-roots>
                                    <root id="src.dir"/>
                                </source-roots>
                                <test-roots>
                                    <root id="test.src.dir"/>
                                </test-roots>
                            </data>
                        </configuration>
                    </project>`;
    }
}