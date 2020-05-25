const express = require('express')
const app = express()
const port = 3000
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(errorhandler())
app.use(logger('dev'))


app.get('/', (req, res) => res.send('Hello World!'))



//


let store = {
  posts: [
    {name: '',
     url: '',
    text: '',
    comments: ['' , '' , ''   ]
    }
  ]
}
//
// //
const posts = require('./routes/posts')
const comments = require('./routes/comments')
//
app.use((req, resp, next) => {
  req.store = store
  next()
})
//
//posts
app.get('/posts', (req,res) => {
    // res.send("hey")
    posts.getPosts(req,res)
})
app.post('/posts', (req,res) => {
    posts.postPosts(req,res)
})
app.put('/posts/:postId', (req,res) => {
    posts.putPosts(req,res)
})
app.delete('/posts/:postId', (req,res) => {
    posts.deletePosts(req,res)
})

//comments

app.get('/posts/:postId/comments', (req,res) => {
    comments.getComments(req,res)
});
app.post('/posts/:postId/comments', (req,res) => {
    comments.postComments(req,res)
});
app.put('/posts/:postId/comments/:commentId', (req,res) => {
    comments.putComments(req,res)
});
app.delete('/posts/:postId/comments/:commentId', (req,res) => {
    comments.deleteComments(req,res)
});

//
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports.store = store;
