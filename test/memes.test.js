require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const client = require('../lib/utils/client');
const child_process = require('child_process');

describe('app routes', () => {
  beforeEach(() => {
    child_process.execSync('npm run recreate-tables');
  });

  afterAll(() => {
    client.end();
  });

  const TEST_MEME = {
    top: 'One does not simply',
    image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
    bottom: 'Learn postgres'
  };

  const createMeme = (meme = TEST_MEME) => request(app)
    .post('/api/v1/memes')
    .expect(200)
    .send(meme);

  const testMeme = meme => {
    expect(meme).toEqual({
      id: expect.any(Number),
      top: 'One does not simply',
      image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
      bottom: 'Learn postgres'
    });
  };

  it('creates a meme', () => {
    return createMeme()
      .then(({ body }) => {
        testMeme(body);
      });
  });

  it('gets all memes', async() => {
    await createMeme();
    await createMeme();

    return request(app)
      .get('/api/v1/memes')
      .then(({ body }) => {
        testMeme(body[0]);
        expect(body).toEqual(expect.any(Array));
      });
  });
});
