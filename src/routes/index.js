import UserController from '../controllers/user_controller';
import RoleController from '../controllers/role_controller';

import express from 'express';
import multer from 'multer';
import path from 'path';
const router =express.Router();

var UserStorage = multer.diskStorage(
    {    	
    	destination : path.join(__dirname, '../../public/Photo'),
        filename: function ( req, file, cb ) {
        	// cb( null, path.basename(file.originalname) + '-' + Date.now() + path.extname(file.originalname));
        	cb( null, path.basename(file.originalname) );
        }
    }
);
const UserUpload = multer({storage: UserStorage, fileFilter: function (req, file, cb) {
	// var filetypes = /jpeg|jpg|png/;
	// var mimetype = filetypes.test(file.mimetype);
	var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
       if(file.mimetype === 'image/jpeg') {
        filetype = 'jpeg';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      // var mimetype = filetype.test(file.mimetype);
	// var extname = filetype.test(path.extname(file.originalname).toLowerCase());
	if (file.mimetype) {
	  return cb(null, true);
	}
	cb("Error: File upload only supports the following filetypes - " + filetypes);
}});


router.route('/user')
	.get(UserController.listUser)
	.post(UserUpload.single('photo'),UserController.createUser)
	.put(UserUpload.single('photo'),UserController.updateUser)

router.route('/user/:id')
	.delete(UserController.deleteUser)

router.route('/role')
  .get(RoleController.listRole)
  .post(RoleController.createRole)
  .put(RoleController.updateRole)

router.route('/role/:id')
  .delete(RoleController.deleteRole)

export default router;