import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReadingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  store: {
    type: String,
    required: true,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  total: {
    type: Number,
    required: true,
  },
  perGallon: {
    type: Number,
    required: true,
  },
  numGallons: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('reading', ReadingSchema);
