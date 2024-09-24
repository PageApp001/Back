"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/subscription.ts
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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        keys: {
            type: DataTypes.TEXT,
            allowNull: true, // Puede ser `null` dependiendo de la implementación
        },
    }, {
        sequelize,
        modelName: 'Subscription',
    });
};
