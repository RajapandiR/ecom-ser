import CreateError from "http-errors"
import Category from "../models/category_model";
import CategorySchema from "../schemas/category_schema";
import JsonSchemaValidator from '../utils/jsonschemavalidator';

class CategoryController {
    static async getCategory (req, res)  {
        try{
            const options = {
                page: 1,
                limit: 10,
            };

            const Categorys = await  Category.paginate({}, options, function(err, result) {
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
    }; 
    static async postCategory(req, res, next)  {   
        const { body } = req;
        try {
            const validator = JsonSchemaValidator.validate(body, CategorySchema.addCategory())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
            const data = await Category.create(body, function(err, result) {
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

    static async deleteCategory(req, res, next)  {  
        const _id = req.params.id;
        const { body } = req;
        const data = await Category.deleteOne({_id}, body, function(err, result) {
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

    static async updateCategory(req, res, next)  {  
        const { body } = req;
        const validator = JsonSchemaValidator.validate(body, CategorySchema.editCategory())
            if(!validator.valid){
                throw CreateError(400, JsonSchemaValidator.notValidate(validator.errors))
            }
        const _id = body._id;
        const data = await Category.updateOne({_id}, body, function(err, result) {
            const response = {
                "statuscode": 200,
                "message": "Update Successfull",
                "data": result
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
export default  CategoryController;