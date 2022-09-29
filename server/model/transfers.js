import { DataTypes } from "sequelize";

const Transfers = (sequelize) => {
  const Schema = {

    transfers: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  return sequelize.define("transfers", Schema);
};

export default Transfers;
