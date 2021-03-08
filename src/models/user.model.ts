import { Schema, model, Document, Date } from 'mongoose';

export interface UserDoc extends Document {
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

const User = model<UserDoc>('User', userSchema);

export default User;
