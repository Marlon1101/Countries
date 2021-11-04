const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Dificultad: {
        type: DataTypes.INTEGER,
      },
      Duracion: {
        type: DataTypes.STRING,
      },
      Temporada: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
