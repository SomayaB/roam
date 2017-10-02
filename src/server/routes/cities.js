const router = require('express').Router();
const Cities = require('../../models/cities');
const Posts = require('../../models/posts');

router.get('/', (request, response) => {
  Cities.getAll()
  .then(cities => {
    response.render('cities/index', {cities});
  })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

router.get('/:city', (request, response) => {
  const city = request.params.city;
  Cities.findByName(city)
  .then(city => {
    Posts.getAllPostInfoByCityId(city.id)
    .then(posts => {
      response.render('cities/show', { city, posts });
    })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
  });
});

module.exports = router;
