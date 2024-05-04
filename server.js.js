import express from "express";
const app = express();
import { nuevaCancion, verCanciones, editarCancion, eliminarCancion } from "./consultas/consultas";

const PORT = 3000;

app.use(express.json());

// 1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y
// realice a través de una función asíncrona la inserción en la tabla canciones.
// (3 Puntos)



// 2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla
// canciones.
// (2 Puntos)



// 3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar,
// ejecuta una función asíncrona para hacer la consulta SQL correspondiente y actualice
// ese registro de la tabla canciones.
// (3 Puntos)



// 4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
// realiza una consulta SQL a través de una función asíncrona para eliminarla de la base
// de datos.
// (2 Puntos)









app.get("*", (req, res) => {
    res.send("Esta página no existe...");
});


app.listen(PORT, () => {
    console.log("Servidor Express escuchando en el puerto 3000");
});







