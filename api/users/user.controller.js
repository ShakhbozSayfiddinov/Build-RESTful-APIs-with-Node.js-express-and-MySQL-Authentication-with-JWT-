const bcrypt = require('bcrypt');
const {
  create,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {sign} = require('jsonwebtoken');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        res.json({
          success: 0,
          message: "Recort not Found",
        });
      }
      return res.json({
        success: 1,
        message: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: results,
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password,salt);
    updateUser(body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      };
      if(!result){
        return res.json({
          success: 0,
          message: 'Failed to update  user '
        });
      };
      return res.json({
        success: 1,
        message: "update successfuly",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      };
      return res.json({
        success: 1,
        message: "user delete successfuly",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    // console.log();
    getUserByUserEmail(body.email, (err, results) => {
      if(err){
        console.log(err);
      };
      if(!results){
        return res.json({
          success:0 ,
          data: 'Invalid emeil or password'
        });
      };
      console.log(results);
      console.log(body.password);
      const result = compareSync(body.password, results.password);
      const expireTime = process.env.expire_time;
      
        if(result){
          results.password = undefined;
          const jsontoken = sign({result: results}, process.env.JWT_SECRET_KEY, {
            expiresIn: expireTime
          });
          return res.json({
            success:1,
            message: 'login successfuly',
            token: jsontoken
          });
        } else {
          return res.json({
            success:0,
            data: 'invali email or password'
          }); 
        }
      
      })
  }
};
