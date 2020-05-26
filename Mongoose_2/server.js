const mongoose = require('mongoose')
mongoose.Promise  = global.Promise
mongoose.connect('mongodb://localhost/test', {useMongoCLient : true})

const Post = mongoose.model('Post',
  {name : String,
    url : String,
    text : String,
    // comments : [{type : mongoose.Schema.Types.ObjectId , ref : 'Comment'}]
  }
)
const Comment = mongoose.model('Comment' ,{
  type : String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }

})



var post = new Post({
  name: 'Top 10 ES6 Features every Web Developer must know',
  url: 'https://webapplog.com/es6',
  text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
})
post.save((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Post is saved: ', post.toJSON())
  }
  let i = 0
  let ca = [{text: 'Cruel…..var { house, mouse} = No type optimization at all'},
    {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
    {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}
  ].forEach((comment, index, list) => {
    comment.post = post._id
    const c = new Comment(comment)
    c.save((error, result)=>{
      if (error) return console.error(error)
      i++
      if (i==list.length) {
       queryCommentWithPost()
      }
    })
  })
})
  // Populate
  const queryCommentWithPost = () => {
     // Populate
     Comment
     .findOne({ text: /Cruel/i })
     .populate('post')
     .exec(function (err, comment) {
       if (err) return console.error(err)
       console.log(`The comment is ${comment}`)
       mongoose.disconnect()
     })
  }
