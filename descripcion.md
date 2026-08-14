# Descripcion del algoritmo

El ascensor arranca en el piso 1 y tiene una cola de solicitudes, que es un array y ya. Cuando alguien aprieta el boton de un piso se llama a llamarAscensor, que primero chequea que no sea el piso actual, que no sea el destino al que ya esta yendo, y que no este repetido en la cola. Si pasa todo eso lo mete al final de la cola y llama a mover().

mover() mira si ya esta en movimiento o si la cola esta vacia. Si hay algo, saca el primer piso de la cola (con shift) y lo deja como pisoDestino. Ahi decide la direccion: si el destino esta mas arriba queda subiendo, sino queda bajando.

El movimiento lo hago con setTimeout encadenado, no con setInterval. Cada vez que pasa un tiempo (velocidadMs) avanza un piso para arriba o para abajo y guarda el estado en localStorage. Y aca viene lo bueno: antes de avanzar al siguiente piso, chequea si el piso en el que esta justo tiene una solicitud pendiente. Si la tiene, frena ahi con atenderParada aunque no sea el destino final. Eso es tipo SCAN, o sea va atendiendo los pisos que le quedan de camino en la misma direccion antes de seguir de largo.

Cuando llega a un piso con solicitud (o al destino final) hace una pausa de tiempoParadaMs, saca ese piso de la cola, suma uno a solicitudesAtendidas y lo agrega al historial. Si era el destino final, pone la direccion en detenido, enMovimiento en false y llama a mover() de nuevo para agarrar el siguiente de la cola. Si era una parada de camino, sigue en la misma direccion y retoma el recorrido.

Todo el estado se guarda en localStorage en formato JSON: el piso actual, la cola, el historial, las solicitudes atendidas, la velocidad y el tiempo de parada. Al cargar la pagina lo restaura con cargarDeStorage, que valida que los datos tengan sentido (que el piso este entre 1 y 12, la velocidad en rango, etc) por si alguien toco el json desde la consola.
