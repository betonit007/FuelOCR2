import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model('user', UserSchema);
