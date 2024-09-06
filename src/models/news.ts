import { Model, UUIDV4 } from 'sequelize';

export interface NewsAttributes {
    id?: number;
    titulo: string;
    descripcion: string;
    imagen: string | null;
    fechaPublicacion: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class News extends Model<NewsAttributes> implements NewsAttributes {
        
        id!: number;
        titulo!: string;
        descripcion!: string;
        imagen!: string;
        fechaPublicacion!: Date;
    }

    News.init(
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
            descripcion: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            imagen: {
                type: DataTypes.STRING,
                allowNull: true, // cambiar esto a false si la imagen es obligatoria
            },
            fechaPublicacion: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            tableName: 'news',
        }
    );

    return News;
};
