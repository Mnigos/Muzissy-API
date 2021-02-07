import { Schema, model, Document } from 'mongoose';

export interface ISong extends Document {
  name: string;
  band: string;
  img: string;
  genre: string;
}

const songSchema = new Schema({
  name: String,
  band: String,
  img: String,
  genre: String,
});

const Song = model<ISong>('User', songSchema);

export default Song;
