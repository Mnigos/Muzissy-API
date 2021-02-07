import { Schema, model, Document, Date } from 'mongoose';
import { ISong } from './song.model';

export interface IPlaylist extends Document {
  name: string;
  img: string;
  songs: ISong[];
  difficulty: string;
  createdAt: Date;
}

const playlistSchema = new Schema({
  name: String,
  img: String,
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  difficulty: String,
  createdAt: Date,
});

const Playlist = model<IPlaylist>('User', playlistSchema);

export default Playlist;
