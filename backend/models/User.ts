import { DataTypes, Model, Sequelize } from "sequelize";

export class GameUser extends Model {
  declare id: number;
  declare username: string;
  declare points: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(sequelize: Sequelize) {
    GameUser.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        points: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "GameUser",
        tableName: "game_users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}
