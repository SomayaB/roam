const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const posts = require('./posts');
const cities = require('./cities');
const { isLoggedIn, isAuthorized, setDefaultReponseLocals } = require('../middlewares');

router.use(setDefaultReponseLocals);

router.get('/', (request, response) => {
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`/users/${id}`);
  } else {
  response.render('index');
  }
});


router.use('/', auth);
router.use(isLoggedIn);
router.use('/users', users);
router.use('/cities', cities);
router.use('/posts', posts);







module.exports = router;
