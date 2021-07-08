/* eslint-disable no-unused-vars */
import express from 'express';
import multer from 'multer';
import * as fileSystem from './fileDb.js';
import * as compare from './comparing.js';

const app = express();
app.use(express.static('client'));

const config = {
  dest: './upload',
  limits: {
    fields: 10,
    fileSize: 104800,
    files: 1,
  },
};

const configMulter = multer(config);
const single = configMulter.single('fileID');

async function getContent(req, res) {
  res.json(await fileSystem.listContent());
}


async function upload(req, res) {
  const response = {
    name: req.file.originalname,
    path: req.file.path,
  };
  const filePaths = await fileSystem.returnPaths();
  if (filePaths.length === 0) {
    const messages = await fileSystem.addContent([req.file.originalname, req.file.path, '0%', '']);
    res.json(messages);
  } else {
    const similarity = await compare.compare(req.file.path);
    const messages = await fileSystem.addContent([req.file.originalname, req.file.path, similarity[0], similarity[1]]);
    res.json(messages);
  }
}

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}


app.use(express.json());
app.get('/content', asyncWrap(getContent));
app.post('/upload', single, asyncWrap(upload));
app.listen(8080, () => { console.log('Listening on 8080'); });
