console.log("Ejecutando JS");

//----- Obtener elemento de video y configurarlo
const video = document.getElementById("video")
video.width=500;  //-- Tamaño de la pantalla de video
video.height=500;

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
video.poster="https://cdn.pixabay.com/photo/2015/03/15/09/35/intermission-674178_1280.png";


const video1 = document.getElementById("video1")
video1.width=150;  //-- Tamaño de la pantalla de video
video1.height=100;
video1.src = "labandadelpatio.mp4";
const video2 = document.getElementById("video2")
video2.width=150;  //-- Tamaño de la pantalla de video
video2.height=100;
video2.src="got.mp4";
const video3 = document.getElementById("video3")
video3.width=150;  //-- Tamaño de la pantalla de video
video3.height=100;
video3.src="narcos.mp4"
const imagen = document.getElementById("imagen")
imagen.width = 150;
imagen.height = 100;




//-- Función de retrollamada de los botones de las fuentes
fuente1.onclick = () => {
  console.log("Fuente1");
  video.src = video1.src;
  video.currentTime = video1.currentTime;
  video1.style.border = "4px solid red"
  video2.style.border = "0"
  video3.style.border = "0"
  imagen.style.border = "0"
  video.play();

};
fuente2.onclick = () => {
  console.log("Fuente2");
  video.src = video2.src;
  video.currentTime = video2.currentTime;
  video1.style.border = "0";
  video2.style.border = "4px solid red";
  video3.style.border = "0";
  imagen.style.border = "0";
  video.play();

};
fuente3.onclick = () => {
  console.log("Fuente3");
  video.src = video3.src;
  video.currentTime = video3.currentTime;
  video1.style.border = "0";
  video2.style.border = "0";
  video3.style.border = "4px solid red";
  imagen.style.border = "0";
  video.play();
};
fuente4.onclick = () => {
  console.log("Fuente4");
  video.src = null;
  video.poster = imagen.src;
  video1.style.border = "0";
  video2.style.border = "0";
  video3.style.border = "0";
  imagen.style.border = "4px solid red";
};