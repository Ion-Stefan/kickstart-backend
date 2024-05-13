import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'
import { Request, Response, NextFunction } from 'express';

export const registerAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: 'username and password are required' });
    }

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
      }
    })

    const token = createJWT(user)
    res.json({ token })

  } catch (error) {
    error.type = 'server'
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      }
    })

    if (!user) {
      return res.status(401).json({ message: 'user not found' });
    }

    const isValid = await comparePasswords(req.body.password, user.password)
    if (!isValid) {
      res.status(401).json({message: 'wrong password'})
      return
    }

    const token = createJWT(user)
    res.json({ token })

  } catch (error) {
    error.type = 'server';
    next(error);
  }
}
