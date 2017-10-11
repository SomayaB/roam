const router = require('express').Router( { mergeParams: true } );
const Comments = require('../../models/comments');
const { isAuthorized } = require('../middlewares');


//Function might be ok but view not done
router.put('/:postId/comments/:commentId', isAuthorized, (request, response) => {
  const id = request.params.commentId;
  const newComment = request.body.comment;
  const postId = request.params.postId;
  Comments.getById(id)
  .then(comment => {
    if(request.session.user.id !== comment.user_id) {
      response.status(403);
      response.render('not-authorized', {postId, warning: 'You can only edit your own comments.'});
    } else {
      Comments.update(id, newComment)
      .then(() => {
        response.redirect(`/posts/${postId}`);
      })
      .catch(error => {
        console.error(error.message);
        throw error;
      });
    }
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

router.delete('/:postId/comments/:commentId', isAuthorized, (request, response) => {
  const commentId = request.params.commentId;
  const id = request.params.postId;
  Comments.getById(commentId)
  .then(comment => {
    if(request.session.user.id !== comment.user_id) {
      response.status(403);
      response.render('not-authorized', {id, warning: 'You can only edit your own comments.'});
    } else {
      Comments.deleteById(commentId)
      .then(() => {
        response.redirect(`/posts/${id}`);
      })
      .catch(error => {
        console.error(error.message);
        throw error;
      });
    }
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

module.exports = router;
