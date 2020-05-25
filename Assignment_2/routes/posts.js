const server = require('../server')

module.exports = {

  getPosts(req,res) {
    res.send(server.store)
    res.end();
  },

  postPosts(req,res){
    req.store.posts.push(req.body)
    res.sendStatus(201)
    res.end();
  },

  putPosts(req,res){
      const index = req.params.postId;
      if(server.store.length <= index){
        res.send('there is no post with that ID');
        return;
      }
      req.store.posts[req.params.postId] = req.body

      res.send(server.store);
      res.end();
  },

  deletePosts(req,res) {
    const index = req.params.postId;
    if(server.store.length <= index){
      res.send('there is no post with that ID');
      return;
    }
    req.store.posts.splice(req.params.postId, 1)
    res.send(server.store);
    res.end();
}
}
