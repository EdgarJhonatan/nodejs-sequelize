class functions {
   getUser(data) {
      const result = `SELECT * FROM tbusuari where id_usuari = ${data}`;
      return result;
   }
}
export default new functions();
