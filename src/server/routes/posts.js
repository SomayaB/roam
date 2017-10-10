const router = require('express').Router();
const Posts = require('../../models/posts');
const Users = require('../../models/users');
const Cities = require('../../models/cities');
const Comments = require('../../models/comments');
const { isAuthorized } = require('../middlewares');

router.get('/new', isAuthorized, (request, response) => {
  response.render('posts/new');
});

router.get('/:id', (request, response) => {
  const id = request.params.id;
  Posts.getById(id)
  .then(post => {
    Users.findById(post.user_id)
    .then(user => {
      Comments.getAllCommentsInfoByPostId(post.id)
      .then(comments => {
        response.render('posts/show', {user, post, comments});
      });
    })
    .catch(error => {
      console.error(error.message);
      throw error;
    });
  });
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
      });
    })
    .catch(error => {
      console.error(error.message);
      throw error;
    });
});

router.post('/:id/comments', (request, response) => {
  const comment = request.body.comment;
  const postId = request.params.id;
  const userId = request.session.user.id;
  const commentInfo = {
    comment,
    postId,
    userId
  };
  Comments.add(commentInfo)
  .then(() => {
    response.redirect(`/posts/${postId}`);
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});


router.put('/:id', isAuthorized, (request, response) => {
  const id = request.params.id;
  const title = request.body.title;
  const content = request.body.content;
  Posts.getById(id)
  .then(post => {
    if (request.session.user.id !== post.user_id) {
      response.status(403);
      response.render('not-authorized', {warning: 'You can only edit your own posts.'});
    } else {
    Posts.update(id, title, content)
    .then(() => {
      response.redirect(`/posts/${id}`);
    });
    }
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});


router.delete('/:id', isAuthorized, (request, response) => {
  const id = request.params.id;
  Posts.getById(id)
  .then(post => {
    if (request.session.user.id !== post.user_id) {
      response.status(403);
      response.render('not-authorized', {warning: 'You can only delete your own posts.'});
    } else {
      Posts.deleteById(id)
      .then(() => {
        const userId = request.session.user.id;
        response.redirect(`/users/${userId}`);
      })
      .catch(error => {
        console.log(error);
      });
    }
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});


module.exports = router;
