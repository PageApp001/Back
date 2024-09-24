"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Carousel extends sequelize_1.Model {
    }
    Carousel.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true, // El link es opcional
        },
    }, {
        sequelize,
        tableName: 'carousel_images',
    });
    return Carousel;
};
