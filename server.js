const dotenv = require('dotenv');
const connect = require('./lib/utils/connect');

dotenv.config();
connect();

const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
