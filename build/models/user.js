'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.Subscription, { foreignKey: 'userId' });
    }
    ;
}
;
module.exports = (sequelize, DataTypes) => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dependencia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user', // Establece un valor por defecto para el rol del usuario
        },
    }, {
        sequelize,
        modelName: 'Subscription',
        tableName: 'users',
    });
    return User;
};
exports.default = User;
