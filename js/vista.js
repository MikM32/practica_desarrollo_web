"use strict";

var TOTAL_PISOS = 12;

function render() {
  var A = window.Ascensor;

  var info = document.getElementById("info");
  info.textContent =
    "Estado: " + A.getEstado() +
    " | Piso actual: " + A.getPisoActual() +
    " | Direccion: " + A.getDireccion() +
    " | Solicitudes pendientes: " +
    (A.getSolicitudes().length > 0 ? A.getSolicitudes().join(", ") : "ninguna");

  var i;
  for (i = 1; i <= TOTAL_PISOS; i++) {
    var li = document.getElementById("piso-" + i);
    var marcador = li.querySelector(".marcador");
    if (A.getPisoActual() === i) {
      marcador.textContent = "[ASCENSOR]";
    } else {
      marcador.textContent = "";
    }
  }
}

window.Vista = {
  init: function () {
    window.Ascensor.suscribir(render);
    render();
  }
};
