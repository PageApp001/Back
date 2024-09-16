import { Model } from "sequelize";

export interface EventsAttributes {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date;
  horaInicio: string;
  fechaPublicacion: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Events extends Model<EventsAttributes> implements EventsAttributes {
    id!: number;
    nombre!: string;
    descripcion!: string;
    fechaInicio!: Date;
    horaInicio!: string;
    fechaPublicacion!: Date;
  }

  Events.init(
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
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      horaInicio: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      fechaPublicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "events",
    }
  );
  return Events;
};
