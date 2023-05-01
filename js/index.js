
//let diagram = new Diagrama();

// Lee el archivo ".uxf" y convierte su contenido a un objeto JavaScript
//const fileContents = fs.readFileSync('pruebaEnums.uxf', 'utf8');

//const json = xml2json("<prueba>Hola</prueba>");

function loadFile() {
  console.log("ok")
  const input = document.getElementById("inputUxf");
  const file = input.files[0];

  
  const reader = new FileReader();
  reader.onload = () => {
    const xmlString = reader.result;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    // Aquí puedes hacer lo que quieras con el documento XML
    result = xmlToJSON.parseString(xmlString);   // parse

    const elements = result.diagram[0].element;
    //console.log(elements);
    diagram = Diagrama.parse(elements);
    //console.log(diagram);
  
    const javaResult = diagram.toJava();
    console.log(javaResult)

  }
  reader.readAsText(file);
}

//loadFile();


/*const elements = result.diagram.element;

  diagram = Diagrama.parse(elements);
  //console.log(diagram);
  
  const javaResult = diagram.toJava();
  fs.writeFileSync(`${diagram.nombre}.java`, javaResult);*/
