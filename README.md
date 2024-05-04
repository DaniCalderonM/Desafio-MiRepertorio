# Desafío - Mi Repertorio

## Descripción
La escuela de música “E-Sueño” está motivando a sus estudiantes de canto a presentarse en
vivo y se puso en contacto con el restaurante del sector para usar su tarima e iniciar un
calendario de presentaciones. Para conocer y gestionar las canciones que cantarán sus
estudiantes, la escuela contrató a un desarrollador freelance para la creación de una
aplicación tipo CRUD.
En este desafío deberás desarrollar un servidor con Express que utilice el paquete pg para
conectarse con PostgreSQL y utilice funciones asíncronas para hacer las consultas a la base
de datos.

## Requerimientos
1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y
realice a través de una función asíncrona la inserción en la tabla canciones.(3 Puntos)
2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla
canciones.(2 Puntos)
3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar,
ejecuta una función asíncrona para hacer la consulta SQL correspondiente y actualice
ese registro de la tabla canciones.(3 Puntos)
4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
realiza una consulta SQL a través de una función asíncrona para eliminarla de la base
de datos.(2 Puntos)

## Instalación 🔧
1. Clona este repositorio.
2. Instala las dependencias con npm:
- npm install
3. Configura las variables de entorno creando un archivo .env en la raíz del proyecto:
- DB_PASSWORD=TuContraseña
- DB_USER=TuUsuario
- DB_DATABASE=NombreDeTuBaseDeDatos
- DB_HOST=TuHost
- DB_PORT=TuPuerto
4. Inicia el servidor:
- nodemon server

## Funcionalidades
- Agregar una nueva canción a la base de datos.
- Ver todas las canciones almacenadas.
- Editar una canción existente.
- Eliminar una canción de la base de datos.

## Tecnologías Utilizadas
- Node.js
- Express
- PostgreSQL

## Autor
- Danicsa Calderón - [GitHub](https://github.com/DaniCalderonM)
