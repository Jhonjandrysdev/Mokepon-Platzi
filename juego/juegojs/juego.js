window.addEventListener('load', () => {
    let ataqueJugador
    let MascotaSeleccionada
    let MascotaSeleccionadaRival
    let ataqueRival
    let resultadocombate
    let vidasMascotaJugador = 3;
    let vidasMascotaRival = 3;
    let mensaje = document.createElement('p')
    let containerMensaje = document.getElementById('mensaje-combate')
    let mensajeAtaqueSeleccionado = document.createElement('p')
    let mensajeAtaqueSeleccionadoRival = document.createElement('p')
    let containerMensajeAtaque = document.getElementById('box-mensaje')
    let containerMensajeAtaqueRival = document.getElementById('box-mensaje-rival')

    let hegidio = document.getElementById('hegidio')
    let zafiro = document.getElementById('zafiro')
    let luchiro = document.getElementById('luchiro')
    let makaka = document.getElementById('makaka')
    let yuliz = document.getElementById('yuliz')

    //MANEJO DE ELECCION DE NOMBRES DE MASCOTAS
    let mensajeEleccion = document.getElementById('mensaje-mascota')
    let mensajeEleccionRival = document.getElementById('mensaje-mascota-rival')
    let nombreVidaMascosta = document.getElementById('nombre-vida-mascosta')
    let nombreVidaMascostaRival = document.getElementById('nombre-vida-mascosta-rival')

    //MANEJO DE SECCIONES
    let sectionAtaque = document.getElementById('select-ataque')
    let sectionElection = document.getElementById('select-mascota')
    let sectionBotones = document.getElementById('section-buttons-select')
    let sectionBotonesAtaque = document.getElementById('buttons-ataque')

    //MANEJO DE VIDAS DE MASCOTAS
    let vidaJugador = document.getElementById('vidas-mascota')
    let vidaEnemigo = document.getElementById('vidas-mascota-rival')

    // MANEJO DE BOTONES MEDIANTE EL DOM
    let selectMascosta = document.getElementById('boton-select-mascota')
    let selectMascotaRival = document.getElementById('boton-select-mascota-rival')
    let btnFuego = document.getElementById('boton-fuego')
    let btnAgua = document.getElementById('boton-agua')
    let btnTierra = document.getElementById('boton-tierra')
    let btnReset = document.getElementById('boton-reset')

    //BOTON OCULTO MIENTRAS NO SE SELECCIONE MASCOTAS
    btnReset.style.display = 'none';
    sectionAtaque.style.display = 'none';
    containerMensaje.style.display = 'none'

    //EVENTOS
    selectMascosta.addEventListener('click', () => {
        if (hegidio.checked) {
            mensajeEleccion.textContent = ' Hegidio'
            nombreVidaMascosta.textContent = ' Hegidio'
            MascotaSeleccionada = 'Hegidio'
        }
        else if (zafiro.checked) {
            mensajeEleccion.textContent = ' Zafiro'
            nombreVidaMascosta.textContent = 'Zafiro'
            MascotaSeleccionada = 'Zafiro'
        }
        else if (luchiro.checked) {
            mensajeEleccion.textContent = ' Luchiro'
            nombreVidaMascosta.textContent = ' Luchiro'
            MascotaSeleccionada = 'Luchiro'
        }
        else if (makaka.checked) {
            mensajeEleccion.textContent = ' Makaka'
            nombreVidaMascosta.textContent = ' Makaka'
            MascotaSeleccionada = 'Makaka'
        }
        else if (yuliz.checked) {
            mensajeEleccion.textContent = ' Yuliz'
            nombreVidaMascosta.textContent = ' Yuliz'
            MascotaSeleccionada = 'Yuliz'
        } else {
            alert('Selecciona una mascota')
        }
    })
    btnFuego.addEventListener('click', () => {
        if (MascotaSeleccionada == undefined) {
            alert('Selecciona primero la mascota')
        } else {
            ataqueJugador = 'Fuego🔥'
            selectAtaqueRival()
        }
    })
    btnAgua.addEventListener('click', () => {
        if (MascotaSeleccionada == undefined) {
            alert('Selecciona primero la mascota')
        } else {
            ataqueJugador = 'Agua💧'
            selectAtaqueRival()
        }
    })
    btnTierra.addEventListener('click', () => {
        if (MascotaSeleccionada == undefined) {
            alert('Selecciona primero la mascota')
        } else {
            ataqueJugador = 'Tierra🌱'
            selectAtaqueRival()
        }

    })
    selectMascotaRival.addEventListener('click', () => {
        function selectMascotaRival() {
            let eleccionRival = numAleatorio(1, 5)

            if (MascotaSeleccionada === undefined) {
                alert('Primero selecciona la mascota del jugador')
            }
            else if (eleccionRival == 1) {
                nombreVidaMascostaRival.textContent = ' Hegidio'
                mensajeEleccionRival.textContent = 'Hegidio'
                MascotaSeleccionadaRival = 'Hegidio'
                sectionAtaque.style.display = 'flex';
                sectionElection.style.display = 'none';
                sectionBotones.style.display = 'none';
                containerMensaje.style.display = 'flex';

            }
            else if (eleccionRival == 2) {
                nombreVidaMascostaRival.textContent = ' Zafiro'
                mensajeEleccionRival.textContent = 'Zafiro'
                MascotaSeleccionadaRival = 'Zafiro'
                sectionAtaque.style.display = 'flex';
                sectionElection.style.display = 'none';
                sectionBotones.style.display = 'none';
                containerMensaje.style.display = 'flex'

            }
            else if (eleccionRival == 3) {
                nombreVidaMascostaRival.textContent = ' Luchiro'
                mensajeEleccionRival.textContent = 'Luchiro'
                MascotaSeleccionadaRival = 'Luchiro'
                sectionAtaque.style.display = 'flex';
                sectionElection.style.display = 'none';
                sectionBotones.style.display = 'none';
                containerMensaje.style.display = 'flex'

            }
            else if (eleccionRival == 4) {
                nombreVidaMascostaRival.textContent = ' Makaka'
                mensajeEleccionRival.textContent = 'Makaka'
                MascotaSeleccionadaRival = 'Makaka'
                sectionAtaque.style.display = 'flex';
                sectionElection.style.display = 'none';
                sectionBotones.style.display = 'none';
                containerMensaje.style.display = 'flex'

            }
            else if (eleccionRival == 5) {
                nombreVidaMascostaRival.textContent = ' Yuliz'
                mensajeEleccionRival.textContent = 'Yuliz'
                MascotaSeleccionadaRival = 'Yuliz'
                sectionAtaque.style.display = 'flex';
                sectionElection.style.display = 'none';
                sectionBotones.style.display = 'none';
                containerMensaje.style.display = 'flex'

            }
        }
        selectMascotaRival()
    })
    btnReset.addEventListener('click', (_) =>{
        window.location.reload()
    })

    // FUNCIONES
    function numAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function selectAtaqueRival() {
        let eleccionRivalAtaque = numAleatorio(1, 3)
        if (MascotaSeleccionadaRival == undefined) {
            alert('No se ha seleccionado la mascota rival')
            mensaje.innerHTML = ''
        }
        else if (eleccionRivalAtaque == 1) {
            ataqueRival = 'Fuego🔥'
            //alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)
        }
        else if (eleccionRivalAtaque == 2) {
            ataqueRival = 'Agua💧'
            //alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)
        }
        else {
            ataqueRival = 'Tierra🌱'
            //alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)
        }
        combate()
        
    }
    function combate() {
        
        if (MascotaSeleccionada == undefined || MascotaSeleccionadaRival == undefined) {
            mensaje = ''
        }
        else if (ataqueJugador === ataqueRival) {
            mensajeResultado(resultadocombate = 'EMPATE🙈')
            mensajeAtaque()
            mensajeAtaqueRival()
        } else if (ataqueJugador == 'Fuego🔥' && ataqueRival == 'Tierra🌱') {
            mensajeResultado(resultadocombate = 'GANASTE🎉')
            mensajeAtaque()
            mensajeAtaqueRival()
            vidasMascotaRival --
            vidaEnemigo.textContent = vidasMascotaRival
        } else if (ataqueJugador == 'Agua💧' && ataqueRival == 'Fuego🔥') {
            mensajeResultado(resultadocombate = 'GANASTE🎉')
            mensajeAtaque()
            mensajeAtaqueRival()
            vidasMascotaRival --
            vidaEnemigo.textContent = vidasMascotaRival
        } else if (ataqueJugador == 'Tierra🌱' && ataqueRival == 'Agua💧') {
            mensajeResultado(resultadocombate = 'GANASTE🎉')
            mensajeAtaque()
            mensajeAtaqueRival()
            vidasMascotaRival --
            vidaEnemigo.textContent = vidasMascotaRival
        }
        else {
            mensajeResultado(resultadocombate = 'PERDISTE😒')
            mensajeAtaque()
            mensajeAtaqueRival()
            vidasMascotaJugador --
            vidaJugador.textContent = vidasMascotaJugador
        }

        if(vidasMascotaJugador == 0){
            sectionBotonesAtaque.style.display = 'none'
            vidaJugador.style.color = 'red'
            btnReset.style.display = 'flex';
            mensaje.innerHTML = `Has perdido la partida ${MascotaSeleccionada} 😔; Quieres volver a intentarlo?` 
        } else if (vidasMascotaRival === 0){
            sectionBotonesAtaque.style.display = 'none'
            vidaEnemigo.style.color = 'red'
            btnReset.style.display = 'flex';
            mensaje.innerHTML = `Felicidades ${MascotaSeleccionada} 🎉; has ganado la partida`
        }
    }
    function mensajeResultado() {
        mensaje.innerHTML = `${resultadocombate}`
        containerMensaje.appendChild(mensaje)
        mensaje.style.fontSize = '25px'
        mensaje.style.width = '90%'
        mensaje.style.textAlign = 'center'
    }
    function mensajeAtaque(){
        mensajeAtaqueSeleccionado.innerHTML = `Ha elegido atacar con ${ataqueJugador}`  
        containerMensajeAtaque.appendChild(mensajeAtaqueSeleccionado)
    }
    function mensajeAtaqueRival(){
        mensajeAtaqueSeleccionadoRival.innerHTML = `Ha elegido atacar con ${ataqueRival}`
        containerMensajeAtaqueRival.appendChild(mensajeAtaqueSeleccionadoRival)
    }
})
