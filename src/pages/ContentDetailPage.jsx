import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import ContentDetail from '../components/content/ContentDetail';
import useArticleStore from '../hooks/useArticleStore';
import useReviewCommentStore from '../hooks/useReviewCommentStore';
import useContentStore from '../hooks/useContentStore';
import useReviewStore from '../hooks/useReviewStore';
import useUserStore from '../hooks/useUserStore';
import useThemeStore from '../hooks/useThemeStore';
import useTmdbYoutubeApiStore from '../hooks/useTmdbYoutubeApiStore';
import useTmdbCreditsApiStore from '../hooks/useTmdbCreditsApiStore';

export default function ContentsDetailPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const contentStore = useContentStore();
  const reviewStore = useReviewStore();
  const userStore = useUserStore();
  const reviewCommentStore = useReviewCommentStore();
  const tmdbYoutubeApiStore = useTmdbYoutubeApiStore();
  const tmdbCreditsApiStore = useTmdbCreditsApiStore();
  const articleStore = useArticleStore();
  const themeStore = useThemeStore();

  const { credits } = tmdbCreditsApiStore;
  const { content } = contentStore;
  const { tmdbId, type } = content;

  const contentId = location.pathname.split('/')[2];
  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    if (tmdbId) {
      tmdbYoutubeApiStore.fetchVideo(tmdbId, type);
      tmdbCreditsApiStore.fetchCredits(tmdbId, type);
    }
  }, [tmdbId]);

  useEffect(() => {
    tmdbCreditsApiStore.fetchActors();
  }, [credits]);

  useEffect(() => {
    contentStore.fetchContent(Number(contentId));
  }, [contentId]);

  useEffect(() => {
    if (accessToken === '') {
      reviewStore.fetchReviewsWithNotLoggedIn({ page, size: 5 });
      articleStore.fetchArticles({ page, size: 5 });
      themeStore.fetchThemes({ page, size: 20 });

      return;
    }

    reviewStore.fetchReviews({ page, size: 5 });
    articleStore.fetchArticles({ page, size: 5 });
    themeStore.fetchThemes({ page, size: 20 });
  }, [page]);

  useEffect(() => {
    userStore.fetchUsers();
    userStore.fetchMe();
    reviewStore.fetchMyReviews();
    reviewCommentStore.fetchComments();
  }, []);

  return (
    <ContentDetail />
  );
}
