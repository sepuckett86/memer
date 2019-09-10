/* eslint-disable no-console */

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

