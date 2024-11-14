import { Model, DataTypes, Optional } from "sequelize";

export interface SubscriptionAttributes {
  id?: number;
  endpoint: string;
  keys: string;
}

// Definimos una interfaz que extiende Partial<SubscriptionAttributes> para los atributos opcionales
interface SubscriptionCreationAttributes extends Optional<SubscriptionAttributes, "id"> {}

// Creamos la clase Subscription que extiende Model<SubscriptionAttributes, SubscriptionCreationAttributes>
module.exports = (sequelize: any, DataTypes: any)=>{
  class Subscription
    extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
    implements SubscriptionAttributes
  {
     id!: number;
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
          allowNull: true,
        },
        
      },
      {
        sequelize,
        tableName: 'subscription'
      }
    );
    

    return Subscription;  
  };
  

