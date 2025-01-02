# Instrucciones para iniciar el proyecto

1. Ejecuta el comando `npm install` para instalar las dependencias necesarias.
2. Abre el archivo `/config/db.config.js` y configura los datos de conexión a tu base de datos (usuario, contraseña, nombre de la base de datos, etc.).
3. Inicia el servidor con el comando `npm run dev` o `npm start`.
4. Una vez que el servidor esté corriendo, puedes comenzar a hacer consultas utilizando herramientas como **Postman** o **Insomnia**.

## Algunas rutas para probar:

### Rutas para usuarios:
- **POST** `/users`: Crea un nuevo usuario.
- **GET** `/users/:id`: Obtiene un usuario por su ID.
- **GET** `/users`: Obtiene todos los usuarios.
- **PUT** `/users/:id`: Actualiza un usuario por su ID.
- **DELETE** `/users/:id`: Elimina un usuario por su ID.

### Rutas para bootcamps:
- **POST** `/bootcamps`: Crea un nuevo bootcamp.
- **POST** `/bootcamps/:bootcampId/users/:userId`: Asigna un usuario a un bootcamp.
- **GET** `/bootcamps/:id`: Obtiene la información de un bootcamp por su ID.
- **GET** `/bootcamps`: Obtiene todos los bootcamps.

> Asegúrate de reemplazar `[puerto:numero]` por el número de puerto donde está corriendo tu servidor (por defecto `3018`).
