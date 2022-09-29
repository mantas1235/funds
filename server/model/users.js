import { DataTypes, } from "sequelize";

const Users = (sequelize) => {
  const Schema = {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    password: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }

  return sequelize.define("users", Schema)
}

export default Users;
