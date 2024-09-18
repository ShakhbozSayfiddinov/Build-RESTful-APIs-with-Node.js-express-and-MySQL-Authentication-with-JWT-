const pool = require("../../config/database");
const bcrypt = require('bcrypt');


module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO Registration(firstname, lastname, gender, email, password, number)
                    values(?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results);
      } // bu databazada malomot tog`ri kelganmi yoki yo`qligimni tekshiradi.
    );
  },
  getUsers: (callBack) => {
    pool.query(
      `SELECT id, firstname, lastname, gender, email, number from registration`,
      [],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results);
      }
    );
  },

  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT id, firstName, lastName, gender, email, password, number from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) return callBack(error);
        return callBack(null, results[0]);
      }
    );
  },

  updateUser: (data, callBack) => {
    pool.query(
        `UPDATE registration SET firstname=?, lastname=?, gender=?, email=?,password=?, number=?   where id = ?`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
        ],
        (error, results, fields) => {
            if(error){
                 callBack(error)
            }
            return callBack(null, results)
        }
    )
  },

  deleteUser: (data, callBack) => {
    pool.query(
        `DELETE FROM regitration  WHERE id=?`,
        [data.id],
        (error, results, fields) => {
            if(error)
                return callBack(error);
            return callBack(null, results[0]);
        }
    )
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM registration WHERE email=?`,
      [email],
      (error,results, fields) => {
        if(error) {
          return callBack(error)
        };
        return callBack(null, results[0]);
      }
    )
  }
};
