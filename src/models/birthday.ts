import { Model} from 'sequelize';

export interface BirthdayAttributes {
    id?: number;
    imagen: string | null;

}

module.exports = (sequelize: any, DataTypes: any) => {
    class Birthday extends Model<BirthdayAttributes> implements BirthdayAttributes {

        id!: number;
        imagen!: string;
    }

    Birthday.init(
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
        },
        {
            sequelize,
            tableName: 'birthday_images',
        }
    );

    return Birthday;
};
