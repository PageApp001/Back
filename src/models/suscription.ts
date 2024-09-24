import { Model } from 'sequelize';

export interface SubscriptionAttributes {
  id?: number;
  endpoint: string;
  expirationTime?: Date | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Subscription extends Model<SubscriptionAttributes> implements SubscriptionAttributes {
    id!: number;
    endpoint!: string;
    expirationTime!: Date | null;
    keys!: {
      p256dh: string;
      auth: string;
    };
  }

  Subscription.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      endpoint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expirationTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      keys: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'subscriptions',
    }
  );

  return Subscription;
};
