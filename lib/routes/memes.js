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
      .then(result => res.send(result.rows))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    client.query(`
      SELECT id, top, image, bottom
      FROM memes
      WHERE id = $1;
    `, [id])
      .then(result => res.send(result.rows[0]))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { top, image, bottom } = req.body;
    client.query(`
    UPDATE memes 
    SET top = $1,
        image = $2,
        bottom = $3
    WHERE id = $4
    RETURNING 
      id, top, image, bottom;
    `, [top, image, bottom, id])
      .then(result => res.send(result.rows[0]))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    const id = req.params.id;
    client.query(`
      DELETE FROM memes 
      WHERE id = $1
      RETURNING 
        id, top, image, bottom;
    `,
    [id]
    )
      .then(result => res.send(result.rows[0]))
      .catch(next);
  });

