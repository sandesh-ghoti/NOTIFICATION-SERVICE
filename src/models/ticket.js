"use strict";
const { Model } = require("sequelize");
const { STATUS } = require("../utils/common");
const { PENDING, SUCCESS, FAILED } = STATUS;
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init(
    {
      subject: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      recipientEmail: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [SUCCESS, FAILED, PENDING],
        defaultValue: PENDING,
      },
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
