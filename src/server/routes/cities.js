const router = require('express').Router();
const Cities = require('../../models/cities');
const Posts = require('../../models/posts');
const relativeDate = require('relative-date');

router.get('/', (request, response) => {
  Cities.getAll()
  .then(cities => {
    response.render('cities/index', {cities, warning: request.flash('error')});
  })
  .catch(error => {
    response.status(500).render('error', {error});
  });
});

router.get('/:city', (request, response) => {
  const city = request.params.city;
  Cities.findByName(city)
  .then(city => {
    return Posts.getAllPostInfoByCityId(city.id)
    .then(posts => {
      if(posts.length === 0) {
        response.render('cities/show', {city, posts});
      } else {
      response.render('cities/show', { city, posts, relativeDate, warning: request.flash('error')});
      }
    })
    .catch(error => {
      response.status(500).render('error', {error});
    });
  });
});

module.exports = router;
