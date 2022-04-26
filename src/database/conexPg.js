import Sequelize from "sequelize";
import { config } from "dotenv";
config();

export const sequelize = new Sequelize(
   process.env.NAME_BD,
   process.env.USER_DB,
   process.env.PASS_DB,
   {
      host: process.env.HOST_DB,
      dialect: "postgres",
   }
);
