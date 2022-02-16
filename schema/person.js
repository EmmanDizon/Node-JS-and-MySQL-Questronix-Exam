let instance = null;
const mysqlConnection = require("../config/database");

class DBService {
  static getDBServiceInstance() {
    return instance ? instance : new DBService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM tblPersons;";
        mysqlConnection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async createPerson(objPerson) {
    try {
      const insertPerson = await new Promise((resolve, reject) => {
        const { FirstName, LastName, Address, ContactNo, Email } = objPerson;

        const query =
          "INSERT INTO tblPersons (FirstName, LastName, Address, ContactNo, Email) VALUES (?,?,?,?,?);";

        mysqlConnection.query(
          query,
          [FirstName, LastName, Address, ContactNo, Email],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertPerson);
          }
        );
      });

      return objPerson;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async deletePersonById(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM tblPersons WHERE id = ?";

        mysqlConnection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async updateRecordById(objPerson, id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const { FirstName, LastName, Address, ContactNo, Email } = objPerson;

        const query = "CALL update_person(?,?,?,?,?,?)";

        mysqlConnection.query(
          query,
          [FirstName, LastName, Address, ContactNo, Email, id],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.affectedRows);
          }
        );
      });

      return { result: response === 1 ? true : false, data: objPerson };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getPersonById(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM tblPersons WHERE id = ?";

        mysqlConnection.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = DBService;
