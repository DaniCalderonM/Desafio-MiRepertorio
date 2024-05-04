const manejoErrores = (error, pool, tabla) => {
    let mensaje;
    switch (error.code) {
        case '28P01':
            mensaje = { mensaje: "Autenticación de contraseña falló o no existe el usuario: " + pool.options.user };
            break;
        case '23505':
            mensaje = { mensaje: "No se puede agregar nuevamente al estudiante. " + error.detail };
            break;
        case '42P01':
            mensaje = { mensaje: "No existe la tabla consultada [" + tabla + "]" };
            break;
        case '22P02':
            mensaje = { mensaje: "La sintaxis de entrada no es válida para tipo integer" };
            break;
        case '3D000':
            mensaje = { mensaje: "La Base de Datos [" + pool.options.database + "] no existe" };
            break;
        case '28000':
            mensaje = { mensaje: "El usuario/rol [" + pool.options.user + "] no existe" };
            break;
        case '42601':
            mensaje = { mensaje: "Error de sintaxis en la instrucción SQL --> " + error.message };
            break;
        case '42703':
            mensaje = { mensaje: "No existe la columna consultada: " + error.hint };
            break;
        case 'ENOTFOUND':
            mensaje = { mensaje: "Error en el valor usado como localhost: " + pool.options.host };
            break;
        case 'ECONNREFUSED':
            mensaje = { mensaje: "Error en el puerto de conexión a BD, usando: " + pool.options.port };
            break;
        default:
            mensaje = { mensaje: "Error interno del servidor" };
            break;
    }
    console.log(mensaje);
    return mensaje
};

export { manejoErrores };