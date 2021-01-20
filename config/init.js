import config from './config';
import User from '../src/models/user_model';
import Role from '../src/models/role_model';
const initadmin = function(app, db) {
    return new Promise(function(resolve) {
        // var User = db.model('User');
        User.findOne({ email: config.SUPER_ADMIN_EMAIL}, function(err, user) {
            if (err) console.log(err);
            const roleData = Role.findOne({role: "superadmin"}, (err, result) => {
                if (!user) {
                    var newAdmin = new User({
                        username: config.SUPER_ADMIN_USERNAME,
                        email: config.SUPER_ADMIN_EMAIL,
                        password: config.SUPER_ADMIN_PASSWORD,
                        role: result._id
                    });
                    newAdmin.save(function(err) {
                        if (err) throw err;
                        resolve();
                    })
                } else {
                    resolve();
                }  
            })    
            
        })
    })
};

export default initadmin;