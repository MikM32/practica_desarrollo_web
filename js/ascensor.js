"use strict";

var pisoActual = 1;
var pisoDestino = null;
var direccion = "detenido";
var estado = "detenido";
var enMovimiento = false;
var solicitudes = [];
var observadores = [];

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

  var intervalo = setInterval(function () {
    pisoActual += pisoDestino > pisoActual ? 1 : -1;
    notificar();

    if (pisoActual === pisoDestino) {
      clearInterval(intervalo);
      pisoDestino = null;
      direccion = "detenido";
      enMovimiento = false;
      cambiarEstado("detenido");
      mover();
    }
  }, 1000);
}

function llamarAscensor(piso) {
  if (piso === pisoActual) return;
  if (piso === pisoDestino) return;
  if (solicitudes.indexOf(piso) !== -1) return;
  solicitudes.push(piso);
  notificar();
  mover();
}

window.Ascensor = {
  llamarAscensor: llamarAscensor,
  suscribir: suscribir,
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
  }
};
