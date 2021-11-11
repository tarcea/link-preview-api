import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import{ promisify } from 'util';

dotenv.config();
const key = process.env.LINK_PREWIEW_KEY;
const url = 'https://api.linkpreview.net';

// const readFile = promisify(fs.readFile);
// let dbData = '[]';

// const readDb = async () => {
//   dbData = await readFile('./server/db/bookmarks.json', 'utf8');
// };
// readDb().then(() => console.log(dbData))


const dbData = fs.readFileSync('./server/db/bookmarks.json', 'utf8');
const bookmarks = JSON.parse(dbData).reverse();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const getBookmark = async (req, res, next) => {
  let bookmark;
  try {
    const bookmark = await bookmarks.find(b => b.id === Number(req.params.id));
    if (bookmark === undefined) {
      res.status(404).json({ message: 'Cannot find bookmark' });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
  res.locals.bookmark = bookmark;
  next();
};

app.get('/api/bookmarks', (req, res) => {
    res.json(bookmarks)
});

app.get('/api/bookmarks/:id', getBookmark, async (req, res, next) => {
  try {
    const bookmark = await res.locals.bookmark;
    res.status(200).json(bookmark);
  } catch (err){
    console.log(err.message)
    next(err);
  }
});

app.post('/api/bookmarks', async (req, res) => {
  try {
    const { query } = req.body;
    const result = await axios.post(
      url,
      {
        q: query,
        key: key
      }
    );
    const data = {...result.data, id: Date.now()};
    const fullData = [...JSON.parse(dbData), data]
    fs.writeFileSync('./server/db/bookmarks.json', JSON.stringify(fullData))
    res.json(data)
  } catch (err) {
    console.log(err.message)
  }
});

app.delete('/api/bookmarks/:id', getBookmark, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await bookmarks.filter(p => p.id !== Number(id));
    fs.writeFileSync('./server/db/bookmarks.json', JSON.stringify(result.reverse()))
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
});


app.listen(3001, console.log('listening on port 3001'))