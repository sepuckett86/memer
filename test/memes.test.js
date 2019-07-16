require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const Meme = require('../lib/models/Meme');

describe('memes routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a new meme', () => {
    return request(app)
      .post('/api/v1/meme')
      .send({
        top: 'One does not simply',
        image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
        bottom: 'Write memes'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'One does not simply',
          image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
          bottom: 'Write memes',
          __v : 0
        });
      });
  });
});

