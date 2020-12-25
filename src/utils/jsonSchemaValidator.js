import { validate } from "jsonschema";

class JsonSchemaValidator{
	static validate(request, schema){
		return validate(request, schema)
	}
	static notValidate(errors){
		return (errors[0].message).replace(/"/g, '');
	}
}

export default JsonSchemaValidator;