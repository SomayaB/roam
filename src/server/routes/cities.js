const router = require('express').Router();
const Cities = require('../../models/cities');

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

router.get('/:id', (request, response) => {
  const id = request.params.id;
  Cities.findById(id)
  .then(city => {
    Cities.getPostsByCityId(`${city.id}`)
    .then(posts => {
      response.render('cities/show', {city, posts});
      });
    })
  .catch(error => {
    console.error(error.message);
    throw error;
  });
});

module.exports = router;
