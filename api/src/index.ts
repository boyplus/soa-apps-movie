import 'reflect-metadata';
import app from './app';
import serverConnector from './database';

serverConnector();

const port = 5050;

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at  http://localhost:${port}`);
});
