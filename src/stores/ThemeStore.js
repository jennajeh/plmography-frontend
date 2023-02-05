import { themeApiService } from '../services/ThemeApiService';
import Store from './Store';

export default class ThemeStore extends Store {
  constructor() {
    super();

    this.themes = [];
    this.hitThemes = [];
    this.hit = 0;
    this.totalPages = 0;
    this.updateHitStatus = '';
    this.isThemesLoading = false;
    this.isHitThemesLoading = false;
  }

  reset() {
    this.themes = [];
    this.hitThemes = [];
    this.hit = 0;
    this.totalPages = 0;
    this.updateHitStatus = '';
    this.isThemesLoading = false;
    this.isHitThemesLoading = false;
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
    this.startHitThemesLoad();

    try {
      const { themes } = await themeApiService.fetchHitThemes();

      this.completeHitThemesLoad(themes);
    } catch (e) {
      this.failHitThemesLoad();
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

  startHitThemesLoad() {
    this.isHitThemesLoading = true;
    this.hitThemes = [];

    this.publish();
  }

  completeThemesLoad(themes) {
    this.isThemesLoading = false;
    this.themes = themes;

    this.publish();
  }

  completeHitThemesLoad(themes) {
    this.isHitThemesLoading = false;
    this.hitThemes = themes;

    this.publish();
  }

  failThemesLoad() {
    this.isThemesLoading = false;
    this.themes = [];

    this.publish();
  }

  failHitThemesLoad() {
    this.isHitThemesLoading = false;
    this.hitThemes = [];

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

  getThemesTitle(themeId) {
    return this.hitThemes.filter((theme) => theme.id === themeId);
  }

  get isUpdateHitSuccessful() {
    return this.updateHitStatus === 'successful';
  }

  get isUpdateHitFailed() {
    return this.updateHitStatus === 'failed';
  }
}

export const themeStore = new ThemeStore();
