import ArticleStore from './ArticleStore';

const context = describe;

describe('ReviewEditFormStore', () => {
  let articleStore;

  beforeEach(() => {
    articleStore = new ArticleStore();
  });

  describe('fetchArticles', () => {
    it('포스팅 목록을 출력한다', async () => {
      await articleStore.fetchArticles({ page: 1, size: 5 });

      expect(articleStore.articles[0].title).toBe('아바타: 물의 길');
      expect(articleStore.totalPages).toBe(1);
    });
  });

  describe('fetchArticle', () => {
    it('포스팅 상세 정보를 반환한다', async () => {
      const contentId = 1;

      await articleStore.fetchArticle(contentId);

      expect(articleStore.article).not.toBeNull();
    });
  });
});
