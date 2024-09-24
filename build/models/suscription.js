"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Subscription extends sequelize_1.Model {
    }
    Subscription.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        endpoint: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expirationTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        keys: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'subscriptions',
    });
    return Subscription;
};
