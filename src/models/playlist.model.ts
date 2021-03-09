import { Schema, model, Document, Date } from 'mongoose';
import { SongDoc } from './song.model';

export interface PlaylistDoc extends Document {
  name: string;
  img: string;
  songs: SongDoc[];
  difficulty: string;
  createdAt: Date;
  id: string;
}

const playlistSchema = new Schema({
  name: String,
  img: String,
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  difficulty: String,
  createdAt: Date,
  id: String,
});

const Playlist = model<PlaylistDoc>('Playlist', playlistSchema);

export default Playlist;
