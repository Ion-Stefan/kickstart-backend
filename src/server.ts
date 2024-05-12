import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors'
import { protect } from './modules/auth';
import { login, registerAccount } from './handlers/user';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Routers
app.use('/api', protect, router);
//User
app.post('/register', registerAccount);
app.post('/login', login);

export default app;
