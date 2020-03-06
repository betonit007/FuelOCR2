import jwt from 'jsonwebtoken';
import config from 'config';
import { Response } from 'express';

export default (req: any, res: Response, next: Function) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded: string | any = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid ' });
  }
};
