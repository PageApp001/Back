import { Model, UUIDV4 } from 'sequelize';

export interface CarouselAttributes {
    id?: number;
    imagen: string | null;
    link?: string | null;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Carousel extends Model<CarouselAttributes> implements CarouselAttributes {

        id!: number;
        imagen!: string;
        link!: string | null;
    }

    Carousel.init(
        {
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
        },
        {
            sequelize,
            tableName: 'carousel_images',
        }
    );

    return Carousel;
};
