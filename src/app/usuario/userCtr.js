import { sequelize } from "../../database/conexPg.js";
import httpError from "../../utils/handleError.js";
import functions from "./functions/querys.js";

class User {
   async getUser(req, res) {
      try {
         const data = 1;
         const result = await sequelize.query(
            functions.getUser(data)
         );
         res.json(result[0]);
      } catch (error) {
         httpError(res, error);
      }
   }
}

export default new User();
