import { DataTypes } from "sequelize";

const Transfers = (sequelize) => {
  const Schema = {

    transfers: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  };

  return sequelize.define("transfers", Schema);
};

export default Transfers;
