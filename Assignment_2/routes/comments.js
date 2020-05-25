const server = require('../server')

exports.getComments = (req, res) => {
    res.type('application/json')
    res.send(req.store.posts[req.params.postId].comments)
    res.end();
};

exports.postComments = (req, res) => {
    req.store.posts[req.params.postId].comments.push(req.body)
    res.end();
};

exports.putComments = (req, res) => {
    req.store.posts[req.params.postId].comments[req.params.commentId] = req.body
    res.end();
};

exports.deleteComments = (req, res) => {

  req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
    res.end();
};
