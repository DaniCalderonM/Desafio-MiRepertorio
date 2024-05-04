import express from "express";
const app = express();
import { nuevaCancion, verCanciones, editarCancion, eliminarCancion } from "./consultas/consultas.js";

const PORT = 3000;

// Middleware para enviar respuestas json
app.use(express.json());

// Ruta principal que envia un archivo HTML
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./" });
})

let mensaje;
// 1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y
// realice a través de una función asíncrona la inserción en la tabla canciones.
app.post('/cancion', async (req, res) => {
    try {
        if (!titulo || !artista || !tono) {
            mensaje = "Debe ingresar todos los campos";
            res.send(mensaje);
            console.log("Debe ingresar todos los campos");
        }
        else {
            const { titulo, artista, tono } = req.body;
            const respuesta = await nuevaCancion(titulo, artista, tono);
            res.send(respuesta)
        }
    } catch (error) {
        res.send(error)
    }
});

// 2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla
// canciones.
app.get('/canciones', async (req, res) => {
    try {
        const respuesta = await verCanciones();
        res.json(respuesta)
    } catch (error) {
        res.json(error)
    }
});

// 3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar,
// ejecuta una función asíncrona para hacer la consulta SQL correspondiente y actualice
// ese registro de la tabla canciones.
app.put('/cancion/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, artista, tono } = req.body;
        const respuesta = await editarCancion(id, titulo, artista, tono);
        res.send(respuesta)
    } catch (error) {
        res.send(error)
    }
});

// 4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
// realiza una consulta SQL a través de una función asíncrona para eliminarla de la base
// de datos.
app.delete('/cancion', async (req, res) => {
    try {
        const { id } = req.query;
        const respuesta = await eliminarCancion(id);
        res.send(respuesta)
    } catch (error) {
        res.send(error)
    }
});

// Ruta generica para enviar mensaje cuando la ruta ingresada no existe
app.get("*", (req, res) => {
    res.send("Esta página no existe...");
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});







