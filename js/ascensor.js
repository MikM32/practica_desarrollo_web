"use strict";

var pisoActual = 1;
var pisoDestino = null;
var direccion = "detenido";
var estado = "detenido";
var enMovimiento = false;
var solicitudes = [];
var observadores = [];
var solicitudesAtendidas = 0;
var historial = [];
var PISO_MIN = 1;
var PISO_MAX = 12;
var TIEMPO_PARADA = 2000;

function guardarEnStorage() {
  var datos = {
    pisoActual: pisoActual,
    solicitudesAtendidas: solicitudesAtendidas,
    historial: historial
  };
  localStorage.setItem("ascensor_datos", JSON.stringify(datos));
}

function cargarDeStorage() {
  var guardado = localStorage.getItem("ascensor_datos");
  if (guardado) {
    try {
      var datos = JSON.parse(guardado);
      if (typeof datos.pisoActual === "number" &&
          datos.pisoActual >= PISO_MIN &&
          datos.pisoActual <= PISO_MAX) {
        pisoActual = datos.pisoActual;
      }
      if (typeof datos.solicitudesAtendidas === "number") {
        solicitudesAtendidas = datos.solicitudesAtendidas;
      }
      if (Array.isArray(datos.historial)) {
        historial = datos.historial;
      }
    } catch (e) {
      // ignorar error de formato
    }
  }
}

cargarDeStorage();

function suscribir(fn) {
  observadores.push(fn);
}

function notificar() {
  observadores.forEach(function (fn) {
    fn();
  });
}

function cambiarEstado(nuevoEstado) {
  estado = nuevoEstado;
  notificar();
}

function mover() {
  if (enMovimiento) return;
  if (solicitudes.length === 0) return;

  pisoDestino = solicitudes.shift();
  enMovimiento = true;
  direccion = pisoDestino > pisoActual ? "subiendo" : "bajando";
  cambiarEstado(direccion);
  iniciarMovimiento();
}

function iniciarMovimiento() {
  var intervalo = setInterval(function () {
    pisoActual += pisoDestino > pisoActual ? 1 : -1;
    notificar();

    if (pisoActual === pisoDestino) {
      clearInterval(intervalo);
      atenderParada(true);
      return;
    }

    var indice = solicitudes.indexOf(pisoActual);
    if (indice !== -1) {
      clearInterval(intervalo);
      atenderParada(false);
    }
  }, 1000);
}

function atenderParada(esDestino) {
  if (!esDestino) {
    var indice = solicitudes.indexOf(pisoActual);
    if (indice !== -1) {
      solicitudes.splice(indice, 1);
    }
  }

  solicitudesAtendidas++;
  historial.push(esDestino ? "Llegada al piso " + pisoActual : "Parada de camino en el piso " + pisoActual);
  guardarEnStorage();
  cambiarEstado("atendiendo");

  setTimeout(function () {
    if (esDestino) {
      pisoDestino = null;
      direccion = "detenido";
      enMovimiento = false;
      cambiarEstado("detenido");
      mover();
    } else {
      cambiarEstado(direccion);
      iniciarMovimiento();
    }
  }, TIEMPO_PARADA);
}

function llamarAscensor(piso) {
  if (piso === pisoActual) return;
  if (piso === pisoDestino) return;
  if (solicitudes.indexOf(piso) !== -1) return;
  solicitudes.push(piso);
  historial.push("Llamada realizada al piso " + piso + " desde piso actual " + pisoActual);
  guardarEnStorage();
  notificar();
  mover();
}

function limpiarHistorial() {
  historial = [];
  solicitudesAtendidas = 0;
  guardarEnStorage();
  notificar();
}

window.Ascensor = {
  llamarAscensor: llamarAscensor,
  suscribir: suscribir,
  limpiarHistorial: limpiarHistorial,
  getPisoActual: function () {
    return pisoActual;
  },
  getPisoDestino: function () {
    return pisoDestino;
  },
  getDireccion: function () {
    return direccion;
  },
  getEstado: function () {
    return estado;
  },
  getSolicitudes: function () {
    return solicitudes.slice();
  },
  getSolicitudesAtendidas: function () {
    return solicitudesAtendidas;
  },
  getHistorial: function () {
    return historial.slice();
  },
  getUltimoEvento: function () {
    return historial.length > 0 ? historial[historial.length - 1] : "Ninguno";
  }
};
