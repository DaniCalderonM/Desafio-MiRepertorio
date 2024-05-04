import pool from "../config/db.js";
import { manejoErrores } from '../erroresBBDD/errores.js';
const tabla = 'canciones';


// Agregar una nueva cancion
const nuevaCancion = async (titulo, artista, tono) => {
    try {
        const consulta = {
            text: ` INSERT INTO ${tabla} (titulo, artista, tono) values ($1, $2, $3) RETURNING *`,
            values: [titulo, artista, tono],
        };
        const resultado = await pool.query(consulta);

        if (resultado.rows == 0) {
            console.log("No se pudo agregar la cancion");
            const mensaje = "No se pudo agregar la cancion";
            return mensaje;
        } else {
            console.log(`La cancion con nombre: ${nombre} agregada correctamente. ${resultado.rows[0]}`);
            return resultado.rows[0];
        }
    } catch (error) {
        return manejoErrores(error, pool, tabla);
    }
}

// Mostrar todas las canciones
const verCanciones = async () => {
    try {
        const consulta = {
            text: `SELECT * FROM ${tabla}`
        };
        const resultado = await pool.query(consulta);

        if (resultado.rows == 0) {
            console.log(`No se encontraron canciones`);
            const mensaje = "No se encontraron canciones registradas";
            return mensaje;
        } else {
            console.log(`El registro actual de canciones es ${resultado.rows}`);
            return resultado.rows;
        }
    } catch (error) {
        return manejoErrores(error, pool, tabla);
    }
};

// Actualizar una cancion
const editarCancion = async (id, titulo, artista, tono) => {
    try {
        const consulta = {
            text: `UPDATE ${tabla} SET titulo = $1, artista = $2, tono = $3, WHERE id = $4 RETURNING *`,
            values: [titulo, artista, tono, id]
        };
        const resultado = await pool.query(consulta);

        if (resultado.rows == 0) {
            console.log("No se pudo actualizar la cancion, ya que no existe");
            const mensaje = "No se pudo actualizar la cancion, ya que no existe"
            return mensaje;
        } else {
            console.log(`Cancion con nombre: ${nombre} actualizada correctamente.`);
            return resultado.rows[0];
        }
    } catch (error) {
        return manejoErrores(error, pool, tabla);
    }
};

const eliminarCancion = async (id) => {
    try {
        const consulta = {
            text: `DELETE FROM ${tabla} WHERE id = $1 RETURNING *`,
            values: [id],
        };
        const resultado = await pool.query(consulta);

        if (resultado.rows == 0) {
            console.log("No se pudo eliminar la cancion, ya que no existe");
            const mensaje = "No se pudo eliminar la cancion, ya que no existe"
            return mensaje;
        } else {
            console.log(`Cancion con id: ${id} eliminada correctamente.`);
            return resultado.rows[0];
        }
    } catch (error) {
        return manejoErrores(error, pool, tabla);
    }
};

export { nuevaCancion, verCanciones, editarCancion, eliminarCancion };