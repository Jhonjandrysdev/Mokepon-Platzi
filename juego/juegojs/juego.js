window.addEventListener('load', () => {
    let ataqueJugador
    let MascotaSeleccionada
    let MascotaSeleccionadaRival
    let ataqueRival
    let resultadocombate
    let vidasMascotaJugador = 3;
    let vidasMascotaRival = 3;

    const mensaje = document.createElement('p')
    const containerMensaje = document.getElementById('mensaje-combate')
    const mensajeAtaqueSeleccionado = document.createElement('p')
    const mensajeAtaqueSeleccionadoRival = document.createElement('p')
    const containerMensajeAtaque = document.getElementById('box-mensaje')
    const containerMensajeAtaqueRival = document.getElementById('box-mensaje-rival')

    //MANEJO DE ELECCION DE NOMBRES DE MASCOTAS
    const mensajeEleccion = document.getElementById('mensaje-mascota')
    const mensajeEleccionRival = document.getElementById('mensaje-mascota-rival')
    const nombreVidaMascosta = document.getElementById('nombre-vida-mascosta')
    const nombreVidaMascostaRival = document.getElementById('nombre-vida-mascosta-rival')

    //MANEJO DE SECCIONES
    const sectionAtaque = document.getElementById('select-ataque')
    const sectionElection = document.getElementById('select-mascota')
    const sectionBotones = document.getElementById('section-buttons-select')
    const sectionBotonesAtaque = document.getElementById('buttons-ataque')

    //MANEJO DE VIDAS DE MASCOTAS
    const vidaJugador = document.getElementById('vidas-mascota')
    const vidaEnemigo = document.getElementById('vidas-mascota-rival')

    // MANEJO DE BOTONES MEDIANTE EL DOM
    const selectMascosta = document.getElementById('boton-select-mascota')
    const btnReset = document.getElementById('boton-reset')

    //BOTON OCULTO MIENTRAS NO SE SELECCIONE MASCOTAS
    btnReset.style.display = 'none';
    sectionAtaque.style.display = 'none';
    containerMensaje.style.display = 'none'

    // CLASE CREADA PARA CREAR MOKEPONES
    class Mokepon {
        constructor(nombre, imagen, vidas) {
            this.nombre = nombre,
                this.imagen = imagen,
                this.vidas = vidas
            this.ataques = []
        }
    }

    //CREACION DE MOKEPON MEDIANTE CLASES
    let Hegidio = new Mokepon('Hegidio', 'https://areajugones.sport.es/wp-content/uploads/2023/05/jigglypuff.png', 3)
    let Zafiro = new Mokepon('Zafiro', 'https://static.pokemonpets.com/images/monsters-images-800-800/1-Bulbasaur.webp', 3)
    let Luchiro = new Mokepon('Luchiro', 'https://areajugones.sport.es/wp-content/uploads/2023/04/rowlet.png.webp', 3)
    let Makaka = new Mokepon('Makaka', 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2014/03/288149-origen-todos-nombres-pokemon-i.png?tf=3840x', 3)
    let Yuliz = new Mokepon('Yuliz', 'https://cdn.pixabay.com/photo/2021/12/26/17/31/pokemon-6895600_1280.png', 3)

    //INYECTANDO ATAQUES A LOS MOKEPONES
    Hegidio.ataques.push({ nombre: '🔥', id: 'boton-fuego' },
        { nombre: '💧', id: 'boton-agua' }
    )
    Zafiro.ataques.push({ nombre: '🌱', id: 'boton-tierra' },
        { nombre: '🔥', id: 'boton-fuego' }
    )
    Luchiro.ataques.push({ nombre: '💧', id: 'boton-agua' },
        { nombre: '🌱', id: 'boton-tierra' }
    )
    Makaka.ataques.push({ nombre: '🔥', id: 'boton-fuego' },
        { nombre: '💧', id: 'boton-agua' }
    )
    Yuliz.ataques.push({ nombre: '🌱', id: 'boton-tierra' },
        { nombre: '🔥', id: 'boton-fuego' }
    )

    //ARRAY DE MOKEPONES
    let arrayMokepon = []
    arrayMokepon.push(Hegidio, Zafiro, Luchiro, Makaka, Yuliz)

    // ELEMENTOS PARA CREACION DE TARJETA
    arrayMokepon.forEach((mokepon) => {
        let tarjeta = document.createElement('div')
        let inputMokepon = document.createElement('input')
        let labelMokepon = document.createElement('label')

        tarjeta.className = 'tarjeta'
        inputMokepon.type = 'radio'
        inputMokepon.name = 'mascota'
        inputMokepon.id = mokepon.nombre

        labelMokepon.htmlFor = mokepon.nombre
        labelMokepon.appendChild(tarjeta)

        document.getElementById('select-mascota').appendChild(inputMokepon)
        document.getElementById('select-mascota').appendChild(labelMokepon)

        tarjeta.innerHTML = `
        <p>${mokepon.nombre}</p>
        <img src="${mokepon.imagen}" alt="${mokepon.nombre}" >
        `
    })

    // FUNCIONES
    function numAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
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
    function selectAtaqueRival() {
        let eleccionRivalAtaque = numAleatorio(1, 3)
        if (MascotaSeleccionadaRival == undefined) {
            alert('No se ha seleccionado la mascota rival')
            mensaje.innerHTML = ''
        }
        else if (eleccionRivalAtaque == 1) {
            ataqueRival = 'Fuego🔥'
        }
        else if (eleccionRivalAtaque == 2) {
            ataqueRival = 'Agua💧'
        }
        else {
            ataqueRival = 'Tierra🌱'
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
            vidasMascotaRival--
            vidaEnemigo.textContent = vidasMascotaRival
        } else if (ataqueJugador == 'Agua💧' && ataqueRival == 'Fuego🔥') {
            mensajeResultado(resultadocombate = 'GANASTE🎉')
            mensajeAtaque()
            mensajeAtaqueRival()
            vidasMascotaRival--
            vidaEnemigo.textContent = vidasMascotaRival
        } else if (ataqueJugador == 'Tierra🌱' && ataqueRival == 'Agua💧') {
            mensajeResultado(resultadocombate = 'GANASTE🎉')
            mensajeAtaque()
            mensajeAtaqueRival()
            vidasMascotaRival--
            vidaEnemigo.textContent = vidasMascotaRival
        }
        else {
            mensajeResultado(resultadocombate = 'PERDISTE😒')
            mensajeAtaque()
            mensajeAtaqueRival()
            vidasMascotaJugador--
            vidaJugador.textContent = vidasMascotaJugador
        }

        if (vidasMascotaJugador == 0) {
            sectionBotonesAtaque.style.display = 'none'
            vidaJugador.style.color = 'red'
            btnReset.style.display = 'flex';
            mensaje.innerHTML = `Has perdido la partida ${MascotaSeleccionada} 😔; Quieres volver a intentarlo?`
        } else if (vidasMascotaRival === 0) {
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
    function mensajeAtaque() {
        mensajeAtaqueSeleccionado.innerHTML = `Ha elegido atacar con ${ataqueJugador}`
        containerMensajeAtaque.appendChild(mensajeAtaqueSeleccionado)
    }
    function mensajeAtaqueRival() {
        mensajeAtaqueSeleccionadoRival.innerHTML = `Ha elegido atacar con ${ataqueRival}`
        containerMensajeAtaqueRival.appendChild(mensajeAtaqueSeleccionadoRival)
    }

    //EVENTOS
    selectMascosta.addEventListener('click', () => {
        let inputChecked = document.querySelector('input[name="mascota"]:checked')
        let containerButtonsAttack = document.getElementById('buttons-ataque')

        if (inputChecked) {
            mensajeEleccion.textContent = inputChecked.id
            nombreVidaMascosta.textContent = inputChecked.id
            MascotaSeleccionada = inputChecked.id
            selectMascotaRival()
            arrayMokepon.forEach((mokepon) => {
                if (mokepon.nombre === inputChecked.id) {
                    mokepon.ataques.forEach((ataque) => {
                        let button = document.createElement('button')
                        button.textContent = ataque.nombre
                        button.id = ataque.id
                        containerButtonsAttack.appendChild(button)
                        if (button.id === 'boton-fuego') {
                            button.addEventListener('click', () => {
                                ataqueJugador = 'Fuego🔥'
                                selectAtaqueRival()
                            })
                        } else if (button.id === 'boton-agua') {
                            button.addEventListener('click', () => {
                                ataqueJugador = 'Agua💧'
                                selectAtaqueRival()
                            })
                        } else {
                            button.addEventListener('click', () => {
                                ataqueJugador = 'Tierra🌱'
                                selectAtaqueRival()
                            })
                        }
                    })
                }
            })
        } else {
            alert('Selecciona una mascota')
        }
    })
    btnReset.addEventListener('click', (_) => {
        window.location.reload()
    })

})
