import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors'
import { protect } from './modules/auth';
import { login, registerAccount } from './handlers/user';
import { body } from 'express-validator';
import handleInputErrors from './modules/middleware';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Routers
app.use('/api', protect, router);
//User
app.post('/register', body('username').isLength({ min: 5, max: 255 }), body('password').isLength({ min: 8, max: 255 }), handleInputErrors, registerAccount);
app.post('/login', login);

//Error handler
app.use((err, res) => {
  if (err.type === 'server') {
    res.status(500).json({ message: 'oops, server crashed' });
  }
  else {
    res.status(500).json({ message: 'oops, something went wrong' })
  }
})

export default app;
