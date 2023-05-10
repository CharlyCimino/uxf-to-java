function loadFiles() {
  const input = document.getElementById("inputUxf");
  const reader = new FileReader();
  reader.onload = procesarArchivo;

  for (const file of input.files) {
    reader.readAsText(file);
  }
}

const upload = async (event) => {
  let files = Array.from(getFiles()).map(file => {
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
    const diagramas = res.map((xmlAsJson, i) => xmlToClassDiagram(getFileName(i), xmlAsJson));
    const results = document.querySelector("#results");
    diagramas.forEach(diagrama => {
      console.log(diagrama)
      const javaResult = diagrama.toJava();
      if (javaResult) {
        const preNode = document.createElement("pre");
        const codeNode = document.createElement("code");
        codeNode.classList.add('language-java');
        codeNode.textContent = javaResult;
        preNode.appendChild(codeNode);
        results.innerHTML += `<h2>${diagrama.nombre}</h2>`;
        results.appendChild(preNode);
      }
    });
    hljs.highlightAll();
  }
  catch (e) {
    document.querySelector(".err").innerHTML = (`<h3 style="color: crimson">${e}</h3>`);
    console.error(e)
  }

}

function getFiles() {
  return document.getElementById("inputUxf").files;
}

function getFileName(i) {
  // "Archivo.uxf" --> "Archivo"
  //return getFiles()[i].name.split(".")[0];
  return "Test";
}

function xmlToClassDiagram(filename, xmlAsJson) {
  const elements = xmlAsJson.diagram[0].element;
  return Diagrama.parse(filename,elements);
}


procesarArchivos([UML_TEST]);