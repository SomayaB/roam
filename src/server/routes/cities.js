const router = require('express').Router();
const Cities = require('../../models/cities');
const Posts = require('../../models/posts');
const relativeDate = require('relative-date');

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
      const date = relativeDate(posts[0].date_posted);
      console.log('date:::', date);
      response.render('cities/show', { city, posts, date });
    })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
  });
});

module.exports = router;
