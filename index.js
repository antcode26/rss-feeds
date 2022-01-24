const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require('./DB/Connection');
const records = require('./models/rss');
const FuzzySearch = require('fuzzy-search'); 
let Parser = require('rss-parser');
let parser = new Parser();
app.use(express.json());
connectDB();
//insert feed to db.
app.get('/feed', async (req, res) => {
  try {
    let feed = await parser.parseURL('https://www.reddit.com/.rss');
    let newFeed = feed.items;
    for (let feeds of newFeed) {
      const newRecords = new records({
        title: feeds.title,
        link: feeds.link,
        pubate: feeds.pubDate,
        author: feeds.author,
        content: feeds.content,
        contentSnippet: feeds.contentSnippet,
        id: feeds.id,
        isoDate: feeds.isoDate,
      });
        await newRecords.save();
        console.log('done',newRecords);
    }
    res.send("Inserted to db")
  } catch (err) {
    console.error(err)
  }
});
//fetch feeds on the basis of search keywords.
app.post('/getFeed', async (req, res)=>{
try{
let getData = await records.find({});
//Fetching records on the baiss of title and link, for all the fileds need to pass filed name(s) after 'link'
const searcher = new FuzzySearch(getData, ['title','link'], {
    caseSensitive: true,
  });
const result = searcher.search(req.body.seacrhString);
res.json(result)
}catch(err){
  console.error(err);
}
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app is running on ${port}`))