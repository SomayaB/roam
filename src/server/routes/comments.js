const router = require('express').Router( { mergeParams: true } );
const Comments = require('../../models/comments');
const { isAuthorized } = require('../middlewares');
const { renderError } = require('../utils');


router.put('/:postId/comments/:commentId', isAuthorized, (request, response) => {
  const id = request.params.commentId;
  const newComment = request.body.comment;
  const postId = request.params.postId;
  const previousPage = request.headers.referer;
  Comments.getById(id)
  .then(comment => {
    if(request.session.user.id !== comment.user_id) {
      response.status(403);
      request.flash('error', 'You can only edit your own comments.');
      response.redirect(`${previousPage}`);
    } else {
      return Comments.update(id, newComment)
      .then(() => {
        response.redirect(`/posts/${postId}`);
      });
    }
  })
  .catch(error => {
    renderError(request, response, error);
  });
});

router.delete('/:postId/comments/:commentId', isAuthorized, (request, response) => {
  const commentId = request.params.commentId;
  const id = request.params.postId;
  const previousPage = request.headers.referer;
  Comments.getById(commentId)
  .then(comment => {
    if(request.session.user.id !== comment.user_id) {
      response.status(403);
      request.flash('error', 'You can only delete your own comments.');
      response.redirect(`${previousPage}`);
    } else {
      return Comments.deleteById(commentId)
      .then(() => {
        response.redirect(`/posts/${id}`);
      });
    }
  })
  .catch(error => {
    renderError(request, response, error);
  });
});

module.exports = router;
