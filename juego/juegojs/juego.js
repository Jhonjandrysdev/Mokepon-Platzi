window.addEventListener('load', () => {
    let ataqueJugador = []
    let logicAtaqueRival
    let MascotaSeleccionada
    let MascotaSeleccionadaRival
    let ataqueRival = []

    let VictoriasJugador = 0;
    let VictoriasRival = 0;


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
    function numAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function selectMascotaRival() {
        let eleccionRival = numAleatorio(0, arrayMokepon.length -1)

        if (MascotaSeleccionada === undefined) {
            alert('Primero selecciona la mascota del jugador')
        }
        else {
            logicAtaqueRival = arrayMokepon[eleccionRival].ataques
            nombreVidaMascostaRival.innerHTML =  arrayMokepon[eleccionRival].nombre
            mensajeEleccionRival.innerHTML = arrayMokepon[eleccionRival].nombre
            MascotaSeleccionadaRival = arrayMokepon[eleccionRival].nombre
            sectionAtaque.style.display = 'flex';
            sectionElection.style.display = 'none';
            sectionBotones.style.display = 'none';
            containerMensaje.style.display = 'flex';
        }

    }
    function selectAtaqueRival() {
        let eleccionRivalAtaque = numAleatorio(0, logicAtaqueRival.length -1)
        arrayMokepon.forEach((mokepon) => {
            if (MascotaSeleccionadaRival === mokepon.nombre){
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
    function pelea(){
        if (ataqueJugador.length === 5) {
            combate()
            sectionAtaque.style.display = 'none'
        }
    }
    function indexEleccion(jugador, rival){

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
            }else if (ataqueJugador[index] == '🔥' && ataqueRival[index] == '🌱') {
                indexEleccion(index, index)
                VictoriasJugador++
                vidaJugador.textContent = VictoriasJugador
            }else if(ataqueJugador[index] == '💧' && ataqueRival[index] == '🔥' ){
                indexEleccion(index, index)
                VictoriasJugador++
                vidaJugador.textContent = VictoriasJugador
            }else if(ataqueJugador[index] == '🌱' && ataqueRival[index] == '💧'){
                indexEleccion(index, index)
                VictoriasJugador++
                vidaJugador.textContent = VictoriasJugador
            }else{
                indexEleccion(index, index)
                VictoriasRival++
                vidaEnemigo.textContent = VictoriasRival
            }
        }

        if (VictoriasJugador === VictoriasRival) {
            btnReset.style.display = 'flex';
            sectionBotonesAtaque.style.display = 'none'
            mensaje.innerHTML = `Ha habido un empate ${MascotaSeleccionada} 😊; Quieres volver aintentarlo?`

        }else if (VictoriasJugador > VictoriasRival) {
            sectionBotonesAtaque.style.display = 'none'
            vidaEnemigo.style.color = 'red'
            btnReset.style.display = 'flex';
            mensaje.innerHTML = `Felicidades ${MascotaSeleccionada} 🎉; has ganado la partida`

        } else{
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

})
