"use strict";

var pisoActual = 1;
var pisoDestino = null;
var direccion = "detenido";
var estado = "detenido";
var enMovimiento = false; // impide iniciar dos recorridos a la vez
var solicitudes = [];
var observadores = [];
var solicitudesAtendidas = 0;
var historial = [];
var PISO_MIN = 1;
var PISO_MAX = 12;
var velocidadMs = 1000;
var tiempoParadaMs = 2000;

function guardarEnStorage() {
  var pendientes = solicitudes.slice();
  if (pisoDestino !== null && pendientes.indexOf(pisoDestino) === -1) {
    pendientes.unshift(pisoDestino);
  }
  var datos = {
    pisoActual: pisoActual,
    solicitudes: pendientes,
    solicitudesAtendidas: solicitudesAtendidas,
    historial: historial,
    velocidadMs: velocidadMs,
    tiempoParadaMs: tiempoParadaMs
  };
  localStorage.setItem("ascensor_datos", JSON.stringify(datos));
}

// restaura y valida lo guardado en localStorage
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
      if (Array.isArray(datos.solicitudes)) {
        solicitudes = datos.solicitudes.filter(function (p) {
          return typeof p === "number" && p >= PISO_MIN && p <= PISO_MAX && p !== pisoActual;
        });
      }
      if (typeof datos.solicitudesAtendidas === "number") {
        solicitudesAtendidas = datos.solicitudesAtendidas;
      }
      if (Array.isArray(datos.historial)) {
        historial = datos.historial;
      }
      if (typeof datos.velocidadMs === "number" &&
          datos.velocidadMs >= 200 &&
          datos.velocidadMs <= 2000) {
        velocidadMs = datos.velocidadMs;
      }
      if (typeof datos.tiempoParadaMs === "number" &&
          datos.tiempoParadaMs >= 0 &&
          datos.tiempoParadaMs <= 5000) {
        tiempoParadaMs = datos.tiempoParadaMs;
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
  guardarEnStorage();
  iniciarMovimiento();
}

// avanza un piso y programa el siguiente
function iniciarMovimiento() {
  setTimeout(function avanzar() {
    pisoActual += pisoDestino > pisoActual ? 1 : -1;
    guardarEnStorage();
    notificar();

    if (pisoActual === pisoDestino) {
      atenderParada(true);
      return;
    }

    // atiende de camino los pisos con solicitud pendiente
    var indice = solicitudes.indexOf(pisoActual);
    if (indice !== -1) {
      atenderParada(false);
      return;
    }

    setTimeout(avanzar, velocidadMs);
  }, velocidadMs);
}

// pausa en el piso: destino final o parada de camino
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
      guardarEnStorage();
      mover();
    } else {
      cambiarEstado(direccion);
      iniciarMovimiento();
    }
  }, tiempoParadaMs);
}

// evita registrar solicitudes repetidas o ya atendidas
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

function cambiarVelocidad(ms) {
  if (ms >= 200 && ms <= 2000) {
    velocidadMs = ms;
    guardarEnStorage();
  }
}

function cambiarTiempoParada(ms) {
  if (ms >= 0 && ms <= 5000) {
    tiempoParadaMs = ms;
    guardarEnStorage();
  }
}

window.Ascensor = {
  llamarAscensor: llamarAscensor,
  suscribir: suscribir,
  limpiarHistorial: limpiarHistorial,
  mover: mover,
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
  },
  cambiarVelocidad: cambiarVelocidad,
  cambiarTiempoParada: cambiarTiempoParada,
  getVelocidad: function () {
    return velocidadMs;
  },
  getTiempoParada: function () {
    return tiempoParadaMs;
  }
};
