

function procesarXml(xmlObject) {

}

function loadFiles() {
  const input = document.getElementById("inputUxf");
  const reader = new FileReader();
  reader.onload = procesarArchivo;

  for (const file of input.files) {
    reader.readAsText(file);
  }
}

const upload = async (event) => {
  let files = Array.from(document.getElementById("inputUxf").files).map(file => {
    let reader = new FileReader();
    return new Promise(async resolve => {
      reader.onload = () => resolve(reader.result);
      reader.readAsText(file);
    });
  });

  let res = await Promise.all(files);
  procesarArchivos(res);
}

function procesarArchivos(archivos) {
  try {
    const res = archivos.map(fileString => xmlToJSON.parseString(fileString));
    const diagramas = res.map(xmlLetino => xmlToClassDiagram(xmlLetino));
    diagramas.forEach(diagrama => {
      const javaResult = diagrama.toJava();
      if (javaResult) {
        document.querySelector("#result").innerHTML = javaResult;
        hljs.highlightAll();
      }
    });
  }
  catch (e) {
    document.querySelector(".err").innerHTML = (`<h3 style="color: crimson">${e}</h3>`);
    console.error(e)
  }

}

function xmlToClassDiagram(xmlObject) {
  const elements = xmlObject.diagram[0].element;
  return Diagrama.parse(elements);
}