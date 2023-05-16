const inputUxf = document.getElementById("inputUxf");
const form = document.getElementById("uxfToJavaForm");
const msgAlerta = document.getElementById('mensajeAlerta');
const inputNombrePaquete = document.getElementById('nombrePaquete');
const btnDescarga = document.getElementById('btnDescarga');
const msjInicialBtnDescargar = document.getElementById('msjInicialBtnDescargar');
const colaborar = document.getElementById('colaborar');
const modalError = new bootstrap.Modal(document.getElementById('modalError'));

let xmlAsJson = undefined;
let diagram = undefined;
let javaProject = undefined;

async function processUploadFile(evt) {
  evt.preventDefault();
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const xmlString = reader.result;
      xmlAsJson = xmlToJSON.parseString(xmlString); 
      activarBtnDescarga(true);
    } catch(e) {
      mostrarError(e);
      console.error(e);
      activarBtnDescarga(false);
    }    
  };
  reader.readAsText(getFile());
}

async function processDownloadProject(evt) {
  evt.preventDefault();
  try {
    diagram = xmlToClassDiagram(xmlAsJson);
    javaProject = classDiagramToJavaProject(diagram);
    const zip = javaProject.getZip();
    await descargar(zip);
    mostrarCartelColaborar(true);
  } catch(e) {
    mostrarCartelColaborar(false);
    mostrarError(e);
    console.error(e);
  }
}

async function descargar(zip) {
    const result = await zip.generateAsync({type: "blob"});
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(result);
    a.href = url;
    a.download = javaProject.filename;
    a.click();
}

function xmlToClassDiagram(xmlAsJson) {
  const zoomLevel = xmlAsJson?.diagram[0]?.zoom_level[0]?._text;
  const elements = xmlAsJson?.diagram[0]?.element;
  const filename = getFileName();
  const tipoColeccion = getRadioButtonCheckeado("tipoColeccion")?.value;
  return Diagrama.parse(filename, parseInt(zoomLevel), elements, tipoColeccion);
}

function classDiagramToJavaProject(diagram) {
  const tipoProyecto = getRadioButtonCheckeado("tipoProyecto")?.value;
  const nombrePaquete = inputNombrePaquete.value;
  return ProyectoJavaFactory.crearProyecto(tipoProyecto, getFileName(), nombrePaquete, diagram.clases);
}

function getRadioButtonCheckeado(nombreGrupoRadioButtons) {
  return Array.from(form.elements[nombreGrupoRadioButtons]).find(cb => cb.checked);
}

function activarBtnDescarga(flag) {
  btnDescarga.disabled = !flag;
  msjInicialBtnDescargar.style.display = flag ? "none" : "block";
}

function getFile() {
  return this.inputUxf.files[0];
}

function getFileName() {
  // "Archivo.uxf" --> "Archivo"
  return getFile().name.split(".")[0];
}

function mostrarError(err) {
  msgAlerta.innerHTML = err;
  modalError.show();  
}

function mostrarCartelColaborar(flag) {
  colaborar.style.display = !flag ? "none" : "block";
}

inputUxf.addEventListener("change", processUploadFile);
form.addEventListener("submit", processDownloadProject);