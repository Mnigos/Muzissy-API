import { Schema, model, Document, Date } from 'mongoose';

export interface IUser extends Document {
  name: string;
  pass: string;
  perms: string;
  createdAt: Date;
}

const userSchema = new Schema({
  name: String,
  pass: String,
  perms: String,
  createdAt: Date,
});

const User = model<IUser>('User', userSchema);

export default User;
