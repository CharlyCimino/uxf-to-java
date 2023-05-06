
//let diagram = new Diagrama();

// Lee el archivo ".uxf" y convierte su contenido a un objeto JavaScript
//const fileContents = fs.readFileSync('pruebaEnums.uxf', 'utf8');

//const json = xml2json("<prueba>Hola</prueba>");

function loadFile() {
  /*const input = document.getElementById("inputUxf");
  const file = input.files[0];

  const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
  const reader = new FileReader();
  reader.onload = () => {
    const xmlString = reader.result;
    const parser = new DOMParser();
    

  }
  reader.readAsText(file);*/


    
  // Aquí puedes hacer lo que quieras con el documento XML
  try {
    result = xmlToJSON.parseString(UML_TEST);   // parse
    const elements = result.diagram[0].element;
    //console.log(elements);
    
    diagram = Diagrama.parse(elements);
    console.log(diagram);
    
    const javaResult = diagram.toJava();
    if(javaResult) {
      document.querySelector("#result").innerHTML= javaResult;
      hljs.highlightAll();
    }
  } catch(e) {
    document.querySelector(".err").innerHTML = (`<h3 style="color: crimson">${e}</h3>`);
    console.error(e)
  }
  
}

loadFile();


/*const elements = result.diagram.element;

  diagram = Diagrama.parse(elements);
  //console.log(diagram);
  
  const javaResult = diagram.toJava();
  fs.writeFileSync(`${diagram.nombre}.java`, javaResult);*/
