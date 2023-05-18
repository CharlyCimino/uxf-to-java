class ProyectoJavaNetBeans extends ProyectoJava {
    constructor(filename, nombrePaquete, jdk, clasesJava) {
        super(filename, nombrePaquete, jdk, clasesJava);
    }

    getZip() {
        const zip = super.getZip();
        zip.folder(this.filename).folder("nbproject").file("project.xml", this.getProjectXML());
        zip.folder(this.filename).folder("nbproject").file("project.properties", this.getProjectProperties());
        return zip;
    }

    getProjectProperties() {
        return `annotation.processing.enabled=true
annotation.processing.enabled.in.editor=false
annotation.processing.processor.options=
annotation.processing.processors.list=
annotation.processing.run.all.processors=true
annotation.processing.source.output=\${build.generated.sources.dir}/ap-source-output
build.classes.dir=\${build.dir}/classes
build.classes.excludes=**/*.java,**/*.form
# This directory is removed when the project is cleaned:
build.dir=build
build.generated.dir=\${build.dir}/generated
auxiliary.ModulePathsProblems.test.paths.check=false
build.generated.sources.dir=\${build.dir}/generated-sources
# Only compile against the classpath explicitly listed here:
build.sysclasspath=ignore
build.test.classes.dir=\${build.dir}/test/classes
build.test.results.dir=\${build.dir}/test/results
# Uncomment to specify the preferred debugger connection transport:
#debug.transport=dt_socket
debug.classpath=\
    \${run.classpath}
debug.modulepath=\
    \${run.modulepath}
debug.test.classpath=\
    \${run.test.classpath}
debug.test.modulepath=\
    \${run.test.modulepath}
# Files in build.classes.dir which should be excluded from distribution jar
dist.archive.excludes=
# This directory is removed when the project is cleaned:
dist.dir=dist
dist.jar=\${dist.dir}/${this.filename}.jar
dist.javadoc.dir=\${dist.dir}/javadoc
dist.jlink.dir=\${dist.dir}/jlink
dist.jlink.output=\${dist.jlink.dir}/${this.filename}
excludes=
includes=**
jar.compress=false
javac.classpath=
# Space-separated list of extra javac options
javac.compilerargs=
javac.deprecation=false
javac.external.vm=true
javac.modulepath=
javac.processormodulepath=
javac.processorpath=\
    \${javac.classpath}
javac.source=${this.jdk}
javac.target=${this.jdk}
javac.test.classpath=\
    \${javac.classpath}:\
    \${build.classes.dir}
javac.test.modulepath=\
    \${javac.modulepath}
javac.test.processorpath=\
    \${javac.test.classpath}
javadoc.additionalparam=
javadoc.author=false
javadoc.encoding=\${source.encoding}
javadoc.html5=false
javadoc.noindex=false
javadoc.nonavbar=false
javadoc.notree=false
javadoc.private=false
javadoc.splitindex=true
javadoc.use=true
javadoc.version=false
javadoc.windowtitle=
# The jlink additional root modules to resolve
jlink.additionalmodules=
# The jlink additional command line parameters
jlink.additionalparam=
jlink.launcher=true
jlink.launcher.name=${this.filename}
main.class=${this.nombrePaquete}.${"Test"}
manifest.file=manifest.mf
meta.inf.dir=\${src.dir}/META-INF
mkdist.disabled=false
platform.active=default_platform
run.classpath=\
    \${javac.classpath}:\
    \${build.classes.dir}
# Space-separated list of JVM arguments used when running the project.
# You may also define separate properties like run-sys-prop.name=value instead of -Dname=value.
# To set system properties for unit tests define test-sys-prop.name=value:
run.jvmargs=
run.modulepath=\
    \${javac.modulepath}
run.test.classpath=\
    \${javac.test.classpath}:\
    \${build.test.classes.dir}
run.test.modulepath=\
    \${javac.test.modulepath}
source.encoding=UTF-8
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