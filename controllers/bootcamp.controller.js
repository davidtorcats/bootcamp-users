const { Bootcamp, User } = require("../models");

const createBootcamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json(bootcamp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.bootcampId);
    const user = await User.findByPk(req.params.userId);

    if (!bootcamp || !user) {
      return res
        .status(404)
        .json({ message: "Bootcamp o usuario no encontrado" });
    }

    await bootcamp.addUser(user); // Método proporcionado por Sequelize debido a la relación muchos a muchos
    res
      .status(201)
      .json({
        message: `Usuario ${user.firstName} agregado al bootcamp ${bootcamp.title}`,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByPk(req.params.id, { include: User });
    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp no encontrado" });
    }
    res.json(bootcamp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({ include: User });
    res.json(bootcamps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBootcamp,
  addUser,
  findById,
  findAll,
};
