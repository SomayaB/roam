const router = require('express').Router();
const Posts = require('../../models/posts');
const Users = require('../../models/users');
const Cities = require('../../models/cities');

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


router.get('/new', (request, response) => {
  response.render('posts/new');
});

// router.post('posts/new', (request, response) => {
//
// });

module.exports = router;
