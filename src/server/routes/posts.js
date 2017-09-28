const router = require('express').Router();
const Posts = require('../../models/posts');
const Users = require('../../models/users');
const Cities = require('../../models/cities');

router.get('/cities/:cityName/:postTitle', (request, response) => {
  const city = request.params.cityName;
  const postTitle = request.params.postTitle;
  //search by what?? should it even be title or id?
  Posts.getPostByTitle(postTitle)
  .then(post => {
    Posts.getNameFromUser(post.user_id)
    .then(user => {
      response.render('posts/show', {user, post});
    });
  });
});

module.exports = router;
