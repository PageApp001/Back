import { Model, UUIDV4 } from 'sequelize';

export interface LinkAttributes {
    id?: number;
    nombre: string ;
    url?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Link extends Model<LinkAttributes> implements LinkAttributes {

        id!: number;
        nombre!: string;
        url!: string;
    }

    Link.init(
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
            url: {
                type: DataTypes.STRING,
                allowNull: false, 
            },
        },
        {
            sequelize,
            tableName: 'links',
        }
    );

    return Link;
};
