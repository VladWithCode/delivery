const { Schema, model, Types, SchemaTypes } = require('mongoose');
const bcrypt = require('bcrypt');
const asyncHandler = require('../utils/asyncHandler');

const UserSchema = new Schema({
  fullname: { type: String },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  phone: { type: String },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ['user', 'delivery', 'cashier', 'admin'],
    default: 'user',
  },
  cart: { type: SchemaTypes.ObjectId, ref: 'Cart', default: null },
  deliveries: { type: [SchemaTypes.ObjectId], ref: 'Sale', default: null },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const [hashedPass, hashError] = await asyncHandler(
    bcrypt.hash(this.password, 10)
  );

  if (hashError) return next(hashError);

  this.pass = hashedPass;
  next();
});

UserSchema.methods.validatePass = async function (pw) {
  return await bcrypt.compare(pw, this.password);
};

module.exports = model('User', UserSchema);
