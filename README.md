# Kickstart Backend with Node.js, Express, Prisma, and PostgreSQL.

### Setup
1 - **Clone the repository**:
 ```bash
 git clone https://github.com/Ion-Stefan/kickstart-backend.git
 ```
2 - **Install dependencies**:
```bash
cd kickstart-backend
npm install
```
2.5 - **Create postgresql db**:

I'm using [Render](https://render.com). They have a good free plan to start with.

3 - **Set up environment variables**:
Fill in the necessary environment variables such as database connection URL and JWT secret.
If you're using render like I mentioned in the previous step, use the `External Database URL` for `DATABASE_URL` inside the `.env` file.

4 - **Apply prisma schema in db**:
```bash
npx prisma db push
npx prisma studio
```

5 - **Check the database schema**:

Go to [localhost:5555](http://localhost:5555) and check to see if the models are present in your database.

6 - **Start the server**:
```bash
npm run dev
```
