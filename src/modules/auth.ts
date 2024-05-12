import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

interface User {
  id: string;
  username: string;
}

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 7);
}

export const createJWT = (user: User) => {
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
  return token;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'invalid token' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next();
  } catch (e) {
    res.status(401);
    res.json({ message: 'invalid token' })
    return;
  }
}
