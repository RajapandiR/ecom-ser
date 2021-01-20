import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CategotySchema = mongoose.Schema({
    name : { type: String},
    description : { type: String},
    // count: { type: String},
    displayed : { type: String, default: 'Yes'},
}, { timestamps: true });

CategotySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

CategotySchema.plugin(mongoosePaginate);
const Categoty = mongoose.model('category', CategotySchema)

export default Categoty;