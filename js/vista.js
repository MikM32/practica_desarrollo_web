"use strict";

var TOTAL_PISOS = 5;
var ALTO_PISO = 80; // Debe coincidir con var(--alto-piso) en CSS

function render() {
  var A = window.Ascensor;

  // 1. Actualizar Dashboard
  var uiEstado = document.getElementById("ui-estado");
  var uiPiso = document.getElementById("ui-piso");
  var uiDireccion = document.getElementById("ui-direccion");
  var uiSolicitudes = document.getElementById("ui-solicitudes");

  var estadoText = A.getEstado();
  var estadoClass = estadoText === "detenido" ? "estado-detenido" : "estado-movimiento";
  uiEstado.innerHTML = '<span class="badge ' + estadoClass + '">' + estadoText + '</span>';
  
  uiPiso.textContent = A.getPisoActual();
  uiDireccion.textContent = A.getDireccion();

  var solicitudes = A.getSolicitudes();
  if (solicitudes.length > 0) {
    var badgesHtml = "";
    for (var j = 0; j < solicitudes.length; j++) {
      badgesHtml += '<span class="badge">' + solicitudes[j] + '</span>';
    }
    uiSolicitudes.innerHTML = badgesHtml;
  } else {
    uiSolicitudes.innerHTML = '<span class="badge vacio">Ninguna</span>';
  }

  // 2. Animar Cabina del Ascensor
  var cabina = document.getElementById("ascensor-cabina");
  if (cabina) {
    // Calculamos el desplazamiento (0 para piso 1, -80px para piso 2, etc.)
    var desplazamiento = -(A.getPisoActual() - 1) * ALTO_PISO;
    cabina.style.transform = "translateY(" + desplazamiento + "px)";
  }

  // 3. Actualizar estado visual de los botones (activo si esta en cola)
  var i;
  for (i = 1; i <= TOTAL_PISOS; i++) {
    var li = document.getElementById("piso-" + i);
    var btn = li.querySelector(".btn-llamar");
    if (solicitudes.indexOf(i) !== -1 || A.getPisoDestino() === i) {
      btn.classList.add("activo");
    } else {
      btn.classList.remove("activo");
    }
  }
}

window.Vista = {
  init: function () {
    window.Ascensor.suscribir(render);
    render();
  }
};
