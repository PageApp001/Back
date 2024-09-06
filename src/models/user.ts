'use strict'
import { Model, UUIDV4 } from 'sequelize'

export interface UserAttributes {
    id: number;
    nombre: string;
    apellido: string;
    cargo: string;
    dependencia: string;
    email: string;
    password: string;
    role: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {

        id!: number;
        nombre!: string;
        apellido!: string;
        cargo!: string;
        dependencia!: string;
        email!: string;
        password!: string;
        role!: string;
    }

    User.init(
        {
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
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user' // Establece un valor por defecto para el rol del usuario
            },
        },
        {
            sequelize,
            tableName: 'users',
        });
        return User;
}
