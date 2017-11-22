const router = require('express').Router();
const Users = require('../../models/users');
const Posts = require('../../models/posts');
const Comments = require('../../models/comments');
const { renderError } = require('../utils');

router.get('/:id', (request, response) => {
  const id = request.params.id;
  Users.findById(id)
  .then(user => {
    return Comments.numberOfCommentsLeft(user.id)
    .then(result => {
      const numberOfCommentsLeft = result.count;
      return Posts.getPostInfoByUserId(user.id)
      .then(posts => {
        const humanReadableDate = user.date_joined.toDateString();
        response.render('users/show', {user, posts, numberOfCommentsLeft, humanReadableDate});
      });
    });
  })
  .catch(error => {
    renderError(request, response, error);
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
    renderError(request, response, error);
  });
});

router.put('/:id/newProfilePicture', (request, response) => {
  const id = request.params.id;
  const newProfilePicture = request.body.image;

  Users.updatePicture(id, newProfilePicture)
  .then(user => {
    response.json({image: user.image_url});
  })
  .catch(error => {
    renderError(request, response, error);
  });
});


module.exports = router;
