function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let jugador = 0;
let PC = 0;
let triunfos = 0;
let perdidas = 0;

function combate(jugador, PC) {
    jugador == PC ? alert("EMPATE") : (jugador == 1 && PC == 3) || (jugador == 2 && PC == 1) || (jugador == 3 && PC == 2) ? (alert("GANASTE"), triunfos = triunfos + 1) : (alert("PERDISTE"), perdidas = perdidas + 1);
}
while (triunfos != 3 && perdidas != 3) {
    //eleccion de jugador y de pc
    jugador = prompt("Elige 1 si es piedra, 2 si es papel, 3 para tijera");
    PC = numAleatorio(1, 3);

    jugador == 1 ? alert("Elegiste 🪨") : jugador == 2 ? alert("Elegiste 📄") : jugador == 3 ? alert("Elegiste ✂️") : alert("Selecciona un valor correcto");

    PC == 1 ? alert("PC elige 🪨") : PC == 2 ? alert("PC elige 📄") : PC == 3 ? alert("PC elige ✂️") : alert("Selecciona un valor correcto");

    //COMBATE
    combate(jugador, PC);
}
alert(
    "Jugador gano: " + triunfos + " veces. " + "| " + "PC gano: " + perdidas + " veces."
);