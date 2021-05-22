module.exports = (sequelize, Sequelize) => {
  const Sac = sequelize.define("sac", {
    item: {
      type: Sequelize.STRING(7)
    },
    descripcion: {
      type: Sequelize.STRING(150)
    },
    medida: {
      type: Sequelize.STRING(20)
    },
    precio: {
      type: Sequelize.STRING(10)
    }
  }); 
  return Sac;
};