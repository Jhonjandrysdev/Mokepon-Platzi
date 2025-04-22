window.addEventListener('load', () => {
    let ataqueJugador = []
    let logicAtaqueRival
    let MascotaSeleccionada
    let MascotaSeleccionadaRival
    let ataqueRival = []
    let VictoriasJugador = 0;
    let VictoriasRival = 0;
    let fondoMapa = new Image()
    fondoMapa.src = 'https://i.pinimg.com/474x/43/e7/89/43e78957ab636946acf0498862b67c11.jpg'
    let alturaMapa
    let anchoMapa = window.innerWidth - 80
    alturaMapa = anchoMapa * 500 / 1000
    let anchoMaximoMapa = 350

    const mensaje = document.createElement('p')
    const containerMensaje = document.getElementById('mensaje-combate')
    const containerAtaque = document.getElementById('box-ataque')
    const containerAtaqueRival = document.getElementById('box-ataque-rival')

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
    const sectionCanvas = document.getElementById('canvas')

    //MAPA DE CANVAS
    const canvas = document.getElementById('mapa')

    //MANEJO DE VIDAS DE MASCOTAS
    const vidaJugador = document.getElementById('vidas-mascota')
    const vidaEnemigo = document.getElementById('vidas-mascota-rival')

    // MANEJO DE BOTONES MEDIANTE EL DOM
    const selectMascosta = document.getElementById('boton-select-mascota')
    const btnReset = document.getElementById('boton-reset')
    const btnMovimiento = document.getElementById('mover-personaje-adelante')
    const btnMovimientoAbajo = document.getElementById('mover-personaje-abajo')
    const btnMovimientoArriba = document.getElementById('mover-personaje-arriba')
    const btnMovimientoAtras = document.getElementById('mover-personaje-atras')

    //BOTON OCULTO MIENTRAS NO SE SELECCIONE MASCOTAS
    btnReset.style.display = 'none';
    sectionAtaque.style.display = 'none';
    containerMensaje.style.display = 'none'
    sectionCanvas.style.display = 'none'

    // CLASE CREADA PARA CREAR MOKEPONES
    class Mokepon {
        constructor(nombre, imagen, vidas) {
            this.nombre = nombre,
                this.imagen = imagen,
                this.vidas = vidas
            this.ataques = []
            this.x = 10
            this.y = 30
            this.rivalX = numAleatorio(0, canvas.width)
            this.rivalY = 30
            this.ancho = 50
            this.alto = 50
            this.mapaFoto = new Image()
            this.mapaFoto.src = imagen
            this.fotorival = new Image()
            this.fotorival.src = imagen
            this.velocidadX = 0
            this.velocidadY = 0
            this.velocidadRivalX = 0
            this.velocidadRivalY = 0
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
        { nombre: '💧', id: 'boton-agua' },
    )
    Zafiro.ataques.push({ nombre: '🌱', id: 'boton-tierra' },
        { nombre: '🔥', id: 'boton-fuego' },
    )
    Luchiro.ataques.push({ nombre: '💧', id: 'boton-agua' },
        { nombre: '🌱', id: 'boton-tierra' },
    )
    Makaka.ataques.push({ nombre: '🔥', id: 'boton-fuego' },
        { nombre: '💧', id: 'boton-agua' },
    )
    Yuliz.ataques.push({ nombre: '🌱', id: 'boton-tierra' },
        { nombre: '🔥', id: 'boton-fuego' },
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
    function pintarMapa() {
        canvas.width = anchoMapa
        canvas.height = alturaMapa
        if (anchoMapa > anchoMaximoMapa) {
            anchoMapa = anchoMaximoMapa - 20
        }
        let lienzoMapa = canvas.getContext('2d')
        lienzoMapa.imageSmoothingEnabled = true;
        lienzoMapa.imageSmoothingQuality = 'high';

        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.x = mokepon.x + mokepon.velocidadX
                mokepon.y = mokepon.y + mokepon.velocidadY
                lienzoMapa.clearRect(0, 0, canvas.width, canvas.height)
                lienzoMapa.drawImage(fondoMapa, 0, 0, canvas.width, canvas.height)
                lienzoMapa.drawImage(mokepon.mapaFoto, mokepon.x, mokepon.y, mokepon.ancho, mokepon.alto)
                pintarRival()
                if (mokepon.x > 0 || mokepon.y > 0) {
                    revisarColision()
                }
            }
        })
    }
    function pintarRival() {
        let lienzoMapa = canvas.getContext('2d')
        lienzoMapa.imageSmoothingEnabled = true;
        lienzoMapa.imageSmoothingQuality = 'high';
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.rivalX = mokepon.rivalX + mokepon.velocidadRivalX
                mokepon.rivalY = mokepon.rivalY + mokepon.velocidadRivalY
                lienzoMapa.drawImage(mokepon.fotorival, mokepon.rivalX, mokepon.rivalY, mokepon.ancho, mokepon.alto)
                if (mokepon.rivalX + mokepon.ancho >= canvas.width || mokepon.rivalX <= 0) {
                    mokepon.velocidadRivalX = 0;
                }
            }

        })
    }
    function revisarColision() {

        let mascotaJugador = arrayMokepon.find(mokepon => mokepon.nombre === MascotaSeleccionada);
        let mascotaRival = arrayMokepon.find(mokepon => mokepon.nombre === MascotaSeleccionadaRival);

        if (!mascotaJugador || !mascotaRival) return;

        let leftMascota = mascotaJugador.x;
        let rightMascota = mascotaJugador.x + mascotaJugador.ancho;
        let topMascota = mascotaJugador.y;
        let bottomMascota = mascotaJugador.y + mascotaJugador.alto;

        let leftRival = mascotaRival.rivalX;
        let rightRival = mascotaRival.rivalX + mascotaRival.ancho;
        let topRival = mascotaRival.rivalY;
        let bottomRival = mascotaRival.rivalY + mascotaRival.alto;

        if (rightMascota < leftRival || leftMascota > rightRival ||
            bottomMascota < topRival || topMascota > bottomRival) {
            // No hay colisión
            return;
        }

        alert(`${MascotaSeleccionada} has chocado con ${MascotaSeleccionadaRival} 😱 ! Que inicie el combate`);
        detenerMovimiento()
        clearInterval(intervalo)
        sectionCanvas.style.display = 'none'
        sectionAtaque.style.display = 'flex'
        containerMensaje.style.display = 'flex'

    }
    function numAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function selectMascotaRival() {

        let eleccionRival = numAleatorio(0, arrayMokepon.length - 1)

        if (MascotaSeleccionada === undefined) {
            alert('Primero selecciona la mascota del jugador')
        }
        else {
            logicAtaqueRival = arrayMokepon[eleccionRival].ataques
            nombreVidaMascostaRival.innerHTML = arrayMokepon[eleccionRival].nombre
            mensajeEleccionRival.innerHTML = arrayMokepon[eleccionRival].nombre
            MascotaSeleccionadaRival = arrayMokepon[eleccionRival].nombre
            sectionCanvas.style.display = 'flex';
            intervalo = setInterval(pintarMapa, 30)
            window.addEventListener('keydown', teclaPresionada)
            window.addEventListener('keyup', detenerMovimiento)
            sectionAtaque.style.display = 'none';
            sectionElection.style.display = 'none';
            sectionBotones.style.display = 'none';
            containerMensaje.style.display = 'none';
        }


    }
    function detenerMovimiento() {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.velocidadX = 0
                mokepon.velocidadY = 0
            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalX = 0
                mokepon.velocidadRivalY = 0

            }
        })
    }
    function teclaPresionada(event) {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                switch (event.key) {
                    case 'ArrowUp':
                        if (mokepon.y > 0) {
                            mokepon.velocidadY = - 5;
                            btnMovimientoArriba.disabled = false;
                            btnMovimientoArriba.style.backgroundColor = '#1955de';
                        } else {
                            mokepon.velocidadY = 0;
                            btnMovimientoArriba.disabled = true;
                            btnMovimientoArriba.style.backgroundColor = '#cccccc';
                        }
                        break;
                    case 'ArrowDown':
                        if (mokepon.y == 100) {
                            mokepon.velocidadY = 0;
                            btnMovimientoAbajo.disabled = true;
                            btnMovimientoAbajo.style.backgroundColor = '#cccccc';
                        } else {
                            mokepon.velocidadY = 5
                            btnMovimientoAbajo.disabled = false;
                            btnMovimientoAbajo.style.backgroundColor = '#1955de';
                        }
                        break;
                    case 'ArrowLeft':
                        if (mokepon.x > 0) {
                            mokepon.velocidadX = - 5
                            btnMovimientoAtras.disabled = false
                            btnMovimientoAtras.style.backgroundColor = '#1955de'
                        }
                        else {
                            mokepon.velocidadX = 0
                            btnMovimientoAtras.disabled = true
                            btnMovimientoAtras.style.backgroundColor = '#cccccc'
                        }
                        break;
                    case 'ArrowRight':
                        if (mokepon.x == 100) {
                            mokepon.velocidadX = 0;
                            btnMovimiento.disabled = true;
                            btnMovimiento.style.backgroundColor = '#cccccc';
                        } else {
                            mokepon.velocidadX = 5
                            btnMovimiento.disabled = false;
                            btnMovimiento.style.backgroundColor = '#1955de';
                        }
                        break;

                    default:
                        break;

                }
            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                switch (event.key) {
                    case 'ArrowUp':
                        mokepon.velocidadRivalY = - 5
                        break;
                    case 'ArrowDown':
                        mokepon.velocidadRivalY = 5
                        break;
                    case 'ArrowLeft':
                        mokepon.velocidadRivalX = 5
                        break;
                    case 'ArrowRight':
                        mokepon.velocidadRivalX = - 5
                        break;
                    default:
                        break;
                }
            }

        })
    }
    function selectAtaqueRival() {
        let eleccionRivalAtaque = numAleatorio(0, logicAtaqueRival.length - 1)
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.ataques.forEach((ataque, index) => {
                    if (index === eleccionRivalAtaque) {
                        ataqueRival.push(ataque.nombre)
                        console.log(ataqueRival)
                    }
                })
            }
        })
        pelea()
    }
    function pelea() {
        if (ataqueJugador.length === 5) {
            combate()
            sectionAtaque.style.display = 'none'
        }
    }
    function indexEleccion(jugador, rival) {

        const mensajeAtkJugador = document.createElement('p');
        const mensajeAtkRival = document.createElement('p');

        mensajeAtkJugador.textContent = ataqueJugador[jugador]
        mensajeAtkRival.textContent = ataqueRival[rival];

        containerAtaque.appendChild(mensajeAtkJugador);
        containerAtaqueRival.appendChild(mensajeAtkRival);



    }
    function combate() {

        for (let index = 0; index < ataqueJugador.length; index++) {
            if (ataqueJugador[index] === ataqueRival[index]) {
                indexEleccion(index, index)
            } else if (ataqueJugador[index] == '🔥' && ataqueRival[index] == '🌱') {
                indexEleccion(index, index)
                VictoriasJugador++
                vidaJugador.textContent = VictoriasJugador
            } else if (ataqueJugador[index] == '💧' && ataqueRival[index] == '🔥') {
                indexEleccion(index, index)
                VictoriasJugador++
                vidaJugador.textContent = VictoriasJugador
            } else if (ataqueJugador[index] == '🌱' && ataqueRival[index] == '💧') {
                indexEleccion(index, index)
                VictoriasJugador++
                vidaJugador.textContent = VictoriasJugador
            } else {
                indexEleccion(index, index)
                VictoriasRival++
                vidaEnemigo.textContent = VictoriasRival
            }
        }

        if (VictoriasJugador === VictoriasRival) {
            btnReset.style.display = 'flex';
            sectionBotonesAtaque.style.display = 'none'
            mensaje.innerHTML = `Ha habido un empate ${MascotaSeleccionada} 😊; Quieres volver aintentarlo?`

        } else if (VictoriasJugador > VictoriasRival) {
            sectionBotonesAtaque.style.display = 'none'
            vidaEnemigo.style.color = 'red'
            btnReset.style.display = 'flex';
            mensaje.innerHTML = `Felicidades ${MascotaSeleccionada} 🎉; has ganado la partida`

        } else {
            sectionBotonesAtaque.style.display = 'none'
            vidaJugador.style.color = 'red'
            btnReset.style.display = 'flex';
            mensaje.innerHTML = `Has perdido la partida ${MascotaSeleccionada} 😔; Quieres volver a intentarlo?`
        }

        mensajeResultado()
    }
    function mensajeResultado() {
        containerMensaje.appendChild(mensaje)
        mensaje.style.fontSize = '25px'
        mensaje.style.width = '90%'
        mensaje.style.textAlign = 'center'
    }


    //EVENTOS
    selectMascosta.addEventListener('click', () => {
        let inputChecked = document.querySelector('input[name="mascota"]:checked')

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
                        sectionBotonesAtaque.appendChild(button)
                        if (button.id === 'boton-fuego') {
                            button.addEventListener('click', () => {
                                ataqueJugador.push('🔥')
                                selectAtaqueRival()
                                console.log(ataqueJugador)
                            })
                        } else if (button.id === 'boton-agua') {
                            button.addEventListener('click', () => {
                                ataqueJugador.push('💧')
                                selectAtaqueRival()
                                console.log(ataqueJugador)
                            })
                        } else {
                            button.addEventListener('click', () => {
                                ataqueJugador.push('🌱')
                                selectAtaqueRival()
                                console.log(ataqueJugador)
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
    btnMovimiento.addEventListener('mousedown', () => {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                if (mokepon.x == canvas.width - 60) {
                    mokepon.velocidadX = 0
                    mokepon.velocidadRivalX = 0
                    btnMovimiento.disabled = true
                    btnMovimiento.style.backgroundColor = '#cccccc'
                } else if(mokepon.x < canvas.width - 0) {
                    mokepon.velocidadX = 2
                    mokepon.velocidadRivalX = 2
                    btnMovimiento.disabled = false
                    btnMovimiento.style.backgroundColor = '#1955de'

                }
            }
            if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalX = - 2
            }

        })
    })
    btnMovimiento.addEventListener('mouseup', () => {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.velocidadX = 0
                mokepon.velocidadY = 0
            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalX = 0
                mokepon.velocidadRivalY = 0

            }
        })
    })
    btnMovimientoAtras.addEventListener('mousedown', () => {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.velocidadX = - 2
                if (mokepon.x == 0) {
                    mokepon.velocidadX = 0
                    btnMovimientoAtras.disabled = true
                    btnMovimientoAtras.style.backgroundColor = '#cccccc'
                }
                else if (mokepon.x > 0) {
                    btnMovimientoAtras.disabled = false
                    btnMovimientoAtras.style.backgroundColor = '#1955de'
                }
            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalX = 2
            }
        })
    })
    btnMovimientoAtras.addEventListener('mouseup', () => {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.velocidadX = 0
                mokepon.velocidadY = 0
            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalX = 0
                mokepon.velocidadRivalY = 0

            }
        })
    })
    btnMovimientoAbajo.addEventListener('mousedown', () => {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.velocidadY = 2

                if (mokepon.y == canvas.height - 60) {
                    mokepon.velocidadY = 0
                    mokepon.velocidadRivalY = 0
                    btnMovimientoAbajo.disabled = true
                    btnMovimientoAbajo.style.backgroundColor = '#cccccc'
                }
                if (mokepon.y > 0) {
                    btnMovimientoArriba.disabled = false
                    btnMovimientoArriba.style.backgroundColor = '#1955de'
                }

            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalY = 2
            }
        })
    })
    btnMovimientoAbajo.addEventListener('mouseup', () => {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.velocidadX = 0
                mokepon.velocidadY = 0
            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalX = 0
                mokepon.velocidadRivalY = 0

            }
        })
    })
    btnMovimientoArriba.addEventListener('mousedown', () => {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.velocidadY = - 2

                if (mokepon.y <= 0) {
                    mokepon.velocidadY = 0;
                    btnMovimientoArriba.disabled = true
                    btnMovimientoArriba.style.backgroundColor = '#cccccc'
                }
                else if (mokepon.y < 100) {
                    btnMovimientoAbajo.disabled = false
                    btnMovimientoAbajo.style.backgroundColor = '#1955de'
                }
            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalY = - 2
            }

        })
    })
    btnMovimientoArriba.addEventListener('mouseup', () => {
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionada === mokepon.nombre) {
                mokepon.velocidadX = 0
                mokepon.velocidadY = 0
            }
            else if (MascotaSeleccionadaRival === mokepon.nombre) {
                mokepon.velocidadRivalX = 0
                mokepon.velocidadRivalY = 0

            }
        })
    })
})
