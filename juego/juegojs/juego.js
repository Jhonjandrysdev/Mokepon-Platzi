window.addEventListener('load', () => {
    let ataqueJugador
    let MascotaSeleccionada
    let MascotaSeleccionadaRival
    let ataqueRival

    let hegidio = document.getElementById('hegidio')
    let zafiro = document.getElementById('zafiro')
    let luchiro = document.getElementById('luchiro')
    let makaka = document.getElementById('makaka')
    let yuliz = document.getElementById('yuliz')

    let mensajeEleccion = document.getElementById('mensaje-mascota')
    let mensajeEleccionRival = document.getElementById('mensaje-mascota-rival')
    let nombreVidaMascosta = document.getElementById('nombre-vida-mascosta')
    let nombreVidaMascostaRival = document.getElementById('nombre-vida-mascosta-rival')

    // MANEJO DE BOTONES MEDIANTE EL DOM
    let selectMascosta = document.getElementById('boton-select-mascota')
    let selectMascotaRival = document.getElementById('boton-select-mascota-rival')

    let btnFuego = document.getElementById('boton-fuego')
    let btnAgua = document.getElementById('boton-agua')
    let btnTierra = document.getElementById('boton-tierra')
    // BOTONES 

    selectMascosta.addEventListener('click', () => {
        if (hegidio.checked) {
            mensajeEleccion.textContent = 'Mascota elegida: Hegidio'
            nombreVidaMascosta.textContent = 'Hegidio'
            MascotaSeleccionada = 'Hegidio'
        }
        else if (zafiro.checked) {
            mensajeEleccion.textContent = 'Mascota elegida: Zafiro'
            nombreVidaMascosta.textContent = 'Zafiro'
            MascotaSeleccionada = 'Zafiro'
        }
        else if (luchiro.checked) {
            mensajeEleccion.textContent = 'Mascota elegida: Luchiro'
            nombreVidaMascosta.textContent = 'Luchiro'
            MascotaSeleccionada = 'Luchiro'
        }
        else if (makaka.checked) {
            mensajeEleccion.textContent = 'Mascota elegida: Makaka'
            nombreVidaMascosta.textContent = 'Makaka'
            MascotaSeleccionada = 'Makaka'
        }
        else if (yuliz.checked) {
            mensajeEleccion.textContent = 'Mascota elegida: Yuliz'
            nombreVidaMascosta.textContent = 'Yuliz'
            MascotaSeleccionada = 'Yuliz'
        } else {
            alert('Selecciona una mascota')
        }
    })

    function numAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function selectAtaqueRival() {
        let eleccionRivalAtaque = numAleatorio(1, 3)

        //CONDICIONALES POR OPERADOR TERNARIO. 
        // MascotaSeleccionadaRival == undefined ? alert('No se ha seleccionado la mascota rival') : eleccionRivalAtaque == 1 ? (ataqueRival = 'Fuego🔥', alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)) : eleccionRivalAtaque == 2 ? (ataqueRival = 'Agua💧', alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)) : eleccionRivalAtaque == 3 ? (ataqueRival = 'Tierra🌱', alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)) : alert('No hay mascota rival')


        if (MascotaSeleccionadaRival == undefined) {
            alert('No se ha seleccionado la mascota rival')
        }
        else if (eleccionRivalAtaque == 1) {
            ataqueRival = 'Fuego🔥'
            alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)
        }
        else if (eleccionRivalAtaque == 2) {
            ataqueRival = 'Agua💧'
            alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)
        }
        else if (eleccionRivalAtaque == 3) {
            ataqueRival = 'Tierra🌱'
            alert(`${MascotaSeleccionadaRival} ha seleccionado para su ataque ${ataqueRival}`)
        }
    }

    btnFuego.addEventListener('click', () => {
        if (MascotaSeleccionada == undefined) {
            alert('Selecciona primero la mascota')
        } else {
            ataqueJugador = 'Fuego🔥'
            alert(`${MascotaSeleccionada} ha eligido ${ataqueJugador}`)
            selectAtaqueRival()
        }

    })
    btnAgua.addEventListener('click', () => {
        if (MascotaSeleccionada == undefined) {
            alert('Selecciona primero la mascota')
        } else {
            ataqueJugador = 'Agua💧'
            alert(`${MascotaSeleccionada} ha eligido ${ataqueJugador}`)
            selectAtaqueRival()
        }
    })
    btnTierra.addEventListener('click', () => {
        if (MascotaSeleccionada == undefined) {
            alert('Selecciona primero la mascota')
        } else {
            ataqueJugador = 'Tierra🌱'
            alert(`${MascotaSeleccionada} ha eligido ${ataqueJugador}`)
            selectAtaqueRival()
        }

    })

    selectMascotaRival.addEventListener('click', () => {
        function selectMascotaRival() {
            let eleccionRival = numAleatorio(1, 5)

            if (eleccionRival == 1) {
                alert('Mascota rival: Hegidio')
                nombreVidaMascostaRival.textContent = 'Hegidio'
                mensajeEleccionRival.textContent = 'Hegidio'
                MascotaSeleccionadaRival = 'Hegidio'
            }
            else if (eleccionRival == 2) {
                alert('Mascota rival: Zafiro')
                nombreVidaMascostaRival.textContent = 'Zafiro'
                mensajeEleccionRival.textContent = 'Zafiro'
                MascotaSeleccionadaRival = 'Zafiro'

            }
            else if (eleccionRival == 3) {
                alert('Mascota rival: Luchiro')
                nombreVidaMascostaRival.textContent = 'Luchiro'
                mensajeEleccionRival.textContent = 'Luchiro'
                MascotaSeleccionadaRival = 'Luchiro'

            }
            else if (eleccionRival == 4) {
                alert('Mascota rival: Makaka')
                nombreVidaMascostaRival.textContent = 'Makaka'
                mensajeEleccionRival.textContent = 'Makaka'
                MascotaSeleccionadaRival = 'Makaka'

            }
            else if (eleccionRival == 5) {
                alert('Mascota rival: Yuliz')
                nombreVidaMascostaRival.textContent = 'Yuliz'
                mensajeEleccionRival.textContent = 'Yuliz'
                MascotaSeleccionadaRival = 'Yuliz'
            }
        }
        selectMascotaRival()
    })


})



