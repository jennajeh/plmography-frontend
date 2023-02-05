import {
  cleanup,
  render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { articleStore } from '../../stores/ArticleStore';
import defaultTheme from '../../styles/defaultTheme';
import ArticleList from './ArticleList';

let articles;
const context = describe;

describe('ArticleList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  function renderArticleList() {
    render(
      <MemoryRouter>
        <ThemeProvider theme={defaultTheme}>
          <ArticleList />
        </ThemeProvider>
      </MemoryRouter>,
    );
  }

  context('포스팅이 존재하지 않을 때', () => {
    beforeEach(() => {
      articles = [];
    });

    it('포스팅이 존재하지 않습니다 메세지 반환', async () => async (act) => {
      renderArticleList();

      await waitFor(() => {
        screen.getByText(/포스팅이 존재하지 않습니다/);
      });
    });
  });

  context('포스팅이 존재할 때', () => {
    beforeEach(() => {
      articleStore.fetchArticles({ page: 1, size: 5 });

      articles = [
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
      ];
    });

    it('포스팅 목록 반환', async () => async (act) => {
      renderArticleList();

      await waitFor(() => {
        screen.getByText('아바타: 물의 길');
        screen.getByText('해리포터와 마법사의 돌');
      });
    });
  });
});
