console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");


//-- Obtener Sonidos
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  SAQUE: 1,
  JUGANDO: 2,
  SAQUE_DCHA: 3
}

//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;
//-- Pintar todos los objetos en el canvas
function draw() {
  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if (estado == ESTADO.JUGANDO) {
    bola.draw();
  }

  //-- Dibujar las raquetas
  raqI.draw();
  raqD.draw();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Estilo de la linea: discontinua
  //-- Trazos de 10 pixeles, y 10 de separacion
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 0);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  //------ Dibujar el tanteo
  ctx.font = "70px 'Press Start 2P', cursive";
  ctx.fillStyle = "white";
  ctx.fillText(raqI.puntos, 200, 80);
  ctx.fillText(raqD.puntos, 340, 80);

  //-- Dibujar el texto de sacar
  //if (estado == ESTADO.SAQUE) {
    //ctx.font = "40px Arial";
    //ctx.fillStyle = "yellow";
    //ctx.fillText("Saca!", 30, 350);
  //}

  //-- Dibujar el texto de comenzar
  if (estado == ESTADO.INIT) {
    ctx.font = "40px 'Press Start 2P', cursive";
    ctx.fillStyle = "white";
    ctx.fillText("Press Start", 90, 220);
  }
}

//---- Bucle principal de la animación
function animacion()
{

  //-- Actualizar las posiciones de los objetos móviles

  //-- Actualizar la raqueta con la velocidad actual
  raqI.update();
  raqD.update();

  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= canvas.width) {
    //-- Hay colisión. Cambiar el signo de la bola
    //bola.vx = bola.vx * -1;
    raqI.puntos+=1;
    //-- Reproducir sonido
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
    estado = ESTADO.SAQUE_DCHA;
    bola.init_dcha();

  }
  //--Comprobar si la bola ha alcanzado el límite izquierdo
  if(bola.x <= (canvas.width ==0)){
    //bola.vx = bola.vx*-1;
    raqD.puntos+=1;
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
    estado = ESTADO.SAQUE;
    bola.init();

  }

  //--Comprobar si la bola alcanza el límite inferior y superior
  if(bola.y >= canvas.height){
    bola.vy = bola.vy *-1;
  }
  if(bola.y <= (canvas.height==0)){
    bola.vy = bola.vy *-1;
  }

  //-- Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
      bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
      bola.vx = bola.vx * -1;
      //-- Reproducir sonido
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();
  }
  //--Comprobar si hay colisión con la raqueta derecha
  if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width) &&
      bola.y >= raqD.y && bola.y <=(raqD.y + raqD.height)) {
      bola.vx = bola.vx * -1;
      //-- Reproducir sonido
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();
  }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola.update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();
}

//-- Inicializa la bola: Llevarla a su posicion inicial
const bola = new Bola(ctx);

//-- Crear las raquetas
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);

//-- Cambiar las coordenadas de la raqueta derecha
raqD.x_ini = 540;
raqD.y_ini = 300;
raqD.init();

//-- Arrancar la animación
setInterval(()=>{
  animacion();
},16);

//-- Retrollamada de las teclas
window.onkeydown = (e) => {
switch (e.key) {
  case "s":
    raqI.v = raqI.v_ini;
    break;
  case "w":
    raqI.v = raqI.v_ini * -1;
    break;
  case "ArrowUp":
    raqD.v = raqD.v_ini * -1;
    break;
  case "ArrowDown":
    raqD.v = raqD.v_ini;
    break;
  case " ":

    //-- El saque solo funciona en el estado de SAQUE
    if (estado == ESTADO.SAQUE) {
      //-- Reproducir sonido
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();

      //-- Llevar bola a su posicion incicial
      bola.init();

      //-- Darle velocidad
      bola.vx = bola.vx_ini;
      bola.vy = bola.vy_ini;

      //-- Cambiar al estado de jugando!
      estado = ESTADO.JUGANDO;

      return false;
    }
    if (estado == ESTADO.SAQUE_DCHA) {
      //-- Reproducir sonido
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();

      //-- Llevar bola a su posicion incicial
      bola.init_dcha();

      //-- Darle velocidad
      bola.vx = bola.vx_ini_dcha;
      bola.vy = bola.vy_ini_dcha;

      //-- Cambiar al estado de jugando!
      estado = ESTADO.JUGANDO;

      return false;
    }
  default:
}
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "s" || e.key == "w"){
    //-- Quitar velocidad de la raqueta
    raqI.v = 0;
  }

  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
    raqD.v = 0;
  }
}
//-- Botón de arranque
const start = document.getElementById("start");

start.onclick = () => {
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

//-- Boton de stop
const stop = document.getElementById("stop");

stop.onclick = () => {
  //-- Volver al estado inicial
  estado = ESTADO.INIT;
  bola.init();
  raqD.puntos = 0;
  raqI.puntos = 0;
  start.disabled = false;
}
