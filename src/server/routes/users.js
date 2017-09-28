const router = require('express').Router();
const Users = require('../../models/users');
const Posts = require('../../models/posts');


router.get('/:id', (request, response) => {
  const id = request.params.id;
  Users.findById(id)
  .then(user => {
    Posts.getByUserId(user.id)
    .then(posts => {
      const humanReadableDate = user.date_joined.toDateString();
      response.render('users/show', {user, posts, humanReadableDate});
    });
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

router.put('/:id', (request, response) => {
  const id = request.params.id;
  const currentCity = request.body.currentCity;
  const name = request.body.name;
  Users.updateProfile(name, currentCity, id)
  .then(() => {
    response.redirect(`/users/${id}`);
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});


module.exports = router;
