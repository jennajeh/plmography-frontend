import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

import { userApiService } from './services/UserApiService';
import { contentApiService } from './services/ContentApiService';
import { reviewApiService } from './services/ReviewApiService';
import { postApiService } from './services/PostApiService';
import { reviewCommentApiService } from './services/ReviewCommentApiService';
import { subscribeApiService } from './services/SubscribeApiService';
import { themeApiService } from './services/ThemeApiService';
import { postCommentApiService } from './services/PostCommentApiService';

import defaultTheme from './styles/defaultTheme';

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import ContentDetailPage from './pages/ContentDetailPage';
import ExplorePage from './pages/ExplorePage';
import NewContentsPage from './pages/NewContentsPage';
import ReviewEditPage from './pages/ReviewEditPage';
import LoginPage from './pages/LoginPage';
import EventsPage from './pages/EventsPage';
import SupportPage from './pages/SupportPage';
import GlobalStyle from './styles/GlobalStyle';
import SignupPage from './pages/SignupPage';
import GreetingPage from './pages/GreetingPage';
import ReviewCreatePage from './pages/ReviewCreatePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import MyProfilePage from './pages/MyProfilePage';
import MyProfileEditPage from './pages/MyProfileEditPage';
import UserProfilePage from './pages/UserProfilePage';
import UserWishesPage from './pages/UserWishesPage';
import UserWatchedPage from './pages/UserWatchedPage';
import UserReviewsPage from './pages/UserReviewsPage';
import ProfileSearchPage from './pages/ProfileSearchPage';
import ThemesPage from './pages/ThemesPage';
import ThemesDetailPage from './pages/ThemesDetailPage';
import CommunityPostDetailPage from './pages/CommunityPostDetailPage';
import PostCreatePage from './pages/PostCreatePage';
import PostEditPage from './pages/PostEditPage';

const Main = styled.main`
  height: calc(100vh - 64px);
  padding-inline: 230px;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userApiService.setAccessToken(accessToken);
    contentApiService.setAccessToken(accessToken);
    reviewApiService.setAccessToken(accessToken);
    reviewCommentApiService.setAccessToken(accessToken);
    subscribeApiService.setAccessToken(accessToken);
    themeApiService.setAccessToken(accessToken);
    postApiService.setAccessToken(accessToken);
    postCommentApiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Main>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/themes" element={<ThemesPage />} />
          <Route path="/themes/:id" element={<ThemesDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/posts/:id" element={<CommunityPostDetailPage />} />
          <Route path="/community/posts/write" element={<PostCreatePage />} />
          <Route path="/community/posts/:id/edit" element={<PostEditPage />} />
          <Route path="/contents/:id" element={<ContentDetailPage />} />
          <Route path="/reviews/write" element={<ReviewCreatePage />} />
          <Route path="/reviews/:id/edit" element={<ReviewEditPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/new-contents" element={<NewContentsPage />} />
          {/* <Route path="/ranking" element={<DailyRankingPage />} /> */}
          {/* <Route path="/next-contents" element={<NextContentsPage />} /> */}
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/profile/search" element={<ProfileSearchPage />} />
          <Route path="/profile/edit" element={<MyProfileEditPage />} />
          <Route path="/users/:id" element={<UserProfilePage />} />
          <Route path="/users/:id/wishes" element={<UserWishesPage />} />
          <Route path="/users/:id/watched" element={<UserWatchedPage />} />
          <Route path="/users/:id/reviews" element={<UserReviewsPage />} />
          {/* <Route path="/users/:id/services/edit" element={<ServiceChoicePage />} /> */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/greeting" element={<GreetingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          {/* <Route path="/events/:id" element={<EventsDetailPage />} /> */}
          <Route path="/support" element={<SupportPage />} />
        </Routes>
        <Footer />
      </Main>
    </ThemeProvider>
  );
}
