const express = require("express");
const { sequelize, User, Bootcamp } = require("./models");
const {
  createUser,
  findUserById,
  findAll: findAllUsers,
  updateUserById,
  deleteUserById,
} = require("./controllers/user.controller");
const {
  createBootcamp,
  addUser,
  findById: findBootcampById,
  findAll: findAllBootcamps,
} = require("./controllers/bootcamp.controller");

const app = express();
const PORT = process.env.PORT || 3018;

app.use(express.json());

// Rutas para usuarios
app.post("/users", createUser);
app.get("/users/:id", findUserById);
app.get("/users", findAllUsers);
app.put("/users/:id", updateUserById);
app.delete("/users/:id", deleteUserById);

// Rutas para bootcamps
app.post("/bootcamps", createBootcamp);
app.post("/bootcamps/:bootcampId/users/:userId", addUser);
app.get("/bootcamps/:id", findBootcampById);
app.get("/bootcamps", findAllBootcamps);

// Funciones para crear datos iniciales (usuarios, bootcamps y relaciones)
async function createInitialUsers() {
  try {
    await User.bulkCreate(
      [
        {
          firstName: "Mateo",
          lastName: "Díaz",
          email: "mateo.diaz@correo.com",
        },
        {
          firstName: "Santiago",
          lastName: "Mejías",
          email: "santiago.mejias@correo.com",
        },
        {
          firstName: "Lucas",
          lastName: "Rojas",
          email: "lucas.rojas@correo.com",
        },
        {
          firstName: "Facundo",
          lastName: "Fernandez",
          email: "facundo.fernandez@correo.com",
        },
      ],
      { ignoreDuplicates: true }
    );
    console.log("Usuarios iniciales creados.");
  } catch (error) {
    console.error("Error al crear usuarios iniciales:", error);
  }
}

async function createInitialBootcamps() {
  try {
    await Bootcamp.bulkCreate(
      [
        {
          title: "Introduciendo El Bootcamp De React",
          cue: 10,
          description:
            "React es la librería más usada en JavaScript para el desarrollo de interfaces.",
        },
        {
          title: "Bootcamp Desarrollo Web Full Stack",
          cue: 12,
          description:
            "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.",
        },
        {
          title:
            "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
          cue: 18,
          description:
            "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados",
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Bootcamps iniciales creados.");
  } catch (error) {
    console.error("Error al crear bootcamps iniciales:", error);
  }
}

async function createInitialRelations() {
  try {
    const mateo = await User.findOne({ where: { firstName: "Mateo" } });
    const santiago = await User.findOne({ where: { firstName: "Santiago" } });
    const lucas = await User.findOne({ where: { firstName: "Lucas" } });

    const reactBootcamp = await Bootcamp.findOne({
      where: { title: "Introduciendo El Bootcamp De React" },
    });
    const fullstackBootcamp = await Bootcamp.findOne({
      where: { title: "Bootcamp Desarrollo Web Full Stack" },
    });
    const bigDataBootcamp = await Bootcamp.findOne({
      where: {
        title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
      },
    });

    if (
      mateo &&
      santiago &&
      lucas &&
      reactBootcamp &&
      fullstackBootcamp &&
      bigDataBootcamp
    ) {
      await reactBootcamp.addUsers([mateo, santiago]);
      await fullstackBootcamp.addUser(mateo);
      await bigDataBootcamp.addUsers([mateo, santiago, lucas]);

      console.log("Relaciones entre usuarios y bootcamps creadas.");
    } else {
      console.error(
        "No se encontraron usuarios o bootcamps para crear las relaciones."
      );
    }
  } catch (error) {
    console.error(
      "Error al crear las relaciones entre usuarios y bootcamps:",
      error
    );
  }
}

sequelize.sync({ force: false }).then(async () => {
  console.log("Base de datos sincronizada.");
  await createInitialUsers();
  await createInitialBootcamps();
  await createInitialRelations();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
