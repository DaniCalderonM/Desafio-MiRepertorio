import pool from "../config/db.js";
import { manejoErrores } from '../erroresBBDD/errores.js';
const tabla = 'canciones';

let mensaje;
// Agregar una nueva cancion
const nuevaCancion = async (titulo, artista, tono) => {
    try {
        // Validar que ingresen todos los campos, tanto en el formulario como por thunder o postman
        if (!titulo || !artista || !tono) {
            mensaje = "Debe ingresar todos los campos: titulo, artista y tono";
            console.log(mensaje);
            return mensaje;
        } else {
            // Validar que no exista la cancion en la bbdd
            const consulta = {
                text: `SELECT * FROM ${tabla} WHERE titulo = $1 AND artista = $2 AND tono = $3`,
                values: [titulo, artista, tono]
            }

            const verificar = await pool.query(consulta);
            if (verificar.rows != 0) {
                mensaje = "La canción ya existe en la base de datos"
                console.log(mensaje)
                return mensaje;
            }
        }

        const consulta = {
            text: ` INSERT INTO ${tabla} (titulo, artista, tono) values ($1, $2, $3) RETURNING *`,
            values: [titulo, artista, tono],
        };
        const resultado = await pool.query(consulta);
        if (resultado.rows == 0) {
            mensaje = "No se pudo agregar la cancion";
            console.log(mensaje);
            return mensaje;
        } else {
            console.log(`La cancion con titulo: ${titulo} agregada correctamente. ${JSON.stringify(resultado.rows[0])}`);
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
            mensaje = "No se encontraron canciones registradas";
            console.log(mensaje);
            return mensaje;
        } else {
            console.log(`El registro actual de canciones es ${JSON.stringify(resultado.rows)}`);
            return resultado.rows;
        }
    } catch (error) {
        return manejoErrores(error, pool, tabla);
    }
};

// Actualizar una cancion
const editarCancion = async (id, titulo, artista, tono) => {
    try {
        //Validar que ingresen todos los campos (si se ejecuta en thunder o en postman)
        if (!id || !titulo || !artista || !tono) {
            mensaje = "Debe ingresar todos los campos id, titulo, artista y tono";
            console.log(mensaje);
            return mensaje;
        }
        const consulta = {
            text: `UPDATE ${tabla} SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *`,
            values: [titulo, artista, tono, id]
        };
        const resultado = await pool.query(consulta);

        if (resultado.rows == 0) {
            mensaje = "No se pudo actualizar la cancion, ya que no existe"
            console.log(mensaje);
            return mensaje;
        } else {
            console.log(`Cancion con titulo: ${titulo} actualizada correctamente.`);
            return resultado.rows[0];
        }
    } catch (error) {
        return manejoErrores(error, pool, tabla);
    }
};

const eliminarCancion = async (id) => {
    try {
        //Validar que ingresen el campo id (si se ejecuta en thunder o en postman)
        if (!id) {
            mensaje = "Debe ingresar el campo id";
            console.log(mensaje);
            return mensaje;
        }
        const consulta = {
            text: `DELETE FROM ${tabla} WHERE id = $1 RETURNING *`,
            values: [id],
        };
        const resultado = await pool.query(consulta);

        if (resultado.rows == 0) {
            mensaje = "No se pudo eliminar la cancion, ya que no existe"
            console.log(mensaje);
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