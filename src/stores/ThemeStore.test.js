import ThemeStore from './ThemeStore';

const context = describe;

describe('ThemeStore', () => {
  let themeStore;

  beforeEach(() => {
    themeStore = new ThemeStore();
  });

  describe('fetchThemes', () => {
    it('테마 목록을 출력한다', async () => {
      await themeStore.fetchThemes({ page: 1, size: 8 });

      expect(themeStore.themes[0].title).toBe('겨울이면 생각나는 영화');
      expect(themeStore.totalPages).toBe(1);
    });
  });

  describe('fetchHitThemes', () => {
    it('조회수가 가장 높은 상위 3개의 테마를 출력한다', async () => {
      await themeStore.fetchHitThemes();

      expect(themeStore.themes).toBeTruthy();
      expect(themeStore.themes[0].title).toBe('꼭 봐야할 미드 TOP 5');
      expect(themeStore.themes[1].title).toBe('골든 글로브 수상작');
      expect(themeStore.themes[2].title).toBe('제 58회 백상예술대상 후보작');
    });
  });

  describe('updateHit', () => {
    context('조회수 증가에 성공한 경우', () => {
      it('updateHitStatus 가 successful 로 바뀐다', async () => {
        const themeId = 1;

        await themeStore.updateHit(themeId);

        expect(themeStore.isUpdateHitSuccessful).toBeTruthy();
      });
    });

    context('조회수 증가에 실패한 경우', () => {
      it('updateHitStatus 가 failed 로 바뀐다', async () => {
        const themeId = '';

        await themeStore.updateHit(themeId);

        expect(themeStore.isUpdateHitFailed).toBeTruthy();
      });
    });
  });

  describe('reset', () => {
    it('모든 필드를 리셋시킨다', () => {
      themeStore.updateHitStatus = 'successful';
      themeStore.reset();

      expect(themeStore.updateHitStatus).toBeFalsy();
    });
  });
});
