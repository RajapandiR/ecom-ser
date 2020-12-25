import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const RoleSchema = mongoose.Schema({
	role: String,
	status: { type: String, default: 'Active'},
},{ timestamps: true });

RoleSchema.plugin(mongoosePaginate);
const Role = mongoose.model('role', RoleSchema);
export default Role;