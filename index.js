// console.log("Hello, World!");

const express = require('express')

const app = express()

const port = 8000

app.get('/', (req, res) => {
    res.send(`Hola, aca se encuentra la data de la API para el juego de Mokepon del puerto ${port}`)
})

app.listen(port, () => {
    console.log(`El servidor esta escuchando toda la informacion del puerto ${port}`)
})