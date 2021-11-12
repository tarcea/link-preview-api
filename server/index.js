import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import{ promisify } from 'util';

dotenv.config();
const key = process.env.LINK_PREWIEW_KEY;
const url = 'https://api.linkpreview.net';

const readFile = promisify(fs.readFile);

const readDb = async () => {
  const result = await readFile('./server/db/bookmarks.json', 'utf8');
  return result;
};

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const getBookmarks = async (req, res, next) => {
  const dbData = await readDb();
  let bookmarks;
  try {
    bookmarks = JSON.parse(dbData).reverse();
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
  res.locals.bookmarks = bookmarks;
  next();
}

const getBookmark = async (req, res, next) => {
  let bookmark;
  const dbData = await readDb();
  const bookmarks = JSON.parse(dbData).reverse();
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

const getBookmarksBySearch = async (req, res, next) => {
  let searchResult;
  const dbData = await readDb();
  const bookmarks = JSON.parse(dbData).reverse();
  try {
    const { searchTerm } = req.body;
    searchResult = await bookmarks.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
  res.locals.searchResult = searchResult;
  next();
};

app.get('/api/bookmarks', getBookmarks, async (req, res) => {
  const bookmarks = await res.locals.bookmarks;
    res.json(bookmarks)
});

app.get('/api/bookmarks/:id', getBookmark, async (req, res, next) => {
  try {
    const bookmark = await res.locals.bookmark;
    res.status(200).json(bookmark);
  } catch (err){
    console.log(err.message);
    next(err);
  }
});

app.post('/api/bookmarks', async (req, res, next) => {
  const dbData = await readDb();
  try {
    const { query } = req.body;
    const postData = { q: query, key}
    const result = await axios.post(url, postData);
    const data = {...result.data, id: Date.now()};
    const fullData = [...JSON.parse(dbData), data]
    fs.writeFileSync('./server/db/bookmarks.json', JSON.stringify(fullData))
    res.json(data)
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

app.post('/api/bookmarks/search', getBookmarksBySearch, async (req, res, next) => {
  try {
    const searchResult = await res.locals.searchResult;
    res.status(200).json(searchResult);
  } catch (err){
    console.log(err.message);
    next(err);
  }
});

app.delete('/api/bookmarks/:id', getBookmarks, getBookmark, async (req, res, next) => {
  try {
    const bookmarks = await res.locals.bookmarks;
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