import createError from 'http-errors';
import User from '../models/user_model';
import Role from '../models/role_model';
import AuthSchema from '../schemas/auth_schema';
import Jwt from '../utils/jwt';
import JsonSchemaValidator from '../utils/jsonSchemaValidator';
import Bcrypt from 'bcryptjs';

function save_session (req, data, token) {
  req.session.isValid = true;
  req.session.username = data.username;
  req.session.token = token;
  req.session.userId = data.id;
  req.session.role = data.role.role;
  req.user = data;
}


class AuthController {
  static async login(req, res, next) {
    const { body } = req;
    // let apiType = 'Rest Api';
    // if(body.apiType){
    //   apiType = body.apiType;
    //   delete body.apiType;
    // }
    try {
      const validate = JsonSchemaValidator.validate(body, AuthSchema.loginSchema());
      if (!validate.valid) {
        throw createError(400, JsonSchemaValidator.notValidate(validate.errors));
      }
    //   const getRole = await Role.findOne({ role: body.role });
    //   if (!getRole) {
    //     throw createError(400, "message.ROLE_INVALID");
    //   }
      const searchQuery = {};
      // searchQuery.userName = body.userName;
      // searchQuery.role = getRole._id;

      const user = await User.findOne({userName: body.userName}).populate('role');
      // console.log("user", user);
      if (!user) {
        throw createError(400, "Account invalid");
      }
      const checkPassword = await Bcrypt.compare(body.password, user.password);
      if (!checkPassword) {  throw createError(400, "PASSWORD_WRONG");  }
      const payload = {
        userId: user.id,
        role: user.role.role
      };
      await User.findOne({userName: req.body.userName} , function(err, user) {
        const token =  Jwt.issueToken(payload);
        save_session(req, user, token)
        const jsonUserData = user.toJSON();
        jsonUserData.token = token;
        const response = {
          statusCode: 200,
          message: "LOGINSUCCESS",
          data: jsonUserData
        };
         res.status(200).json(response);
      })
    } catch (err) {
      console.log("Error", err.message)
      next(err);
    }
  }
}



export default AuthController;