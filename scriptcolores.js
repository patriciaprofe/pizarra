const canvas = document.getElementById('canvas');//define una constante del elemento traido canvas
const ctx = canvas.getContext('2d'); // metodo que habilita al canvas para dibujar
let painting = false; //El cursor de pintar está falso al principio

canvas.width = 400;    //Define alto y ancho del tamaño del canvas
canvas.height = 400;

ctx.lineWidth = 5;      // Degine el ancho de la linea para dibujar
ctx.lineCap = 'round';
ctx.strokeStyle = '#000'; //Define el color inicial de la linea

const radios = document.querySelectorAll('input[type="radio"]'); //Trae todos los elementos radio
 const goma = document.getElementById("goma"); //trae el elemento goma


radios.forEach(radio => { //llama la función por cada radio que eschucha si cambia a 
 radio.addEventListener('change', function() { // cuando cambia el radio ...
      ctx.strokeStyle = this.value; // toma el valor de ese radio para asignarle el estilo de color
      ctx.lineWidth = 5;  //asigna el tamaño 5 al grosor de la pintura
      goma.checked = false; //elimina la opción de goma 
   });
  });
const borratodo = document.getElementById("borratodo"); //Toma el elemento del botón borra todo para blanquear la pantalla


function borrar(){   // Función goma. Pinta de blanco la goma 
  ctx.lineWidth = 15; // toma un grosor mayor
  ctx.strokeStyle = "white";//le asigna un color blanco
}

function borrarTodo(){    //Función que blanquea toda la pantalla. 
   ctx.fillStyle = "white"; // Define el color blanco para el estilo
   ctx.fillRect(0, 0, 400, 400); //El método fillRect nos sirve para crear un rectángulo relleno (pinta de blanco) 
}

function startPosition(e) { //toma el valor de la posición del puntero
  painting = true;          // asigna a la varible pintar verdadero
  draw(e);                   // Llama la función draw y le pasa la ubicación del puntero
}

function endPosition() {  //pone en falso el pincel inicializa el comienzo el la ruta para dibujar
  painting = false;
  ctx.beginPath();
}

function draw(e) {   
  if (!painting) return; // si paint es falso retorna de  lo contrario

  ctx.lineTo(e.offsetX, e.offsetY); // posiciona el puntero en la posición
  ctx.stroke(); //Activa el lapiz
  ctx.beginPath(); // dibuja desde donde comienza al linea
  ctx.moveTo(e.offsetX, e.offsetY); // posiciona el cursor virtual
}

canvas.addEventListener('mousedown', startPosition); // escucha el evento al entrar en el canvas
canvas.addEventListener('mouseup', endPosition); //escucha el evento al salir de canvas y ejecuta la fución 
canvas.addEventListener('mousemove', draw); //escucha el evento mientras el mouse se mueve en el canvas y llama la función draw
goma.addEventListener('change', borrar); //escucha el evento change de la casilla checkbox y llama al borrar
borratodo.addEventListener('click',borrarTodo); // escucha el evento clik del botón borrar todo y llama al evento
