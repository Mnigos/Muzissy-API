import { Request, Response, Router } from 'express';
import { random, shuffle } from 'lodash';
import { ISong } from '@/models/song.model';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import Playlist from '../../models/playlist.model';

const router = Router();

router.get(
  '/:id',
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { songs, name } = await Playlist.findById(req.params.id);

      const rightSong = songs[random(songs.length)];

      const songToken = jwt.sign(
        { path: rightSong.id },
        process.env.SONG_TOKEN_SECRET,
        { expiresIn: ms('3m') }
      );

      res.cookie('path', songToken, {
        httpOnly: true,
      });

      const randomArrayElement = <T>(arr: T[]): T => arr[random(arr.length)];

      const randomSong = (): ISong => randomArrayElement(songs);

      const randomAnswers = (rightAnswer: ISong, answersCount: number = 4) => {
        const songNames = new Array(answersCount - 1)
          .fill(null)
          .map(randomSong);
        songNames.push(rightAnswer);

        return shuffle(songNames);
      };

      res.status(200).send({
        name,
        path: rightSong.file,
        songs: shuffle(randomAnswers(rightSong)),
      });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
