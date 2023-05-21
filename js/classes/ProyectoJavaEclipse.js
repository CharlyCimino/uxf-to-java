class ProyectoJavaEclipse extends ProyectoJava {
    constructor(filename, nombrePaquete, jdk, clasesJava) {
        super(filename, nombrePaquete, jdk, clasesJava);
    }

    completarZipSegunIDE(zip) {
        zip.folder(this.filename).folder(".settings").file("org.eclipse.jdt.core.prefs", this.getEclipsePrefs());
        zip.folder(this.filename).file(".classpath", this.getDotClassPath());
        zip.folder(this.filename).file(".project", this.getDotProject());
    }

    setCaracterTabulacionSegunIDE() {
        Clase.setTAB("\t");
    }

    getEclipsePrefs() {
        return `eclipse.preferences.version=1
org.eclipse.jdt.core.compiler.codegen.inlineJsrBytecode=enabled
org.eclipse.jdt.core.compiler.codegen.targetPlatform=${this.jdk}
org.eclipse.jdt.core.compiler.codegen.unusedLocal=preserve
org.eclipse.jdt.core.compiler.compliance=${this.jdk}
org.eclipse.jdt.core.compiler.debug.lineNumber=generate
org.eclipse.jdt.core.compiler.debug.localVariable=generate
org.eclipse.jdt.core.compiler.debug.sourceFile=generate
org.eclipse.jdt.core.compiler.problem.assertIdentifier=error
org.eclipse.jdt.core.compiler.problem.enablePreviewFeatures=disabled
org.eclipse.jdt.core.compiler.problem.enumIdentifier=error
org.eclipse.jdt.core.compiler.problem.reportPreviewFeatures=warning
org.eclipse.jdt.core.compiler.release=enabled
org.eclipse.jdt.core.compiler.source=${this.jdk}`;
    }

    getDotClassPath() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<classpath>
    <classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER/org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType/JavaSE-${this.jdk}">
    <attributes>
        <attribute name="module" value="true"/>
    </attributes>
    </classpathentry>
    <classpathentry kind="src" path="src"/>
    <classpathentry kind="output" path="bin"/>
</classpath>`;
    }

    getDotProject() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<projectDescription>
    <name>${this.filename}</name>
    <comment></comment>
    <projects>
    </projects>
    <buildSpec>
        <buildCommand>
            <name>org.eclipse.jdt.core.javabuilder</name>
            <arguments>
            </arguments>
        </buildCommand>
    </buildSpec>
    <natures>
        <nature>org.eclipse.jdt.core.javanature</nature>
    </natures>
</projectDescription>`;
    }
}