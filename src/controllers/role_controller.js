import CreateError from "http-errors"
import Role from "../models/role_model";
import RoleSchema from "../schemas/role_schema";
import JsonSchemaValidator from '../utils/jsonSchemaValidator';

class RoleController {
	static async listRole(req, res, next) {
		 try{
            const options = {
                page: 1,
                limit: 10,
                
            };
            const Roles = await  Role.paginate({}, options, function(err, result) {
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

	static async createRole(req, res, next)  {   
        const { body } = req;
        try {
            const validator = JsonSchemaValidator.validate(body, RoleSchema.addRole())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
            if(req.file != undefined && (req.file.filename != undefined && req.file.filename != '')){
	          body.photo = req.file.filename;
	        }
            const data = await Role.create(body, function(err, result) {
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

    static async updateRole(req, res, next)  {   
        const { body } = req;
        try {
            const validator = JsonSchemaValidator.validate(body, RoleSchema.editRole())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
            if(req.file != undefined && (req.file.filename != undefined && req.file.filename != '')){
	          body.photo = req.file.filename;
	        }
	        const id = body._id;
            const data = await Role.findByIdAndUpdate(id, body, function(err, result) {
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

    // static async deleteRole(req, res, next)  {   
    //     const { body } = req;
    //     try {
	   //      const id = req.params._id;
    //         const data = await Role.deleteOne({id}, body, function(err, result) {
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

    static async deleteRole(req, res, next)  {  
        const _id = req.params.id;
        const { body } = req;
        const data = await Role.deleteOne({_id}, body, function(err, result) {
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

export default RoleController;
