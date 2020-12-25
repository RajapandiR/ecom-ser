import CreateError from "http-errors"
import User from "../models/user_model";
import UserSchema from "../schemas/user_schema";
import JsonSchemaValidator from '../utils/jsonSchemaValidator';

class UserController {
	static async listUser(req, res, next) {
		 try{
            const options = {
                page: 1,
                limit: 10,
                select: ["userName", "fullName", "email"]
                
            };
            // where = req.query.userName;
            // console.log("where", where)
            const Users = await  User.paginate({}, options, function(err, result) {
                if(err){
                    console.log("Error ", err)
                }
                if(result) {
                    const response = {
                      "statusCode": 200,
                      "message":  "Data Found",
                      "data": result.docs,
                      "totalDocs": result.totalDocs || '',
                      "limit": result.limit || '',
                      "totalPages": result.totalPages || '',
                      "page": result.page || '',
                      "pagingCounter": result.pagingCounter || '',
                      "hasPrevPage": result.hasPrevPage || '',
                      "hasNextPage": result.hasNextPage || '',
                      "prevPage": result.prevPage || '',
                      "nextPage": result.nextPage || ''
                   };
                   res.json(response);
                }
                
            }); 
        }catch(err){
            res.json({message:err});
        }
	}

	static async createUser(req, res, next)  {   
        const { body } = req;
        try {
            const validator = JsonSchemaValidator.validate(body, UserSchema.addUser())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
            if(req.file != undefined && (req.file.filename != undefined && req.file.filename != '')){
	          body.photo = req.file.filename;
	        }
            const data = await User.create(body, function(err, result) {
                const response = {
                    "statuscode": 200,
                    "message": "Create Successfull",
                    "data": result
                }
                if(!err)
                    res.status(200).json(response)
                 else{
                    next(err,response)
                }
            });   
        }catch(err){
            next(err);
        }
    };

    static async updateUser(req, res, next)  {   
        const { body } = req;
        try {
            const validator = JsonSchemaValidator.validate(body, UserSchema.editUser())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
            if(req.file != undefined && (req.file.filename != undefined && req.file.filename != '')){
	          body.photo = req.file.filename;
	        }
	        const id = body._id;
            const data = await User.findByIdAndUpdate(id, body, function(err, result) {
                const response = {
                    "statuscode": 200,
                    "message": "Update Successfull",
                    "data": result
                }
                if(!err)
                    res.status(200).json(response)
                 else{
                    next(err,response)
                }
            });   
        }catch(err){
            next(err);
        }
    };

    // static async deleteUser(req, res, next)  {   
    //     const { body } = req;
    //     try {
	   //      const id = req.params._id;
    //         const data = await User.deleteOne({id}, body, function(err, result) {
    //             const response = {
    //                 "statuscode": 200,
    //                 "message": "Delete Successfull",
    //                 "data": result
    //             }
    //             if(!err)
    //                 res.status(200).json(response)
    //              else{
    //                 console.log("error",err)
    //             	res.json({message:err})
    //             }
    //         });   
    //     }catch(err){
    //         // next(err);
    //         console.log("err", err)
    //     }
        
    // };

    static async deleteUser(req, res, next)  {  
        const _id = req.params.id;
        const { body } = req;
        const data = await User.deleteOne({_id}, body, function(err, result) {
            const response = {
                "statuscode": 200,
                "message": "Delete Successfull",
            }
            if(!err){
                res.status(200).json(response)
            }else {
                console.log("error",err)
                res.json({message:err})
            }
        })
    }
}

export default UserController;
