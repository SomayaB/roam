const router = require('express').Router();
const Posts = require('../../models/posts');
const Users = require('../../models/users');
const Cities = require('../../models/cities');
const Comments = require('../../models/comments');
const { isAuthorized } = require('../middlewares');

router.get('/new', isAuthorized, (request, response) => {
  response.render('posts/new', {warning: request.flash('error')});
});

router.get('/:id', (request, response) => {
  const id = request.params.id;
  Posts.getById(id)
  .then(post => {
    Users.findById(post.user_id)
    .then(user => {
      Comments.getAllCommentsInfoByPostId(post.id)
      .then(comments => {
        response.render('posts/show', {user, post, comments, warning: request.flash('error')});
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
    const previousPage = request.headers.referer;
    if (title.length === 0 && content.length === 0) {
      request.flash('error', 'You must enter a title and the content of your post cannot be empty.');
      response.redirect(`${previousPage}`);
    } else if (content.length === 0) {
      request.flash('error', 'The content of your post cannot be empty.');
      response.redirect(`${previousPage}`);
    } else if (title.length === 0) {
      request.flash('error', 'You must enter a title.');
      response.redirect(`${previousPage}`);
    } else {
      Cities.findByName(city)
      .then(city => {
        const postInfo = {
          title,
          content,
          userId,
          cityId: city.id
        };
        return Posts.create(postInfo)
        .then(post => {
          response.redirect(`/posts/${post[0].id}`);
        });
      })
      .catch(error => {
        console.error('error:::', error.stack);
        response.send('failed');
      });
    }
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
  const previousPage = request.headers.referer;
  Posts.getById(id)
  .then(post => {
    if (request.session.user.id !== post.user_id) {
      response.status(403);
      request.flash('error', 'You can only edit your own posts.');
      response.redirect(`${previousPage}`);
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
  const previousPage = request.headers.referer;
  Posts.getById(id)
  .then(post => {
    if (request.session.user.id !== post.user_id) {
      response.status(403);
      request.flash('error', 'You can only delete your own posts.');
      response.redirect(`${previousPage}`);
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
