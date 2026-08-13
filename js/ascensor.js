"use strict";

var pisoActual = 1;
var pisoDestino = null;
var direccion = "detenido";
var estado = "detenido";
var enMovimiento = false;
var solicitudes = [];

function mover() {
  if (enMovimiento) return;
  if (solicitudes.length === 0) return;

  pisoDestino = solicitudes.shift();
  enMovimiento = true;
  direccion = pisoDestino > pisoActual ? "subiendo" : "bajando";
  estado = direccion;

  var intervalo = setInterval(function () {
    pisoActual += pisoDestino > pisoActual ? 1 : -1;
    console.log("Piso actual: " + pisoActual);

    if (pisoActual === pisoDestino) {
      clearInterval(intervalo);
      console.log("Solicitud atendida en el piso " + pisoActual);
      pisoDestino = null;
      direccion = "detenido";
      estado = "detenido";
      enMovimiento = false;
      mover();
    }
  }, 1000);
}

function llamarAscensor(piso) {
  if (piso === pisoActual) return;
  if (piso === pisoDestino) return;
  if (solicitudes.indexOf(piso) !== -1) return;
  solicitudes.push(piso);
  mover();
}

window.Ascensor = {
  llamarAscensor: llamarAscensor,
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
