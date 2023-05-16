const inputUxf = document.getElementById("inputUxf");
const form = document.getElementById("uxfToJavaForm");
const msgAlerta = document.getElementById('mensajeAlerta');
const inputNombrePaquete = document.getElementById('nombrePaquete');
const btnDescarga = document.getElementById('btnDescarga');
const msjInicialBtnDescargar = document.getElementById('msjInicialBtnDescargar');
const modalError = new bootstrap.Modal(document.getElementById('modalError'))

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

function processDownloadProject(evt) {
  evt.preventDefault();
  try {
    diagram = xmlToClassDiagram(xmlAsJson);
    javaProject = classDiagramToJavaProject(diagram);
    console.log(diagram.toJava());
    console.log(javaProject);
  } catch(e) {
    mostrarError(e);
    console.error(e);
  }
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
  return new ProyectoJava(getFileName(), nombrePaquete, tipoProyecto, diagram.toJava());
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

inputUxf.addEventListener("change", processUploadFile);
form.addEventListener("submit", processDownloadProject);