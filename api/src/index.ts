import express from 'express';
import loggerMiddleware from './middleware/logger.middleware';
import UserController from './routes/user/user.controller';
import PostController from './routes/post/post.controller';
import AuthController from './routes/auth/auth.controller';

const app = express();
const port = 8000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World !');
});

app.use(loggerMiddleware)
app.use("/auth", AuthController)
app.use("/user", UserController)
app.use("/post", PostController)

app.listen(port, () => {
  console.log(`Auth Blog listening on port ${port}`);
});