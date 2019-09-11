require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

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
      .post('/api/v1/memes')
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

  it('gets all memes', async() => {
    const meme = await Meme.create({
      top: 'One does not simply',
      image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
      bottom: 'Write memes'
    });

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual([memeJSON]);
      });
  });

  it('gets meme by id', async() => {
    const meme = await Meme.create({
      top: 'One does not simply',
      image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
      bottom: 'Write memes'
    });

    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual(memeJSON);
      });
  });

  it('updates a meme', async() => {
    const meme = await Meme.create({
      top: 'One does not simply',
      image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
      bottom: 'Write memes'
    });

    const update = { 
      top: 'Update',
      bottom: 'The Meme'
    };

    return request(app)
      .patch(`/api/v1/memes/${meme._id}`)
      .send(update)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'Update',
          image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
          bottom: 'The Meme',
          __v : 0
        });
      });
  });

  it('deletes a meme', async() => {
    const meme = await Meme.create({
      top: 'One does not simply',
      image: 'https://imgflip.com/s/meme/One-Does-Not-Simply.jpg',
      bottom: 'Write memes'
    });

    return request(app)
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body).toEqual(memeJSON);
      });
  });
});

