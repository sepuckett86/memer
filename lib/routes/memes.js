const { Router } = require('express');
const client = require('../utils/client');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      top,
      image,
      bottom
    } = req.body;

    client.query(`
      INSERT INTO memes (top, image, bottom)
      VALUES ($1, $2, $3)
      RETURNING 
        id, top, image, bottom;
    `,
    [top, image, bottom]
    )
      .then(result => res.send(result.rows[0]))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    client.query(`
      SELECT id, top, image, bottom
      FROM memes;
    `)
      .then(result => {
        res.send(result.rows);
      })
      .catch(next);
  });
// .patch('/:id', (req, res, next) => {
//   const {
//     top,
//     bottom
//   } = req.body;

//   Meme
//     .findByIdAndUpdate(req.params.id, { top, bottom }, { new: true })
//     .then(meme => res.send(meme))
//     .catch(next);
// })
// .delete('/:id', (req, res, next) => {
//   Meme
//     .findByIdAndDelete(req.params.id)
//     .then(meme => res.send(meme))
//     .catch(next);
// });

