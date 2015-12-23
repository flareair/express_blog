var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var articleShema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
});

var Article = mongoose.model('Article', articleShema);

module.exports = Article;