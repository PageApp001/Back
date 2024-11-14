import { Model, UUIDV4 } from 'sequelize';

export interface QualityAttributes {
    id?: number;
    titulo: string;
    fechaPublicacion: Date;
    file?: object; 
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Quality extends Model<QualityAttributes> implements QualityAttributes {
        
        id!: number;
        titulo!: string;
        fechaPublicacion!: Date;
        file!: object;
    }

    Quality.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            titulo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fechaPublicacion: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            file: {
                type: DataTypes.JSON, // Define el campo como JSON para almacenar la estructura de archivos
                allowNull: true,
            },      
        },
        {
            sequelize,
            tableName: 'Quality',
        }
    );

    return Quality;
};
