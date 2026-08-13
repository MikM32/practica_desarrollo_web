(function () {
  "use strict";

  var pisoActual = 1;
  var pisoDestino = null;
  var direccion = "detenido";
  var estado = "detenido";
  var enMovimiento = false;

  function subir(piso) {
    pisoDestino = piso;
    enMovimiento = true;
    direccion = "subiendo";
    estado = "subiendo";
    var intervalo = setInterval(function () {
      pisoActual += 1;
      console.log("Piso actual: " + pisoActual);
      if (pisoActual >= pisoDestino) {
        clearInterval(intervalo);
        estado = "atendiendo";
        console.log("Solicitud atendida en el piso " + pisoActual);
        direccion = "detenido";
        estado = "detenido";
        pisoDestino = null;
        enMovimiento = false;
      }
    }, 1000);
  }

  function bajar(piso) {
    pisoDestino = piso;
    enMovimiento = true;
    direccion = "bajando";
    estado = "bajando";
    var intervalo = setInterval(function () {
      pisoActual -= 1;
      console.log("Piso actual: " + pisoActual);
      if (pisoActual <= pisoDestino) {
        clearInterval(intervalo);
        estado = "atendiendo";
        console.log("Solicitud atendida en el piso " + pisoActual);
        direccion = "detenido";
        estado = "detenido";
        pisoDestino = null;
        enMovimiento = false;
      }
    }, 1000);
  }

  function llamarAscensor(piso) {
    if (enMovimiento) return;
    if (piso === pisoActual) return;
    if (piso > pisoActual) {
      subir(piso);
    } else {
      bajar(piso);
    }
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
    }
  };
})();
