import { Schema, model, Document } from 'mongoose';

export interface SongDoc extends Document {
  name: string;
  band: string;
  img: string;
  file: string;
  genre: string;
  id: string;
}

const songSchema = new Schema({
  name: String,
  band: String,
  img: String,
  file: String,
  genre: String,
  id: String,
});

const Song = model<SongDoc>('Song', songSchema);

export default Song;
