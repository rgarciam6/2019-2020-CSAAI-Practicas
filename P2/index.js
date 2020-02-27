console.log("Ejecutando JS...");

display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
punto = document.getElementById("punto")
del= document.getElementById('del')
digitos = document.getElementsByClassName('cdigito')
operaciones = document.getElementsByClassName('coperacion')
for(i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev) =>{
    digito(ev.target);
  }
}
for(i=0; i<operaciones.length; i++){
  operaciones[i].onclick = (ev) =>{
    display.innerHTML += ev.target.value;
  }
}

function digito(boton)
{
  if (display.innerHTML == "0"){
    display.innerHTML = boton.value;
  } else{
    display.innerHTML += boton.value;
  }
}

punto.onclick = () =>{
  display.innerHTML += punto.value;
}
//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}
del.onclick = () => {
  display.innerHTML = display.innerHTML.slice(0,-1);
}
