const router = require('express').Router();
const Posts = require('../../models/posts');
const Users = require('../../models/users');
const Cities = require('../../models/cities');

router.get('/new', (request, response) => {
  response.render('posts/new');
});


router.post('/', (request, response) => {
  const title = request.body.title;
  const content = request.body.content;
  const userId = request.session.user.id;
  const city = (request.body.city).toLowerCase();
  Cities.findByName(city)
  .then(city => {
    const postInfo = {
      title,
      content,
      userId,
      cityId: city.id
    };
    Posts.create(postInfo)
    .then(post => {
      response.redirect(`/posts/${post[0].id}`);
    })
    .catch(error => {
      console.error(error.message);
      throw error;
    });
  });
});


router.get('/:id', (request, response) => {
  const id = request.params.id;
  Posts.getById(id)
  .then(post => {
    Users.findById(post.user_id)
    .then(user => {
      response.render('posts/show', {user, post});
    })
    .catch(error => {
      console.error(error.message);
      throw error;
    });
  });
});

module.exports = router;
