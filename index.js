console.log("Hello, World!");

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const port = 8000

const jugadores = []

class jugadorId {
    constructor(id){
        this.id = id
    }
    asignarNombre(nombre){
        this.nombre = nombre
    }
    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
}

class NombreJugador {
    constructor(nombre){
        this.nombre = nombre
    }

}

app.get('/jugadoresId', (req, res) => {  
    res.setHeader('Access-Control-Allow-Origin', '*')
    const id = Math.floor(Math.random() * 200)
    const jugador = new jugadorId(id)
    jugadores.push(jugador)
    res.send({id})
})

app.post('/mokepon/:jugadoresId', (req, res) => {
    const Nombre = req.body.mokepon || ""
    const jugadoresId = req.params.jugadoresId
    const nombreJugador = new NombreJugador(Nombre)
    const jugadorIndex = jugadores.findIndex((jugador) => Number(jugadoresId) === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarNombre(nombreJugador)
    }
    res.end()
})
 app.post('/mokepon/:jugadoresId/posicion', (req, res) => {
   const jugadoresId = req.params.jugadoresId
   const x = req.body.x || 0
   const y = req.body.y || 0
   const jugadorIndex = jugadores.findIndex((jugador) => Number(jugadoresId) === jugador.id)
   if (jugadorIndex >= 0) { 
     jugadores[jugadorIndex].actualizarPosicion(x, y)
   }
   res.end()
 })


app.listen(port, () => {
     console.info(`El servidor esta escuchando toda la informacion del puerto ${port}`)
 })