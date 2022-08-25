
const msql = require('./supports/mssql.connection')


------------------------------------------------------------------------------------------------------------------------------------------------
const  sql = require('mssql');
module.exports = {
  async getConnection () {
    try {
      const dbSettings = {
        user: 'dc_read',
        password: 'reader123.',
        server: '3.144.114.159',
        database: 'BDIC',
        options: {
          encrypt: true, // for azure
          trustServerCertificate: true, // change to true for local dev / self-signed certs
        },
      } 
      const pool = await sql.connect(dbSettings);
      return pool;
    } catch (error) {
      console.error(error);
    }
  }
}

------------------------------------------------------------------------------------------------------------------------------------------------


const sql = require('mssql');
const { Logger } = require('@rimac/common');
const { HttpConstant } = require('@rimac/core');
const CustomException = require('./custom.exception');
const ErrorConstant = require('./error.constant');

module.exports = {
  async getConnection() {
    const bdicCredentials = JSON.parse(process.env.BDIC_CREDENTIALS);
    try {
      const dbSettings = {
        user: bdicCredentials.user,
        password: bdicCredentials.password,
        server: bdicCredentials.host,
        database: bdicCredentials.database,
        options: {
          encrypt: false, // for azure
          trustServerCertificate: false, // change to true for local dev / self-signed certs
        },
      };
      const pool = await sql.connect(dbSettings);
      return pool;
    } catch (e) {
      return new CustomException(
        ErrorConstant.ERROR_CONEXION_BD_BDIC.code,
        ErrorConstant.ERROR_CONEXION_BD_BDIC.message,
        e,
        e.httpStatus ? e.httpStatus : HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
      ).throw(true);
    }
  },

  async executeQuery(statement, values) {
    try {
      const pool = await this.getConnection();
      const query = this._bindQueryParams(statement, values);
      const result = await pool.request().query(query);
      await pool.close();
      return result;
    } catch (e) {
      return new CustomException(
        ErrorConstant.ERROR_EJECUCION_QUERY_BD_BDIC.code,
        ErrorConstant.ERROR_EJECUCION_QUERY_BD_BDIC.message,
        e,
        e.httpStatus ? e.httpStatus : HttpConstant.INTERNAL_SERVER_ERROR_STATUS.code,
      ).throw(true);
    }
  },

  _bindQueryParams(query, values) {
    let bindSql = `${query}`;
    Object.keys(values).forEach((tp) => {
      bindSql = bindSql.replace(new RegExp(`(:${tp})\\b`, 'g'), values[tp]);
    });
     Logger.info(`Query: ${bindSql}`);
    return bindSql;
  },
};
