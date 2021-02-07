import { Schema, model, Document } from 'mongoose';

export interface ISong extends Document {
  name: string;
  band: string;
  img: string;
  file: string;
  genre: string;
}

const songSchema = new Schema({
  name: String,
  band: String,
  img: String,
  file: String,
  genre: String,
});

const Song = model<ISong>('Song', songSchema);

export default Song;
