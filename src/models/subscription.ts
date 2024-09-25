import { Model, DataTypes } from 'sequelize';
// import User from './user';
import sequelize from 'sequelize';
import User from './user';
export interface SubscriptionAttributes {
    id?: number;
    endpoint: string;
    keys: string;
    userId: number; 
}
class Subscription extends Model<SubscriptionAttributes> implements SubscriptionAttributes {
  
  id?: number;
  endpoint!: string;
  keys!: string;
  userId!: number; 
  
  static associate(models: any) {
    Subscription.belongsTo(models.User, { foreignKey: 'userId' });
  }
}


module.exports = (sequelize: any, DataTypes: any) => {
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
      allowNull: true, 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
  },
},
  {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscriptions',
  }
);
 
return Subscription;
};

export default Subscription;
