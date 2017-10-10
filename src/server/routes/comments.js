const router = require('express').Router( { mergeParams: true } );
// const Posts = require('../../models/posts');
// const Users = require('../../models/users');
// const Cities = require('../../models/cities');
const Comments = require('../../models/comments');
const { isAuthorized } = require('../middlewares');


//Function might be ok but view not done
router.put('/:postId/comments/:commentId', (request, response) => {
  console.log('postId:::', request.params.postId);
  const id = request.params.commentId;
  const newComment = request.body.comment;
  Comments.getById(id)
  .then(comment => {
    if(request.session.user.id !== comment.user_id) {
      response.status(403);
      response.render('not-authorized', {warning: 'You can only edit your own comments.'});
    } else {
      Comments.update(id, newComment)
      .then(() => {
        response.redirect(`/posts/${comment.post_id}`); //can also access through nested params
      });
    }
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

module.exports = router;
