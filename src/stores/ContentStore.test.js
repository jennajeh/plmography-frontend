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
          filter: {
            date: 2022, genre: '16', platformData: 'netfilx', type: 'movie', sort: 'createdAt',
          },
        });

        expect(contentStore.contents[0].korTitle).toBe('쩨쩨의 이중생활');
        expect(contentStore.totalPages).toBe(1);
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
});
