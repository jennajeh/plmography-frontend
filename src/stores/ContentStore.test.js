import ContentStore from './ContentStore';

const context = describe;

describe('UserStore', () => {
  let contentStore;

  beforeEach(() => {
    contentStore = new ContentStore();
  });

  describe('컨텐츠 조회', () => {
    context('컨텐츠 목록 조회시', () => {
      it('컨텐츠 리스트가 보인다', async () => {
        await contentStore.fetchContents({
          page: 1,
          size: 8,
          filter: {},
        });

        expect(contentStore.contents[0].korTitle).toBe('아리스 인 보더랜드');
        expect(contentStore.totalPages).toBe(50);
      });
    });

    context('특정 컨텐츠 클릭시', () => {
      it('컨텐츠 상세 정보가 보인다', async () => {
        await contentStore.fetchContent(2);

        expect(contentStore.content.korTitle).toBe('겨울 라이프');
        expect(contentStore.content.description).toBe('추운 겨울 나기 프로젝트');
      });
    });
  });

  describe('fetchTopRatedContents', () => {
    it('TopRated 된 컨텐츠 목록을 출력한다', async () => {
      await contentStore.fetchTopRatedContents();

      expect(contentStore.contents).toBeTruthy();
      expect(contentStore.contents[0].korTitle).toBe('장화신은 고양이: 끝내주는 모험');
      expect(contentStore.contents[1].korTitle).toBe('겨울 라이프');
    });
  });

  describe('fetchThemeContents', () => {
    it('특정 테마의 컨텐츠 목록을 출력한다', async () => {
      await contentStore.fetchThemeContents({
        themeId: 1,
        page: 1,
        size: 8,
        filter: {
          platformData: 'netfilx',
        },
      });

      expect(contentStore.contents).toBeTruthy();
      expect(contentStore.contents[0].korTitle).toBe('장화신은 고양이: 끝내주는 모험');
      expect(contentStore.contents[1].korTitle).toBe('겨울 라이프');
    });
  });

  describe('fetchFavoriteContents', () => {
    it('인생 작품 목록을 출력한다', async () => {
      const userId = 1;
      const favoriteContentId = 1;

      await contentStore.fetchFavoriteContents(userId, favoriteContentId);

      expect(contentStore.favoriteContents).toBeTruthy();
      expect(contentStore.favoriteContents[0].korTitle).toBe('아바타: 물의 길');
      expect(contentStore.favoriteContents[1].korTitle).toBe('장화신은 고양이');
    });
  });

  describe('fetchWatchedContents', () => {
    it('봤어요 목록을 출력한다', async () => {
      const userId = 1;
      const watchedContentId = 1;

      await contentStore.fetchWatchedContents(userId, watchedContentId);

      expect(contentStore.watchedContents).toBeTruthy();
      expect(contentStore.watchedContents[0].korTitle).toBe('아바타: 물의 길');
      expect(contentStore.watchedContents[1].korTitle).toBe('장화신은 고양이');
    });
  });

  describe('fetchWishContents', () => {
    it('찜하기 목록을 출력한다', async () => {
      const userId = 1;
      const wishContentId = 1;

      await contentStore.fetchWishContents(userId, wishContentId);

      expect(contentStore.wishContents).toBeTruthy();
      expect(contentStore.wishContents[0].korTitle).toBe('아바타: 물의 길');
      expect(contentStore.wishContents[1].korTitle).toBe('장화신은 고양이');
    });
  });
});
