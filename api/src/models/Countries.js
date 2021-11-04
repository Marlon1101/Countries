const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    ID:{
    type: DataTypes.STRING(3),
    primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Imagen: {
      type: DataTypes.STRING
    },
    Continente:{
      type: DataTypes.STRING
    },
    Capital:{
      type: DataTypes.STRING
    },
    Subregion:{
      type: DataTypes.STRING
    },
    Area:{
      type: DataTypes.FLOAT
    },
    Poblacion:{
      type: DataTypes.INTEGER
    },
  },
  {
    timestamps: false
  });
};