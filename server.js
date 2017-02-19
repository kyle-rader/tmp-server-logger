import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import moment from 'moment';

const jstring = (obj) => JSON.stringify(obj, null, 2);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/register', (req, res) => {
  let data = `Request:
original_url:
${req.originalUrl}

query:
${jstring(req.query)}

body:
${jstring(req.body)}
`;


  const filename = `request_${moment.now()}.txt`;
  fs.writeFile(filename, data, (err) => {
    if (err) { console.log(err) }
  });

  res.status(200);
  return res.end();

});

app.use('*', (req, res) => {
  return res.status(400).json({ error: `Unknown route on server "${req.originalUrl}"`});
});

const server = app.listen(PORT)
