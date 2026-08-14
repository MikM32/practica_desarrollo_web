"use strict";

var TOTAL_PISOS = 12;
var ALTO_PISO = 50; // Debe coincidir con var(--alto-piso) en CSS

function render() {
  var A = window.Ascensor;

  // 1. Actualizar Dashboard
  var uiEstado = document.getElementById("ui-estado");
  var uiPiso = document.getElementById("ui-piso");
  var uiDireccion = document.getElementById("ui-direccion");
  var uiSolicitudes = document.getElementById("ui-solicitudes");
  var uiAtendidas = document.getElementById("ui-atendidas");
  var uiUltimoEvento = document.getElementById("ui-ultimo-evento");

  var estadoText = A.getEstado();
  var estadoClass = estadoText === "detenido" ? "estado-detenido" : (estadoText === "atendiendo" ? "estado-atendiendo" : "estado-movimiento");
  if (uiEstado) {
    uiEstado.innerHTML = '<span class="badge ' + estadoClass + '">' + estadoText + '</span>';
  }

  if (uiPiso) uiPiso.textContent = A.getPisoActual();
  if (uiDireccion) uiDireccion.textContent = A.getDireccion();
  if (uiAtendidas) uiAtendidas.textContent = A.getSolicitudesAtendidas();
  if (uiUltimoEvento) uiUltimoEvento.textContent = A.getUltimoEvento();

  var solicitudes = A.getSolicitudes();
  if (uiSolicitudes) {
    if (solicitudes.length > 0) {
      var badgesHtml = "";
      for (var j = 0; j < solicitudes.length; j++) {
        badgesHtml += '<span class="badge">' + solicitudes[j] + '</span>';
      }
      uiSolicitudes.innerHTML = badgesHtml;
    } else {
      uiSolicitudes.innerHTML = '<span class="badge vacio">Ninguna</span>';
    }
  }

  // Actualizar valores de los sliders
  var velocidadVal = document.getElementById("velocidad-val");
  if (velocidadVal) {
    var valVel = Math.round((2200 - A.getVelocidad()) / 200);
    velocidadVal.textContent = valVel + " (" + (A.getVelocidad() / 1000).toFixed(1) + "s/piso)";
  }

  var esperaVal = document.getElementById("espera-val");
  if (esperaVal) {
    esperaVal.textContent = (A.getTiempoParada() / 1000) + "s";
  }

  // 2. Animar Cabina del Ascensor
  var cabina = document.getElementById("ascensor-cabina");
  var cabinaDisplay = document.getElementById("cabina-display");
  if (cabina) {
    var duracionS = A.getVelocidad() / 1000;
    cabina.style.transitionDuration = duracionS + "s";
    var desplazamiento = -(A.getPisoActual() - 1) * ALTO_PISO;
    cabina.style.transform = "translateY(" + desplazamiento + "px)";
  }
  if (cabinaDisplay) {
    cabinaDisplay.textContent = A.getPisoActual();
  }

  // 3. Actualizar estado visual de los botones (activo si esta en cola)
  var i;
  for (i = 1; i <= TOTAL_PISOS; i++) {
    var li = document.getElementById("piso-" + i);
    if (li) {
      var btn = li.querySelector(".btn-llamar");
      if (btn) {
        if (solicitudes.indexOf(i) !== -1 || A.getPisoDestino() === i) {
          btn.classList.add("activo");
        } else {
          btn.classList.remove("activo");
        }
      }
    }
  }

  // 4. Actualizar tabla de historial
  var tablaHistorial = document.getElementById("historial");
  if (tablaHistorial) {
    tablaHistorial.innerHTML = "";
    var items = A.getHistorial();
    for (i = items.length - 1; i >= 0; i--) { // Evento mas reciente primero
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
