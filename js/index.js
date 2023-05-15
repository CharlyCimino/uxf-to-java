const inputUxf = document.getElementById("inputUxf");
const form = document.getElementById("uxfToJavaForm");
const btnCerrarAlerta = document.getElementById("cerrarAlerta");
const divAlerta = document.getElementById('alerta');
const msgAlerta = document.getElementById('mensajeAlerta');

let diagram = undefined;
let javaProject = undefined;

async function processUploadFile(evt) {
  evt.preventDefault();
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const xmlString = reader.result;
      xmlAsJson = xmlToJSON.parseString(xmlString); 
      diagram = xmlToClassDiagram(getFileName(), xmlAsJson);
      console.log(diagram.toJava());
    } catch(e) {
      mostrarError(e);
      console.error(e);
    }
    
  };
  reader.readAsText(getFile());
}

function xmlToClassDiagram(filename, xmlAsJson) {
  const zoomLevel = xmlAsJson?.diagram[0]?.zoom_level[0]?._text;
  const elements = xmlAsJson?.diagram[0]?.element;
  return Diagrama.parse(filename, parseInt(zoomLevel), elements);
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
  divAlerta.style.display = "block";
}

form.addEventListener("submit", processUploadFile);
btnCerrarAlerta.addEventListener("click", e => {
  divAlerta.style.display = "none";
})