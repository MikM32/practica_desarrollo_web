"use strict";

function iniciar() {
  var botones = document.querySelectorAll("button[data-piso]");
  var i;
  for (i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function (evento) {
      var piso = parseInt(evento.target.getAttribute("data-piso"), 10);
      window.Ascensor.llamarAscensor(piso);
    });
  }

  var btnLimpiar = document.getElementById("btn-limpiar");
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", function () {
      window.Ascensor.limpiarHistorial();
    });
  }

  var sliderVelocidad = document.getElementById("velocidad");
  if (sliderVelocidad) {
    sliderVelocidad.value = Math.round((2200 - window.Ascensor.getVelocidad()) / 200);
    sliderVelocidad.addEventListener("input", function () {
      var valor = parseInt(sliderVelocidad.value, 10);
      window.Ascensor.cambiarVelocidad(2200 - valor * 200);
    });
  }

  var sliderEspera = document.getElementById("espera");
  if (sliderEspera) {
    sliderEspera.value = window.Ascensor.getTiempoParada() / 1000;
    sliderEspera.addEventListener("input", function () {
      var valor = parseInt(sliderEspera.value, 10);
      window.Ascensor.cambiarTiempoParada(valor * 1000);
    });
  }
}

window.addEventListener("load", function () {
  window.Vista.init();
  iniciar();
});
