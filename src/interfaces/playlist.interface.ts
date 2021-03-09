import ISong from './song.interface';

export default interface IPlaylist {
  name: string;
  img: string;
  songs: ISong[];
  difficulty: string;
  createdAt: Date;
  id?: string;
}
