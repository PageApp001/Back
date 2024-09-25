"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_1 = __importDefault(require("./user"));
class Subscription extends sequelize_1.Model {
    static associate(models) {
        Subscription.belongsTo(models.User, { foreignKey: 'userId' });
    }
}
module.exports = (sequelize, DataTypes) => {
    Subscription.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        endpoint: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        keys: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: user_1.default,
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'Subscription',
        tableName: 'subscriptions',
    });
    return Subscription;
};
exports.default = Subscription;
