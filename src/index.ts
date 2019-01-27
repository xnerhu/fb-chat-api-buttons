import * as bodyParser from 'body-parser';
import * as express from 'express';

import controllers from './controllers';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controllers);

app.listen(3000, () => {
  console.log(`Listening on port ${3000}!`);
});
