import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import db from '../models';


passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "123456",
    }, (jwtPayLoad: any, done: any) => {
        return db.User.findOne({
            where: {
                id: jwtPayLoad.id
            }
        })
            .then((user: any) => {
                return done(null, user);
            })
            .catch((err: Error) => {
                return done(err);
            });
    })
);