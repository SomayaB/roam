const router = require('express').Router();
const Posts = require('../../models/posts');
const Users = require('../../models/users');
const Cities = require('../../models/cities');

router.get('/new', (request, response) => {
  response.render('posts/new');
});


// router.post('posts/:id', (request, response) => {
//   const title = request.body.title;
//   const content = request.body.content;
//   const author =
//   response.render('posts/new', {title, content, author});
// });


router.get('/:id', (request, response) => {
  const id = request.params.id;
  Posts.getById(id)
  .then(post => {
    Users.findById(post.user_id)
    .then(user => {
      response.render('posts/show', {user, post});
    });
  });
});

module.exports = router;
