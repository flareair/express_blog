var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*

    Article Shema

*/
var articleSchema = new Schema({
  title: {type: String, trim: true},
  content: {type: String, trim: true}
});


// custom error messages
articleSchema.path('title').required(true, 'Article title cannot be blank');
articleSchema.path('content').required(true, 'Article body cannot be blank');

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;