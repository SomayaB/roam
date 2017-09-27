const router = require('express').Router();
const Posts = require('../../models/posts');

router.get('/:id', (request, response) => {
  const id = request.params.id;
  Posts.getById(id)
  .then(post => {
    console.log(post);
    Posts.getAuthor(post.user_id)
    .then(name => {
      const author = name.name;
      response.render("posts/show", {post, author});
    });
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

module.exports = router;
