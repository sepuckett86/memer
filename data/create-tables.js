const client = require('../lib/utils/client');

client.query(`
  CREATE TABLE memes (
    id SERIAL PRIMARY KEY,
    top VARCHAR(256) NOT NULL,
    image VARCHAR(256) NOT NULL,
    bottom VARCHAR(256) NOT NULL
  );
`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });
