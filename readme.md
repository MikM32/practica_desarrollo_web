# Simulador Web de Ascensor

Proyecto ascensor. Desarrollo Web. Integrantes: Jose Contin, Miguel Matute y Luis Rodriguez

## De que va la practica

Esto es para la materia de Desarrollo de Aplicaciones Web (CAO802). El profe pidio hacer un simulador de un ascensor que corre todo en el navegador, o sea puro HTML, CSS y JavaScript. Nada de PHP ni backend, y los datos se guardan en el localStorage del navegador.

La idea principal es que el ascensor no se teletransporte, tiene que ir piso por piso y verse como se mueve. Ademas se pueden hacer llamadas desde cualquier piso y el ascensor las va atendiendo con una cola.

## Que pide el pdf (requisitos minimos)

- Minimo 5 pisos, nosotros le pusimos 12.
- Cada piso tiene su boton de "Llamar".
- El ascensor tiene estado: piso actual, piso destino, direccion (subiendo, bajando o detenido) y estado (detenido, subiendo, bajando o atendiendo).
- Movimiento progresivo, va de a un piso con un timer (usamos setTimeout).
- Manejar varias solicitudes a la vez con una cola y no aceptar repetidas.
- La interfaz se actualiza cada vez que cambia el estado.
- Separar la logica de la vista. Lo hicimos tipo MVC: modelo, vista y controlador.
- Persistencia con localStorage en JSON. Guardamos el ultimo piso, la cola, el historial, cuantas atendimos y la velocidad.

## Niveles

Hay 3 niveles, el 1 y el 2 son obligatorios y el 3 es bonus.

- Nivel 1: que el ascensor se mueva de un piso a otro y se note el cambio.
- Nivel 2: cola de solicitudes, atender de a una y localStorage.
- Nivel 3: optimizar la ruta tipo SCAN, o sea si va subiendo atiende los pisos que le quedan de camino antes de cambiar de direccion. Eso lo hacemos en atenderParada.

## Estructura

- index.html: la pagina, los pisos, los botones y el dashboard de estado.
- css/estilo.css: los estilos y la animacion de la cabina.
- js/ascensor.js: el modelo, aca vive el estado, la cola y el localStorage.
- js/vista.js: actualiza el DOM y se suscribe al modelo.
- js/controlador.js: enlaza los botones con la logica.

## Como correrlo

Se abre el index.html en el navegador y listo, no necesita servidor. Tambien funciona con live server.
