import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import User from '../models/user.model';

passport.use(
  new Strategy(async (token, done) => {
    let payload: any;
    try {
      payload = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch {
      return done(null, false);
    }

    const foundedUser = await User.findOne({ name: payload.user });

    done(null, foundedUser);
  })
);
