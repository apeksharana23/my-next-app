import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    status: { type: Number, default: 1, comment: '1 = active, 0 = inactive' },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
