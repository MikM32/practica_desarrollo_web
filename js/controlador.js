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
}

window.addEventListener("load", function () {
  window.Vista.init();
  iniciar();
});
