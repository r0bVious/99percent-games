import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT as any,
    dialectModule: mysql2,
    timezone: "+09:00",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    define: {
      timestamps: true,
    },
  }
);
