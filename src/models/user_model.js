import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import Bcrypt from '../utils/bcrypt';

const UserSchema = mongoose.Schema({
	userName: { type: String, unique: true},
	fullName: { type: String},
	email: { type: String, unique: true},
  role :  { type: mongoose.Schema.ObjectId, ref: 'role'},
	photo: { type: String },
	password: { type: String, write: true },
	status: { type: String, default: 'Active'}

}, { timestamps: true });

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

UserSchema.pre('save', async function save() {
  if (!this.isModified('password') || !this.password) return true;
  const password = await Bcrypt.hash(this.password);
  this.password = password;
  return true;
});

UserSchema.pre('findOneAndUpdate', async function () {
  this._update.password = await Bcrypt.hash(this._update.password, 10)
})
UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('user', UserSchema);

export default User;