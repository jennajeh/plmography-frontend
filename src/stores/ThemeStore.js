import { themeApiService } from '../services/ThemeApiService';
import Store from './Store';

export default class ThemeStore extends Store {
  constructor() {
    super();

    this.themes = [];
    this.hit = 0;
    this.totalPages = 0;
    this.updateHitStatus = '';
    this.isThemesLoading = false;
  }

  reset() {
    this.themes = [];
    this.hit = 0;
    this.totalPages = 0;
    this.updateHitStatus = '';
    this.isThemesLoading = false;
  }

  async fetchThemes({ page, size }) {
    this.startThemesLoad();

    try {
      const { themes, pages } = await themeApiService.fetchThemes({ page, size });

      this.totalPages = pages.totalPages;

      this.completeThemesLoad(themes);
    } catch (e) {
      this.failThemesLoad();
    }
  }

  async fetchHitThemes() {
    this.startThemesLoad();

    try {
      const { themes } = await themeApiService.fetchHitThemes();

      this.completeThemesLoad(themes);
    } catch (e) {
      this.failThemesLoad();
    }
  }

  async updateHit(themeId) {
    this.startUpdateHit();

    try {
      await themeApiService.updateHit(themeId);

      this.hit += 1;

      this.completeUpdateHit();

      this.publish();
    } catch (e) {
      this.failUpdateHit();

      this.publish();
    }
  }

  startThemesLoad() {
    this.isThemesLoading = true;
    this.themes = [];

    this.publish();
  }

  completeThemesLoad(themes) {
    this.isThemesLoading = false;
    this.themes = themes;

    this.publish();
  }

  failThemesLoad() {
    this.isThemesLoading = false;
    this.themes = [];

    this.publish();
  }

  startUpdateHit() {
    this.updateHitStatus = 'processing';
  }

  completeUpdateHit() {
    this.updateHitStatus = 'successful';
  }

  failUpdateHit() {
    this.updateHitStatus = 'failed';
  }

  get isUpdateHitSuccessful() {
    return this.updateHitStatus === 'successful';
  }

  get isUpdateHitFailed() {
    return this.updateHitStatus === 'failed';
  }
}

export const themeStore = new ThemeStore();
