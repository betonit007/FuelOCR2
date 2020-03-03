import jwt from 'jsonwebtoken';
import config from 'config';
export default (function (req, res, next) {
    var token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        var decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token not valid ' });
    }
});
