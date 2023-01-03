/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const {
      email, nickname, password,
    } = await req.json();

    if (email === 'jenna@gmail.com'
    && nickname === '전제나'
    && password === 'Test123!') {
      return res(
        ctx.json({
          id: 1,
          email: 'jenna@gmail.com',
          nickname: '전제나',
        }),
      );
    }

    return res(ctx.status(400));
  }),

  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const {
      email, password,
    } = await req.json();

    if (email === 'jenna@gmail.com'
    && password === 'Test123!') {
      return res(
        ctx.json({
          accessToken: 'ACCESS.TOKEN',
        }),
      );
    }

    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/users/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    nickname: '전제나',
    gender: '여성',
    birthYear: 1994,
    profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
  }))),

  rest.patch(`${baseUrl}/users/1`, async (req, res, ctx) => {
    const {
      password, nickname, profileImage,
    } = await req.json();

    if (password === 'Asdf123!'
    && nickname === '강보니'
    && profileImage === 'https://source.boringavatars.com/beam/120/nickname=bboni') {
      return res(
        ctx.json({
          id: 1,
          nickname: '강보니',
          profileImage: 'https://source.boringavatars.com/beam/120/nickname=bboni',
        }),
      );
    }

    return res(ctx.status(400));
  }),

);

export default server;
