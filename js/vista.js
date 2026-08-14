"use strict";

var TOTAL_PISOS = 12;

function render() {
  var A = window.Ascensor;

  var info = document.getElementById("info");
  if (info) {
    info.textContent =
      "Estado: " + A.getEstado() +
      " | Piso actual: " + A.getPisoActual() +
      " | Direccion: " + A.getDireccion() +
      " | Solicitudes pendientes: " +
      (A.getSolicitudes().length > 0 ? A.getSolicitudes().join(", ") : "ninguna") +
      " | Solicitudes atendidas: " + A.getSolicitudesAtendidas() +
      " | Ultimo evento: " + A.getUltimoEvento();
  }

  var i;
  for (i = 1; i <= TOTAL_PISOS; i++) {
    var li = document.getElementById("piso-" + i);
    if (li) {
      // marca el piso donde esta el ascensor
      var marcador = li.querySelector(".marcador");
      if (marcador) {
        if (A.getPisoActual() === i) {
          marcador.textContent = "[ASCENSOR]";
        } else {
          marcador.textContent = "";
        }
      }
    }
  }

  var tablaHistorial = document.getElementById("historial");
  if (tablaHistorial) {
    tablaHistorial.innerHTML = "";
    var items = A.getHistorial();
    for (i = 0; i < items.length; i++) {
      var fila = document.createElement("tr");
      var celda = document.createElement("td");
      celda.textContent = items[i];
      fila.appendChild(celda);
      tablaHistorial.appendChild(fila);
    }
  }
}

window.Vista = {
  init: function () {
    window.Ascensor.suscribir(render);
    render();
  }
};
