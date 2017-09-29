const router = require('express').Router();
const Posts = require('../../models/posts');
const Users = require('../../models/users');
const Cities = require('../../models/cities');

// router.get('/:author/:postTitle', (request, response) => {
//   const author = request.params.author;
//   const postTitle = request.params.postTitle;
//   //search by what?? should it even be title or id?
//   Posts.getPostByTitle(postTitle)
//   .then(post => {
//     console.log('post:::', post);
//     Users.findById(post.user_id)
//     .then(user => {
//       response.render('posts/show', {user, post});
//     });
//   });
// });

router.get('/posts/new', (request, response) => {
  response.render('posts/new');
});

// router.post('posts/new', (request, response) => {
//
// });

module.exports = router;
