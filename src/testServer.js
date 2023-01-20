/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

// Users
const server = setupServer(
  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const {
      email, nickname, password, gender, birthYear,
    } = await req.json();

    if (email === 'jenna@gmail.com'
    && nickname === '전제나'
    && password === 'Test123!'
    && gender === '여성'
    && birthYear === '1990') {
      return res(
        ctx.json({
          id: 1,
          email: 'jenna@gmail.com',
          nickname: '전제나',
          gender: '여성',
          birthYear: '1990',
        }),
      );
    }

    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/users/checkDuplicate`, async (req, res, ctx) => {
    const countOnly = req.url.searchParams.get('countOnly');
    const email = req.url.searchParams.get('email');
    const nickname = req.url.searchParams.get('nickname');

    if (countOnly && email === 'exist@gmail.com' && nickname === '전제나') {
      return res(ctx.json({
        countEmail: 1, countNickname: 0,
      }));
    }

    if (countOnly && email === 'new@gmail.com' && nickname === 'exist') {
      return res(ctx.json({
        countEmail: 0, countNickname: 1,
      }));
    }

    if (countOnly && email === 'exist@gmail.com' && nickname === 'exist') {
      return res(ctx.json({
        countEmail: 1, countNickname: 1,
      }));
    }

    return res(ctx.json({
      countEmail: 0, countNickname: 0,
    }));
  }),

  rest.get(`${baseUrl}/users/me`, async (req, res, ctx) => res(
    ctx.json({
      accessToken: 'ACCESS.TOKEN',
      email: 'jenna@gmail.com',
      nickname: '전제나',
      gender: '여성',
      birthYear: '1990',
      profileImage: 'https://source.boringavatars.com/beam/120/?nickname=jenna',
    }),
  )),

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

  rest.get(`${baseUrl}/users/profile`, async (req, res, ctx) => {
    const param = req.url.searchParams.get('nickname');

    if (param === 'jenna') {
      return res(ctx.json({
        id: 1,
        nickname: 'jenna',
        profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
      }));
    }

    return res.status(400);
  }),

  rest.patch(`${baseUrl}/users`, async (req, res, ctx) => res(ctx.json({
    nickname: '강보니',
    profileImage: 'image',
  }))),

  rest.get(`${baseUrl}/users`, async (req, res, ctx) => res(ctx.json({
    users: [
      {
        id: 1,
        email: 'jenna@gmail.com',
        nickname: 'jenna',
        gender: '여성',
        birthYear: 1994,
        profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
      },
      {
        id: 2,
        email: 'boni@gmail.com',
        nickname: 'boni',
        gender: '여성',
        birthYear: 1995,
        profileImage: 'https://source.boringavatars.com/beam/120/nickname=boni',
      },
      {
        id: 3,
        email: 'zzezze@gmail.com',
        nickname: 'zzezze',
        gender: '남성',
        birthYear: 1998,
        profileImage: 'https://source.boringavatars.com/beam/120/nickname=zzezze',
      },
    ],
  }))),

  rest.post(`${baseUrl}/users/upload-image`, async (req, res, ctx) => res(ctx.json({
    profileImage: 'image url',
  }))),

  // Contents
  rest.get(`${baseUrl}/contents`, async (req, res, ctx) => res(
    ctx.json({
      contents: [
        {
          id: 1,
          tmdbId: '1',
          tmdbGenreId: '1',
          imageUrl: 'zzezze',
          korTitle: '쩨쩨의 이중생활',
          engTitle: 'zzezze secret',
          releaseDate: '2022',
          popularity: '3000',
          type: 'movie',
          platform: 'netflix',
          description: '언더커버 보스 쩨쩨의 이중생활',
          createdAt: '2022-01-01T17:57:23.929359',
        },
        {
          id: 2,
          tmdbId: '2',
          tmdbGenreId: '2',
          imageUrl: 'winter',
          korTitle: '겨울 라이프',
          engTitle: 'winter life',
          releaseDate: '2022',
          popularity: '2000',
          type: 'drama',
          platform: 'wavve',
          description: '추운 겨울 나기 프로젝트',
          createdAt: '2022-01-02T17:57:23.929359',
        },
      ],

      pages: {
        totalPages: 1,
      },
    }),
  )),

  rest.get(`${baseUrl}/contents/2`, async (req, res, ctx) => res(
    ctx.json({
      id: 2,
      tmdbId: '2',
      tmdbGenreId: '2',
      imageUrl: 'winter',
      korTitle: '겨울 라이프',
      engTitle: 'winter life',
      releaseDate: '2022',
      popularity: '2000',
      type: 'drama',
      platform: 'wavve',
      description: '추운 겨울 나기 프로젝트',
      createdAt: '2022-01-02T17:57:23.929359',
    }),
  )),

  // Reviews
  rest.get(`${baseUrl}/reviews`, async (req, res, ctx) => res(
    ctx.json({
      reviews: [
        {
          id: 1,
          userId: 1,
          contentId: 1,
          starRate: 4,
          reviewBody: '너무 너무 재미있어요!',
          likeUserIds: [],
          deleted: false,
          createdAt: '2022-01-01T17:57:23.929359',
          updatedAt: '2022-01-02T17:57:23.929359',
        },
        {
          id: 2,
          userId: 2,
          contentId: 1,
          starRate: 2,
          reviewBody: '지루함ㅋ',
          likeUserIds: [{ id: 1 }],
          deleted: false,
          createdAt: '2022-01-01T17:57:23.929359',
          updatedAt: '2022-01-02T17:57:23.929359',
        },
      ],

      pages: {
        totalPages: 1,
      },
    }),
  )),

  rest.post(`${baseUrl}/reviews`, async (req, res, ctx) => {
    const {
      starRate, reviewBody,
    } = await req.json();

    if (starRate && reviewBody) {
      return res(ctx.json({
        id: 1,
      }));
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/reviews/me`, async (req, res, ctx) => res(
    ctx.json({
      myReviews: [
        {
          id: 1,
          writer: {
            id: 1,
            nickname: 'jenna',
            profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
          },
          contentId: 1,
          starRate: 4,
          reviewBody: '오랜만에 힐링함',
          likeUserIds: [],
          deleted: false,
          createdAt: '2022-01-01T17:57:23.929359',
          updatedAt: '2022-01-02T17:57:23.929359',
        },
        {
          id: 2,
          writer: {
            id: 1,
            nickname: 'jenna',
            profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
          },
          contentId: 2,
          starRate: 4,
          reviewBody: '나의 인생작!',
          likeUserIds: [],
          deleted: false,
          createdAt: '2022-01-04T17:57:23.929359',
          updatedAt: '2022-01-05T17:57:23.929359',
        },
      ],
    }),
  )),

  rest.patch(`${baseUrl}/reviews/1`, async (req, res, ctx) => {
    const {
      reviewBody,
    } = await req.json();

    if (reviewBody) {
      return res(ctx.json({
        id: 1,
      }));
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.delete(`${baseUrl}/reviews/1`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
    }

    return res();
  }),

  rest.patch(`${baseUrl}/reviews/1/likeUserIds`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        likeUserIds: [{ id: 2 }],
      }),
    );
  }),

  // Comments
  rest.post(`${baseUrl}/comments`, async (req, res, ctx) => {
    const {
      userId, postId, commentBody,
    } = await req.json();

    if (userId && postId && commentBody) {
      return res(ctx.json({
        id: 1,
      }));
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/comments`, async (req, res, ctx) => res(
    ctx.json({
      comments: [
        {
          id: 1,
          writer: {
            id: 1,
            nickname: 'jenna',
            profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
          },
          postId: 1,
          commentBody: '오랜만에 힐링함',
          deleted: false,
          createdAt: '2022-01-01T17:57:23.929359',
          updatedAt: '2022-01-02T17:57:23.929359',
        },
        {
          id: 2,
          writer: {
            id: 2,
            nickname: 'boni',
            profileImage: 'https://source.boringavatars.com/beam/120/nickname=boni',
          },
          postId: 1,
          commentBody: '동의합니다',
          deleted: false,
          createdAt: '2022-01-01T17:57:23.929359',
          updatedAt: '2022-01-02T17:57:23.929359',
        },
      ],
    }),
  )),

  rest.delete(`${baseUrl}/comments/1`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
    }

    return res();
  }),

  // Articles
  rest.get(`${baseUrl}/articles`, async (req, res, ctx) => res(
    ctx.json({
      articles: [
        {
          id: 1,
          writer: {
            id: 1,
            nickname: 'jenna',
            profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
          },
          contentId: 1,
          title: '아바타: 물의 길',
          image: 'poster',
          articleBody: '영상미가 끝내주는 영화',
          createdAt: '2022-01-01T17:57:23.929359',
        },
        {
          id: 2,
          writer: {
            id: 2,
            nickname: 'boni',
            profileImage: 'https://source.boringavatars.com/beam/120/nickname=boni',
          },
          contentId: 2,
          title: '해리포터와 마법사의 돌',
          image: 'poster',
          articleBody: '마법 판타지 영화',
          createdAt: '2022-01-02T17:57:23.929359',
        },
      ],

      pages: {
        totalPages: 1,
      },
    }),
  )),

  rest.get(`${baseUrl}/articles/1`, async (req, res, ctx) => res(
    ctx.json({
      id: 1,
      writer: {
        id: 1,
        nickname: 'jenna',
        profileImage: 'https://source.boringavatars.com/beam/120/nickname=jenna',
      },
      contentId: 1,
      title: '아바타: 물의 길',
      image: 'poster',
      articleBody: '영상미가 끝내주는 영화',
      createdAt: '2022-01-01T17:57:23.929359',
    }),
  )),
);

export default server;
