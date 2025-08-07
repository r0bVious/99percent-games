import { DataTypes, Model, Sequelize } from "sequelize";

export class HifiUser extends Model {
  declare bbsNo: number;
  declare memberId: string;
  declare memberPass: string;
  declare memberName: string;
  declare memberName2: string;
  declare point: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(sequelize: Sequelize) {
    HifiUser.init(
      {
        bbsNo: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: "bbs_no",
        },
        memberId: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "member_id",
        },
        memberPass: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "member_pass",
        },
        memberName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "member_name",
        },
        memberName2: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "member_name2",
        },
        point: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "point",
        },
      },
      {
        sequelize,
        modelName: "HifiUser",
        tableName: "hifi_users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  }
}
