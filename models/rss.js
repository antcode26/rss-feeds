const mongoose = require('mongoose');

const rssSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    link:{
        type: String,
    },
    pubate:{
        type: String,
    },
    author:{
        type: String,
    },
    content:{
        type: String,
    },
    contentSnippet:{
        type: String,
    },
    id:{
        type: String,
    },
    isoDate:{
        type: String,
    }
});
module.exports = mongoose.model('record', rssSchema);