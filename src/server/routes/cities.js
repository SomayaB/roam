const router = require('express').Router();
const Cities = require('../../models/cities');

router.get('/', (request, response) => {
  Cities.getAll()
  .then(cities => {
    response.render('cities/index', {cities});
  });
});

router.get('/:id', (request, response) => {
  const id = request.params.id;
  Cities.findById(id)
  .then(city => {
    Cities.getPostsByCityId(`${city.id}`)
    .then(posts => {
      response.render('cities/show', {city, posts});
      });
    });
});

module.exports = router;
