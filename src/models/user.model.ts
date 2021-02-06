import { Schema, model, Document, Date } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  pass: string;
  perms: string;
  createdAt: Date;
}

const userSchema = new Schema({
  email: String,
  name: String,
  pass: String,
  perms: String,
  createdAt: Date,
});

const User = model<IUser>('User', userSchema);

export default User;
