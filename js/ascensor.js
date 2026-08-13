(function () {
  "use strict";

  var pisoActual = 1;
  var direccion = "detenido";
  var enMovimiento = false;

  function subir(pisoDestino) {
    enMovimiento = true;
    direccion = "subiendo";
    var intervalo = setInterval(function () {
      pisoActual += 1;
      console.log("Piso actual: " + pisoActual);
      if (pisoActual >= pisoDestino) {
        clearInterval(intervalo);
        direccion = "detenido";
        enMovimiento = false;
      }
    }, 1000);
  }

  function bajar(pisoDestino) {
    enMovimiento = true;
    direccion = "bajando";
    var intervalo = setInterval(function () {
      pisoActual -= 1;
      console.log("Piso actual: " + pisoActual);
      if (pisoActual <= pisoDestino) {
        clearInterval(intervalo);
        direccion = "detenido";
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
    getDireccion: function () {
      return direccion;
    }
  };
})();
