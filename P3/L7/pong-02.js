console.log("Ejecutando JS...");
//--Obtener objeto canvas
const canvas = document.getElementById('canvas');

//--Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log('canvas:Anchura:${canvas.width}, Altura:${canvas.height}');

//--Obtenerel contexto par pintar en el canvas
const ctx = canvas.getContext("2d");

//--Dibujar la bola
ctx.beginPath();
ctx.fillStyle="white";

//--x,y,anchura, altura
ctx.rect(100,200,10,10);
ctx.fill();
