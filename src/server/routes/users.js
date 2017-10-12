const router = require('express').Router();
const Users = require('../../models/users');
const Posts = require('../../models/posts');
const Comments = require('../../models/comments');

router.get('/:id', (request, response) => {
  const id = request.params.id;
  Users.findById(id)
  .then(user => {
    Comments.numberOfCommentsLeft(user.id)
    .then(result => {
      const numberOfCommentsLeft = result.count;
      Posts.getPostInfoByUserId(user.id)
      .then(posts => {
        // console.log('posts::::::', posts);
        // for (let post in posts) {
        //   console.log('key:::', post);
        //   console.log('values::::', posts[post][0]);
        // }
        const humanReadableDate = user.date_joined.toDateString();
        response.render('users/show', {user, posts, numberOfCommentsLeft, humanReadableDate});
      });
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
