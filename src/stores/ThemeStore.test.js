import ThemeStore from './ThemeStore';

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

      expect(themeStore.hitThemes).toBeTruthy();
      expect(themeStore.hitThemes[0].title).toBe('꼭 봐야할 미드 TOP 5');
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
