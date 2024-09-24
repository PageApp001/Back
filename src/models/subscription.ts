// src/models/subscription.ts
import { Model, DataTypes } from 'sequelize';

export interface SubscriptionAttributes {
    id?: number;
    endpoint: string;
    keys: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Subscription extends Model<SubscriptionAttributes> implements SubscriptionAttributes {
        
        id?: number;
        endpoint!: string;
        keys!: string;
    }

        Subscription.init(
  {
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
  },
  {
    sequelize,
    modelName: 'Subscription',
  }
);


}