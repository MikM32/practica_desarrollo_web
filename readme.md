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

## Uso declarado de IA

Herramienta: DeepSeek Pro.

La use para preguntar cosas puntuales y para que me revise pedazos de codigo, no para que me haga todo el proyecto. Le tiraba preguntas sueltas y despues lo adaptaba yo con el grupo.

Prompts que use:

- "fijate que patron de diseno me conviene para un ascensor, mvc o state? o es mucha cosa para algo tan chico"
- "como hago para que el ascensor atienda los pisos que le quedan de camino mientras sube, tipo que no cambie de direccion de una"
- "me pasa que si llamo al piso destino mientras va en ruta el ascensor se queda bajando para siempre, que puede ser eso?"
- "como guardo el estado en localStorage y como lo valido al cargar, para que no se rompa si tocan el json desde la consola"
- "como evito que se dupliquen las solicitudes y que no reviente si aprieto rapido un monton de botones"

Sugerencias que acepte:

- El MVC liviano con observer: el modelo notifica los cambios y la vista se suscribe. Descarte el patron State completo porque era demasiado para 3 estados.
- El setTimeout encadenado en vez de setInterval, para poder frenar en los pisos de camino.
- Validar los datos al cargar localStorage (que el piso este en rango, la velocidad en rango, etc).
- El check de solicitudes repetidas y de no llamar al piso actual ni al destino.

Lo que modificamos nosotros:

- Los rangos de velocidad y tiempo de parada, y como se mapean con los sliders.
- El CSS y la animacion de la cabina.
- Le pusimos 12 pisos y cambiamos textos y nombres de funciones.
- El orden de carga de los scripts en el html.

Que aprendi:

- A separar de verdad la logica de la vista, no solo en la cabeza.
- Como funciona el patron observer y por que sirve aca.
- Que js es de un solo hilo, no hay paralelismo real, pero igual hay que cuidar el orden de las operaciones para que no se pisen dos recorridos.
- Que nunca hay que confiar en los datos del cliente, ni de localStorage ni de la consola.
